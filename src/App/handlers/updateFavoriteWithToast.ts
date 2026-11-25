import type {Show} from '~/api';
import type {ToastTone} from '~/stores/toastStore';
import {toastNotify} from '~/tasks/toastNotify';
import {toggleFavorite} from '~/tasks/toggleFavorite/toggleFavorite';
import type {FavoriteUpdateResult} from '~/tasks/toggleFavorite/types';

const FAVORITE_TOAST_DURATION_MS = 4_000;

const FAVORITE_UPDATE_TOASTS: Record<FavoriteUpdateResult, {message: (name: string) => string; tone: ToastTone}> = {
    added: {message: name => `“${name}” added to favorites.`, tone: 'success'},
    removed: {message: name => `“${name}” removed from favorites.`, tone: 'warning'},
};

export async function updateFavoriteWithToast(show: Show): Promise<void> {
    const [error, result] = await toggleFavorite(show.id);

    if (error !== null) {
        toastNotify(`Could not update favorites for “${show.name}”. Try again.`, FAVORITE_TOAST_DURATION_MS);

        return;
    }

    if (result !== 'skipped') {
        const {message, tone} = FAVORITE_UPDATE_TOASTS[result];
        toastNotify(message(show.name), FAVORITE_TOAST_DURATION_MS, tone);
    }
}
