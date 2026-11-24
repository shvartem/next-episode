import type {FavoritesResult} from '../../../shared/favorites.ts';
import type {Show} from '../../../shared/shows.ts';
import {getTvMazeShow} from '../tvmaze/getTvMazeShow.ts';
import {addFavorite} from './tasks/addFavorite.ts';
import {getFavorites} from './tasks/getFavorites.ts';
import {removeFavorite} from './tasks/removeFavorite.ts';

function toFavoritesResult(items: Show[]): FavoritesResult {
    return {items, count: items.length};
}

export const favoritesPresenter = {
    list(ownerId: string): FavoritesResult {
        return toFavoritesResult(getFavorites(ownerId));
    },

    async add(ownerId: string, showId: number): Promise<FavoritesResult | null> {
        const items = await addFavorite(ownerId, showId, getTvMazeShow);
        return items === null ? null : toFavoritesResult(items);
    },

    remove(ownerId: string, showId: number): FavoritesResult {
        return toFavoritesResult(removeFavorite(ownerId, showId));
    },
};
