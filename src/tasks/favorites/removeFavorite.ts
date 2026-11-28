import {favoritesRepository} from '~/api';
import {favoritesStore} from '~/stores/favoritesStore';
import {sessionStore} from '~/stores/sessionStore';
import type {FavoriteTaskResult} from './types';

export async function removeFavorite(showId: number): Promise<FavoriteTaskResult> {
    const token = sessionStore.getState().session?.token;

    if (!token || favoritesStore.getState().items === null) {
        return [null, 'skipped'];
    }

    try {
        await favoritesRepository.removeFavorite(showId, token);

        if (sessionStore.getState().session?.token !== token) {
            return [null, 'skipped'];
        }

        favoritesStore.setState((state) => ({
            items: (state.items ?? []).filter((item) => item.id !== showId),
        }));

        return [null, 'removed'];
    } catch (error) {
        if (sessionStore.getState().session?.token !== token) {
            return [null, 'skipped'];
        }

        return [error instanceof Error ? error : new Error('Could not remove favorite.', {cause: error}), null];
    }
}
