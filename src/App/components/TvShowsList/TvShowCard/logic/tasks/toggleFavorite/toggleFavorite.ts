import {favoritesStore} from '~/stores/favoritesStore';
import type {FavoriteUpdateResult} from './types';
import {addFavorite} from './addFavorite';
import {removeFavorite} from './removeFavorite';

export function toggleFavorite(showId: number): Promise<FavoriteUpdateResult> | undefined {
    const {items, isUpdating} = favoritesStore.getState();
    if (items === null || isUpdating) return;

    const isFavorite = items.some(item => item.id === showId);
    favoritesStore.setState({isUpdating: true});
    const update = isFavorite ? removeFavorite : addFavorite;

    return update(showId).then(([error, result]) => {
        if (error !== null) {
            favoritesStore.setState({isUpdating: false});
            return 'error';
        }

        favoritesStore.setState({items: result.items, isUpdating: false});
        return isFavorite ? 'removed' : 'added';
    });
}
