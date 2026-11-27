import type {FavoritesResult} from '../../../shared/favorites.ts';

import {addFavorite} from './tasks/addFavorite.ts';
import {getFavorites} from './tasks/getFavorites.ts';
import {removeFavorite} from './tasks/removeFavorite.ts';

export const favoritesPresenter = {
    list(ownerId: string): FavoritesResult {
        return getFavorites(ownerId);
    },

    add(ownerId: string, showId: number) {
        return addFavorite(ownerId, showId);
    },

    remove(ownerId: string, showId: number): void {
        removeFavorite(ownerId, showId);
    },
};
