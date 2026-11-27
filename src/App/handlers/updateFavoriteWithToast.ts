import type {Show} from '~/api';
import type {ToastTone} from '~/stores/toastStore';
import {toastNotify} from '~/tasks/toastNotify';
import {removeFavorite} from '~/tasks/favorites/removeFavorite';
import {toggleFavorite} from '~/tasks/favorites/toggleFavorite';
import type {FavoriteTaskResult, FavoriteUpdateResult} from '~/tasks/favorites/types';

const FAVORITE_TOAST_DURATION_MS = 4_000;

const FAVORITE_UPDATE_TOASTS: Record<FavoriteUpdateResult, {message: (name: string) => string; tone: ToastTone}> = {
    added: {message: name => `“${name}” added to favorites.`, tone: 'success'},
    removed: {message: name => `“${name}” removed from favorites.`, tone: 'warning'},
};

export async function toggleFavoriteWithToast(show: Show): Promise<void> {
    notifyFavoriteResult(show, await toggleFavorite(show.id));
}

export async function removeFavoriteWithToast(show: Show): Promise<void> {
    notifyFavoriteResult(show, await removeFavorite(show.id));
}

function notifyFavoriteResult(show: Show, [error, result]: FavoriteTaskResult): void {

    if (error !== null) {
        toastNotify(`Could not update favorites for “${show.name}”. Try again.`, FAVORITE_TOAST_DURATION_MS);

        return;
    }

    if (result !== 'skipped') {
        const {message, tone} = FAVORITE_UPDATE_TOASTS[result];
        toastNotify(message(show.name), FAVORITE_TOAST_DURATION_MS, tone);
    }
}
