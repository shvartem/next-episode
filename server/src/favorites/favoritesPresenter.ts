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

    add(ownerId: string, showId: number) {
        return addFavorite(ownerId, showId, getTvMazeShow);
    },

    remove(ownerId: string, showId: number): void {
        removeFavorite(ownerId, showId);
    },
};
