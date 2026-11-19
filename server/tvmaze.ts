import type {TvShow} from '#shared/shows';
import {createCachedRequest} from './createCachedRequest.ts';
import {tvmazeCache} from './entities/tvmazeCache.ts';
import {logger} from './logger.ts';
import {requestJson} from './requestJson.ts';

const loadTvmazeShows = async (url: URL): Promise<TvShow[]> => {
    const startedAt = performance.now();
    const {data, status} = await requestJson(url);
    const items = data as TvShow[];

    logger.info('tvmaze.request.completed', {
        status,
        durationMs: Math.round(performance.now() - startedAt),
        results: items.length,
    });

    return items;
};

const requestTvmazeShows = createCachedRequest({
    cache: tvmazeCache,
    load: loadTvmazeShows,
    logPrefix: 'tvmaze',
});

export const searchTvmaze = (query: string): Promise<TvShow[]> => {
    const url = new URL('https://api.tvmaze.com/search/shows');
    url.searchParams.set('q', query);
    return requestTvmazeShows(url);
};

export const getTvmazeShow = async (id: number): Promise<TvShow['show']> => {
    const {data} = await requestJson(new URL(`https://api.tvmaze.com/shows/${id}`));
    return data as TvShow['show'];
};
