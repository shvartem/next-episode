import type {Session} from '../../shared/auth';
import {FAVORITES_OWNER_HEADER} from '../../shared/favorites';
import type {FavoritesResult} from '../../shared/favorites';
import type {SearchQuery, SearchResult} from '../../shared/shows';
import {createApi} from './createApi';
import type {RequestOptions} from './types';

const api = createApi({baseUrl: import.meta.env.VITE_API_BASE_URL || '/api'});
const FAVORITES_OWNER_KEY = 'next-episode:favorites-owner';

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

function getFavoritesOwner(): string {
    const storedOwner = localStorage.getItem(FAVORITES_OWNER_KEY);
    if (storedOwner) return storedOwner;

    const owner = crypto.randomUUID();
    localStorage.setItem(FAVORITES_OWNER_KEY, owner);
    return owner;
}

async function requestFavorites(endpoint: string, method: RequestOptions['method'], signal?: AbortSignal) {
    return api.createRequest<FavoritesResult>({
        endpoint,
        method,
        signal,
        headers: {[FAVORITES_OWNER_HEADER]: getFavoritesOwner()},
    });
}

export const favoritesRepository = {
    getFavorites: (signal?: AbortSignal) => requestFavorites('/favorites', 'GET', signal),
    addFavorite: (showId: number) => requestFavorites(`/favorites/${showId}`, 'PUT'),
    removeFavorite: (showId: number) => requestFavorites(`/favorites/${showId}`, 'DELETE'),
};

export type {FavoritesResult} from '../../shared/favorites';
export type {SearchQuery, SearchResult, Show} from '../../shared/shows';
