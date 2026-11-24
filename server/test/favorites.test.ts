import assert from 'node:assert/strict';
import {test} from 'node:test';
import type {Session} from '../../shared/auth.ts';
import {show, tvMazeShow} from './favoriteShowFixture.ts';
import {setupTestServer} from './setupTestServer.ts';

const apiUrl = setupTestServer();
const request = globalThis.fetch;
const empty = {items: [], count: 0};
const saved = {items: [show], count: 1};

async function login(email: string) {
    const response = await request(apiUrl('/session'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
    });
    assert.equal(response.status, 200);
    const {token} = await response.json() as Session;

    return token;
}

function call(method: string, path: string, token?: string) {
    const headers = token ? {Authorization: `Bearer ${token}`} : undefined;

    return request(apiUrl(`/favorites${path}`), {method, headers});
}

test('favorites survive logout and are isolated by email', async t => {
    const owner = await login('owner@example.com');
    const other = await login('other@example.com');
    const upstream = t.mock.method(globalThis, 'fetch', async (url: string) => {
        assert.equal(url, 'https://api.tvmaze.com/shows/123');

        return Response.json(tvMazeShow);
    });
    assert.deepEqual(await (await call('GET', '', owner)).json(), empty);
    const created = await call('PUT', '/123', owner);
    assert.equal(created.status, 201);
    assert.deepEqual(await created.json(), {item: show});
    upstream.mock.mockImplementation(async () => { throw new Error('TVmaze is offline'); });

    const result = await call('GET', '', owner);
    assert.equal(result.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await result.json(), saved);
    const existing = await call('PUT', '/123', owner);
    assert.equal(existing.status, 200);
    assert.deepEqual(await existing.json(), {item: show});
    assert.deepEqual(await (await call('GET', '', other)).json(), empty);
    await request(apiUrl('/session'), {method: 'DELETE', headers: {Authorization: `Bearer ${owner}`}});
    assert.equal((await call('GET', '', owner)).status, 401);
    const returning = await login('OWNER@example.com');
    assert.deepEqual(await (await call('GET', '', returning)).json(), saved);
    const removed = await call('DELETE', '/123', returning);
    assert.equal(removed.status, 204);
    assert.equal(await removed.text(), '');
    assert.equal((await call('DELETE', '/123', returning)).status, 204);
    assert.deepEqual(await (await call('GET', '', returning)).json(), empty);
    assert.equal(upstream.mock.callCount(), 1);
});

test('removing favorites preserves other cards and other owners', async t => {
    const owner = await login('first@example.com');
    const other = await login('second@example.com');

    t.mock.method(globalThis, 'fetch', async (url: string) =>
        Response.json({...tvMazeShow, id: Number(new URL(url).pathname.split('/').at(-1))}));

    for (const [id, user] of [[123, owner], [124, owner], [123, other]] as const) {
        assert.equal((await call('PUT', `/${id}`, user)).status, 201);
    }

    assert.equal((await call('DELETE', '/124', owner)).status, 204);
    assert.deepEqual(await (await call('GET', '', owner)).json(), saved);
    assert.equal((await call('DELETE', '/123', owner)).status, 204);
    assert.deepEqual(await (await call('GET', '', owner)).json(), empty);
    assert.deepEqual(await (await call('GET', '', other)).json(), saved);
});

test('favorites require a session, validate IDs and allow retry after TVmaze errors', async t => {
    const owner = await login('retry@example.com');
    const upstream = t.mock.method(globalThis, 'fetch', async () => Response.json(tvMazeShow));
    assert.equal((await call('GET', '')).status, 401);
    assert.equal((await call('PUT', '/123')).status, 401);
    assert.equal((await call('DELETE', '/123')).status, 401);
    assert.equal((await call('GET', '', 'invalid-token')).status, 401);

    for (const id of ['0', '-1', '1e2', '9007199254740992']) {
        assert.equal((await call('PUT', `/${id}`, owner)).status, 400);
        assert.equal((await call('DELETE', `/${id}`, owner)).status, 400);
    }

    assert.equal(upstream.mock.callCount(), 0);

    upstream.mock.mockImplementationOnce(async () => new Response(null, {status: 404}));
    assert.equal((await call('PUT', '/123', owner)).status, 404);
    upstream.mock.mockImplementationOnce(async () => new Response(null, {status: 503}));
    const unavailable = await call('PUT', '/123', owner);
    assert.equal(unavailable.status, 502);
    assert.deepEqual(await unavailable.json(), {error: 'Unable to load show'});
    upstream.mock.mockImplementationOnce(async () => Response.json({...tvMazeShow, id: 124}));
    assert.equal((await call('PUT', '/123', owner)).status, 502);
    assert.deepEqual(await (await call('GET', '', owner)).json(), empty);
    const retried = await call('PUT', '/123', owner);
    assert.equal(retried.status, 201);
    assert.deepEqual(await retried.json(), {item: show});
});
