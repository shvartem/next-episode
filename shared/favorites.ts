import type {Show} from './shows.ts';

export const FAVORITES_OWNER_HEADER = 'X-Favorites-Owner';

export interface FavoritesResult {
    items: Show[];
    count: number;
}
