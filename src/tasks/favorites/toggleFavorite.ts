import {favoritesStore} from '~/stores/favoritesStore';
import {addFavorite} from './addFavorite';
import {removeFavorite} from './removeFavorite';
import type {FavoriteTaskResult} from './types';

export function toggleFavorite(showId: number): Promise<FavoriteTaskResult> {
    const {items} = favoritesStore.getState();
    const isFavorite = items?.some((item) => item.id === showId);

    return isFavorite ? removeFavorite(showId) : addFavorite(showId);
}
