import assert from 'node:assert/strict';
import {test} from 'node:test';
import type {Session} from '../../shared/auth.ts';
import {setupTestServer} from './setupTestServer.ts';

const apiUrl = setupTestServer();

test('email login creates a session that logout revokes', async () => {
    const login = (email: string) => fetch(apiUrl('/session'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
    });

    assert.equal((await login('invalid')).status, 400);
    assert.equal((await fetch(apiUrl('/session'))).status, 401);

    const response = await login(' Viewer@Example.com ');
    assert.equal(response.status, 200);
    const session = await response.json() as Session;
    assert.equal(session.email, 'viewer@example.com');
    const headers = {Authorization: `Bearer ${session.token}`};

    assert.deepEqual(await (await fetch(apiUrl('/session'), {headers})).json(), session);
    assert.equal((await fetch(apiUrl('/session'), {method: 'DELETE', headers})).status, 200);
    assert.equal((await fetch(apiUrl('/session'), {headers})).status, 401);
});

test('GitHub Pages can send session and favorites headers', async () => {
    const origin = 'https://shvartem.github.io';
    const routes = [
        ['/session', 'GET', 'Authorization, Content-Type'],
        ['/session', 'POST', 'Authorization, Content-Type'],
        ['/session', 'DELETE', 'Authorization, Content-Type'],
        ['/favorites', 'GET', 'Authorization'],
        ['/favorites/123', 'PUT', 'Authorization'],
        ['/favorites/123', 'DELETE', 'Authorization'],
    ];

    for (const [path, method, headers] of routes) {
        const result = await fetch(apiUrl(path), {
            method: 'OPTIONS',
            headers: {
                Origin: origin,
                'Access-Control-Request-Method': method,
                'Access-Control-Request-Headers': headers.toLowerCase(),
            },
        });
        assert.equal(result.status, 204);
        assert.equal(result.headers.get('access-control-allow-origin'), origin);
        assert.ok(result.headers.get('access-control-allow-methods')?.split(', ').includes(method));
        assert.equal(result.headers.get('access-control-allow-headers'), headers);
    }
});
