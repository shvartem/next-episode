import {favoritesRepository} from '~/api';
import type {FavoritesTaskResult} from '../../types';

export const loadFavorites = async (): Promise<FavoritesTaskResult> => {
    try {
        return [null, await favoritesRepository.getFavorites()];
    } catch (error) {
        return [error instanceof Error ? error : new Error('Could not load favorites.', {cause: error}), null];
    }
};
