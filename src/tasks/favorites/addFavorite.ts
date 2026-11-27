import {favoritesRepository} from '~/api';
import {favoritesStore} from '~/stores/favoritesStore';
import {sessionStore} from '~/stores/sessionStore';
import type {FavoriteTaskResult} from './types';

export async function addFavorite(showId: number): Promise<FavoriteTaskResult> {
    const token = sessionStore.getState().session?.token;

    if (!token || favoritesStore.getState().items === null) {
        return [null, 'skipped'];
    }

    try {
        const {item} = await favoritesRepository.addFavorite(showId, token);

        if (sessionStore.getState().session?.token !== token) {
            return [null, 'skipped'];
        }

        favoritesStore.setState((state) => {
            const remaining = (state.items ?? []).filter((favorite) => favorite.id !== showId);

            return {items: [...remaining, item].sort((a, b) => a.id - b.id)};
        });

        return [null, 'added'];
    } catch (error) {
        if (sessionStore.getState().session?.token !== token) {
            return [null, 'skipped'];
        }

        return [error instanceof Error ? error : new Error('Could not add favorite.', {cause: error}), null];
    }
}
