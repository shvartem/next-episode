import {sessionStore} from '~/stores/sessionStore';
import {favoritesStore} from '~/stores/favoritesStore';
import type {FavoriteUpdateResult} from './types';
import {addFavorite} from './addFavorite';
import {removeFavorite} from './removeFavorite';

export function toggleFavorite(showId: number): Promise<FavoriteUpdateResult | undefined> | undefined {
    const token = sessionStore.getState().session?.token;

    const {items, isUpdating} = favoritesStore.getState();

    if (!token || items === null || isUpdating) {
        return;
    }

    const isFavorite = items.some((item) => item.id === showId);

    favoritesStore.setState({isUpdating: true});

    const update = isFavorite ? removeFavorite : addFavorite;

    return update(showId, token).then(([error, result]) => {
        if (sessionStore.getState().session?.token !== token) {
            return;
        }

        if (error !== null) {
            favoritesStore.setState({isUpdating: false});

            return 'error';
        }

        favoritesStore.setState({items: result.items, isUpdating: false});

        return isFavorite ? 'removed' : 'added';
    });
}
