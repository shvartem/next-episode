import assert from 'node:assert/strict';
import {test} from 'node:test';
import {searchTvMaze} from '../src/tvmaze/searchTvMaze.ts';
import {presentShows} from '../src/shows/showsPresenter.ts';

const ttl = 5 * 60 * 1000;

test('same query shares an in-flight request and an empty result for five minutes', async t => {
    let now = 0;
    t.mock.method(Date, 'now', () => now);
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => Response.json([]));
    const first = searchTvMaze(' __proto__ ');
    assert.equal(first, searchTvMaze('__proto__'));
    await first;
    now = ttl - 1;
    assert.deepEqual(await searchTvMaze('__proto__'), []);
    assert.equal(fetchMock.mock.callCount(), 1);
    now = ttl;
    await searchTvMaze('__proto__');
    assert.equal(fetchMock.mock.callCount(), 2);
    await searchTvMaze('another query');
    assert.equal(fetchMock.mock.callCount(), 3);
});

test('failed TVmaze requests can be retried immediately', async t => {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => Response.json([]));
    fetchMock.mock.mockImplementationOnce(async () => new Response(null, {status: 503}));
    await assert.rejects(searchTvMaze('retry'));
    assert.deepEqual(await searchTvMaze('retry'), []);
    assert.equal(fetchMock.mock.callCount(), 2);
});

test('genre and page changes reuse one search and keep counts from the full result', async t => {
    const data = ['Echo', 'Delta', 'Charlie', 'Bravo', 'Alpha'].map((name, id) => ({
        show: {id, name, genres: [id === 0 ? 'Comedy' : 'Drama'], rating: {average: null}},
    }));
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => Response.json(data));
    await presentShows({q: 'series', genre: null, page: 1});
    const result = await presentShows({q: 'series', genre: 'Drama', page: 2});
    assert.equal(result.totalCount, 5);
    assert.equal(result.page, 2);
    assert.equal(result.pagesCount, 2);
    assert.deepEqual(result.items.map(show => show.name), ['Delta']);
    assert.deepEqual(result.genres, [{name: 'Comedy', count: 1}, {name: 'Drama', count: 4}]);
    assert.equal(fetchMock.mock.callCount(), 1);
});
