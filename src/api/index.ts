import {createApi} from './createApi';
import type {TvMazeSearchResult} from './tvMazeTypes';

export const showsApi = createApi({baseUrl: 'https://api.tvmaze.com'});

export type ShowsRepository = {
    getShowsList: (query: string, signal?: AbortSignal) => Promise<TvMazeSearchResult[]>;
};

export const showsRepository: ShowsRepository = {
    getShowsList: (query: string, signal?: AbortSignal) =>
        showsApi.createRequest({endpoint: '/search/shows', queryParams: {q: query}, signal}),
};
