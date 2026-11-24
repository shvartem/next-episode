import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createServer} from 'node:http';
import {after, before} from 'node:test';
import {app} from '../src/app.ts';

export function setupTestServer() {
    const server = createServer(app);

    before(async () => {
        server.listen(0, '127.0.0.1');
        await once(server, 'listening');
    });

    after(async () => {
        if (!server.listening) {
            return;
        }

        const closed = once(server, 'close');
        server.close();
        await closed;
    });

    return (path: string) => {
        const address = server.address();
        assert.ok(address && typeof address === 'object');

        return `http://127.0.0.1:${address.port}/api${path}`;
    };
}
