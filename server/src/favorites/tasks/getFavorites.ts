import type {FavoritesResult} from '../../../../shared/favorites.ts';
import type {Show} from '../../../../shared/shows.ts';
import {favoritesStore} from '../favoritesStore.ts';

function toFavoritesResult(items: Show[]): FavoritesResult {
    return {items, count: items.length};
}

export function getFavorites(ownerId: string): FavoritesResult {
    const collection = favoritesStore.getCollection(ownerId);

    return toFavoritesResult(collection ? Object.values(collection).filter((show) => show !== undefined) : []);
}
