import type {FavoriteUpdateResult} from '../types';
import {useFavoritesState} from './useFavoritesState';
import {useToast} from './useToast';

const FAVORITE_UPDATE_MESSAGES: Record<FavoriteUpdateResult, string> = {
    added: 'Added to favorites.',
    removed: 'Removed from favorites.',
    error: 'Could not update favorites. Try again.',
};

export const useRootLayout = () => {
    const {toastMessage, showToast, clearToast} = useToast();
    const favorites = useFavoritesState({
        onUpdateStart: clearToast,
        onUpdateResult: (result) => showToast(FAVORITE_UPDATE_MESSAGES[result]),
    });
    const {snapshot} = favorites;

    return {
        favorites,
        favoritesLabel: snapshot ? `Favorites (${snapshot.count})` : 'Favorites',
        toastMessage,
    };
};
