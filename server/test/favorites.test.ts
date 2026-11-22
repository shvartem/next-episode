import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {once} from 'node:events';
import {createServer} from 'node:http';
import {after, before, test} from 'node:test';
import {FAVORITES_OWNER_HEADER} from '../../shared/favorites.ts';
import {app} from '../src/app.ts';

const server = createServer(app);
const request = globalThis.fetch;
const ownerId = randomUUID();
const origin = 'https://shvartem.github.io';
const show = {
    id: 123,
    name: 'Example show',
    url: 'https://www.tvmaze.com/shows/123/example',
    genres: ['Drama'],
    posterUrl: null,
    rating: 8.5,
    premiered: '2024-01-01',
    status: 'Ended',
    type: 'Scripted',
    language: 'English',
    channel: 'Example channel',
    summary: null,
};
const {posterUrl, channel, rating, ...tvMazeFields} = show;
const tvMazeShow = {...tvMazeFields, image: posterUrl, network: {name: channel}, rating: {average: rating}};
const empty = {items: [], count: 0};
const saved = {items: [show], count: 1};

function favoritesUrl(path = '') {
    const address = server.address();
    assert.ok(address && typeof address === 'object');
    return `http://127.0.0.1:${address.port}/api/favorites${path}`;
}

function call(method: string, path = '', owner: string | null = ownerId) {
    const headers = owner === null ? {} : {[FAVORITES_OWNER_HEADER]: owner};
    return request(favoritesUrl(path), {method, headers});
}

before(async () => {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
});

after(async () => {
    if (!server.listening) return;
    const closed = once(server, 'close');
    server.close();
    await closed;
});

test('favorites store cards by show ID and isolate browser owners', async t => {
    const upstream = t.mock.method(globalThis, 'fetch', async (url: string) => {
        assert.equal(url, 'https://api.tvmaze.com/shows/123');
        return Response.json(tvMazeShow);
    });
    assert.deepEqual(await (await call('GET')).json(), empty);
    assert.deepEqual(await (await call('PUT', '/123')).json(), saved);
    upstream.mock.mockImplementation(async () => { throw new Error('TVmaze is offline'); });

    const result = await call('GET');
    assert.equal(result.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await result.json(), saved);
    assert.deepEqual(await (await call('PUT', '/123')).json(), saved);
    assert.deepEqual(await (await call('GET', '', randomUUID())).json(), empty);
    assert.deepEqual(await (await call('DELETE', '/123')).json(), empty);
    assert.deepEqual(await (await call('DELETE', '/123')).json(), empty);
    assert.equal(upstream.mock.callCount(), 1);
});

test('favorites validate owners and IDs, and allow retry after TVmaze errors', async t => {
    const upstream = t.mock.method(globalThis, 'fetch', async () => Response.json(tvMazeShow));
    assert.equal((await call('GET', '', null)).status, 400);
    assert.equal((await call('GET', '', '__proto__')).status, 400);
    for (const id of ['0', '-1', '1e2', '9007199254740992']) {
        assert.equal((await call('PUT', `/${id}`)).status, 400);
        assert.equal((await call('DELETE', `/${id}`)).status, 400);
    }
    assert.equal(upstream.mock.callCount(), 0);

    upstream.mock.mockImplementationOnce(async () => new Response(null, {status: 404}));
    assert.equal((await call('PUT', '/123')).status, 404);
    upstream.mock.mockImplementationOnce(async () => new Response(null, {status: 503}));
    assert.equal((await call('PUT', '/123')).status, 502);
    upstream.mock.mockImplementationOnce(async () => Response.json({...tvMazeShow, id: 124}));
    assert.equal((await call('PUT', '/123')).status, 502);
    assert.deepEqual(await (await call('GET')).json(), empty);
    assert.deepEqual(await (await call('PUT', '/123')).json(), saved);
});

test('GitHub Pages can send the favorites owner header on all three routes', async () => {
    for (const [method, path] of [['GET', ''], ['PUT', '/123'], ['DELETE', '/123']]) {
        const result = await request(favoritesUrl(path), {
            method: 'OPTIONS',
            headers: {
                Origin: origin,
                'Access-Control-Request-Method': method,
                'Access-Control-Request-Headers': FAVORITES_OWNER_HEADER.toLowerCase(),
            },
        });
        assert.equal(result.status, 204);
        assert.equal(result.headers.get('access-control-allow-origin'), origin);
        assert.ok(result.headers.get('access-control-allow-methods')?.split(', ').includes(method));
        assert.equal(result.headers.get('access-control-allow-headers'), FAVORITES_OWNER_HEADER);
    }

    const result = await request(favoritesUrl(), {headers: {Origin: origin, [FAVORITES_OWNER_HEADER]: ownerId}});
    assert.equal(result.status, 200);
    assert.equal(result.headers.get('access-control-allow-origin'), origin);
});
