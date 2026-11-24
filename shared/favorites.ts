import type {Show} from './shows.ts';

export interface FavoriteResult {
    item: Show;
}

export interface FavoritesResult {
    items: Show[];
    count: number;
}
