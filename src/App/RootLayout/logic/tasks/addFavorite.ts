import {favoritesRepository} from '~/api';
import type {FavoritesTaskResult} from '../../types';

export const addFavorite = async (showId: number): Promise<FavoritesTaskResult> => {
    try {
        return [null, await favoritesRepository.addFavorite(showId)];
    } catch (error) {
        return [error instanceof Error ? error : new Error('Could not add favorite.', {cause: error}), null];
    }
};
