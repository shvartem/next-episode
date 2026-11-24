import type {Session} from '../../shared/auth';
import type {FavoritesResult} from '../../shared/favorites';
import type {SearchQuery, SearchResult} from '../../shared/shows';
import {createApi} from './createApi';
import type {RequestOptions} from './types';

const api = createApi({baseUrl: import.meta.env.VITE_API_BASE_URL || '/api'});

export const sessionRepository = {
    login: (email: string) => api.createRequest<Session>({
        endpoint: '/session',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
    }),
    get: (token: string) => api.createRequest<Session>({
        endpoint: '/session',
        headers: {Authorization: `Bearer ${token}`},
    }),
    logout: (token: string) => api.createRequest<null>({
        endpoint: '/session',
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`},
    }),
};

export const showsRepository = {
    getShowsList: ({q, page, genre}: SearchQuery, signal?: AbortSignal) => {
        const queryParams: Record<string, string> = {q, page: String(page)};
        if (genre !== null) queryParams.genre = genre;
        return api.createRequest<SearchResult>({endpoint: '/shows', queryParams, signal});
    },
};

async function requestFavorites(endpoint: string, method: RequestOptions['method'], token: string, signal?: AbortSignal) {
    return api.createRequest<FavoritesResult>({
        endpoint,
        method,
        signal,
        headers: {Authorization: `Bearer ${token}`},
    });
}

export const favoritesRepository = {
    getFavorites: (token: string, signal?: AbortSignal) => requestFavorites('/favorites', 'GET', token, signal),
    addFavorite: (showId: number, token: string) => requestFavorites(`/favorites/${showId}`, 'PUT', token),
    removeFavorite: (showId: number, token: string) => requestFavorites(`/favorites/${showId}`, 'DELETE', token),
};

export type {FavoritesResult} from '../../shared/favorites';
export type {SearchQuery, SearchResult, Show} from '../../shared/shows';
