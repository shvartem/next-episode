import {sessionStore} from '~/stores/sessionStore';
import {favoritesStore} from '~/stores/favoritesStore';
import type {ToggleFavoriteTaskResult} from './types';
import {addFavorite} from './addFavorite';
import {removeFavorite} from './removeFavorite';

export async function toggleFavorite(showId: number): Promise<ToggleFavoriteTaskResult> {
    const token = sessionStore.getState().session?.token;

    const {items} = favoritesStore.getState();

    if (!token || items === null) {
        return [null, 'skipped'];
    }

    const isFavorite = items.some((item) => item.id === showId);

    const update = isFavorite ? removeFavorite : addFavorite;

    const [error, result] = await update(showId, token);

    if (sessionStore.getState().session?.token !== token) {
        return [null, 'skipped'];
    }

    if (error !== null) {
        return [error, null];
    }

    favoritesStore.setState((state) => {
        const remaining = (state.items ?? []).filter((item) => item.id !== showId);
        const nextItems = result ? [...remaining, result.item].sort((a, b) => a.id - b.id) : remaining;

        return {items: nextItems};
    });

    return [null, isFavorite ? 'removed' : 'added'];
}
