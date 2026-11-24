import type {Show} from './shows.ts';

export interface FavoritesResult {
    items: Show[];
    count: number;
}
