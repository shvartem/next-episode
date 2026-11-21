import type {SearchQuery, SearchResult} from '../../shared/shows';
import {createApi} from './createApi';

const showsApi = createApi({baseUrl: import.meta.env.VITE_API_BASE_URL || '/api'});

export const showsRepository = {
    getShowsList: ({q, page, genre}: SearchQuery, signal?: AbortSignal) => {
        const queryParams: Record<string, string> = {q, page: String(page)};
        if (genre !== null) queryParams.genre = genre;
        return showsApi.createRequest<SearchResult>({endpoint: '/shows', queryParams, signal});
    },
};

export type {SearchQuery, SearchResult, Show} from '../../shared/shows';
