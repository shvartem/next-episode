import {favoritesRepository} from '~/api';
import type {FavoritesTaskResult} from './types';

export const removeFavorite = async (showId: number, token: string): Promise<FavoritesTaskResult> => {
    try {
        return [null, await favoritesRepository.removeFavorite(showId, token)];
    } catch (error) {
        return [error instanceof Error ? error : new Error('Could not remove favorite.', {cause: error}), null];
    }
};
