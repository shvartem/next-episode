import type {Show} from '../../../shared/shows.ts';
import {log} from '../log.ts';
import type {TvMazeSearchResult} from './types.ts';

const TTL = 5 * 60 * 1000;

interface Entry {
    result: Promise<Show[]>;
    expiresAt: number;
}

const cache: Record<string, Entry> = {};

async function fetchShows(url: URL): Promise<Show[]> {
    const response = await fetch(url, {signal: AbortSignal.timeout(15000)});
    if (!response.ok) {
        throw new Error(`TVmaze returned ${response.status}`);
    }

    const data = await response.json() as TvMazeSearchResult[];
    return data.map(({show}) => ({
        id: show.id,
        name: show.name,
        genres: show.genres,
        url: show.url,
        posterUrl: show.image?.medium ?? null,
        rating: show.rating.average,
        premiered: show.premiered,
        status: show.status,
        type: show.type,
        language: show.language,
        channel: (show.network ?? show.webChannel)?.name ?? null,
        summary: show.summary,
    }));
}

export function searchTvMaze(query: string): Promise<Show[]> {
    const url = new URL('https://api.tvmaze.com/search/shows');
    url.searchParams.set('q', query.trim());
    const key = url.href;
    const existing = cache[key];
    if (existing && existing.expiresAt > Date.now()) {
        const state = existing.expiresAt === Infinity ? 'JOIN pending request' : 'HIT';
        log('INFO', 'CACHE', `${state} ${url.search}`);
        return existing.result;
    }

    log('INFO', 'TVmaze', `Cache miss | GET ${url.pathname}${url.search}`);
    const started = performance.now();
    const entry: Entry = {result: fetchShows(url), expiresAt: Infinity};
    cache[key] = entry;
    entry.result.then((shows) => {
        entry.expiresAt = Date.now() + TTL;
        log('OK', 'TVmaze', `${url.search} | ${shows.length} shows | ${Math.round(performance.now() - started)} ms`);
        setTimeout(() => {
            if (cache[key] === entry) delete cache[key];
        }, TTL).unref();
    }, (error: unknown) => {
        delete cache[key];
        const reason = error instanceof Error && error.cause instanceof Error ? error.cause : error;
        log('ERROR', 'TVmaze', `${url.search} | ${String(reason)}`);
    });

    return entry.result;
}
