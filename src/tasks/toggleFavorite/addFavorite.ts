import {favoritesRepository, type FavoriteResult} from '~/api';
import type {FavoritesTaskResult} from './types';

export const addFavorite = async (showId: number, token: string): Promise<FavoritesTaskResult<FavoriteResult>> => {
    try {
        return [null, await favoritesRepository.addFavorite(showId, token)];
    } catch (error) {
        return [error instanceof Error ? error : new Error('Could not add favorite.', {cause: error}), null];
    }
};
