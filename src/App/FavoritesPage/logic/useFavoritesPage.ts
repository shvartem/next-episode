import {useStore} from 'zustand';

import type {Show} from '~/api';
import {sessionStore} from '~/stores/sessionStore';
import {favoritesStore} from '~/stores/favoritesStore';

const EMPTY_ITEMS: Show[] = [];

export const useFavoritesPage = () => {
    const isLoggedIn = useStore(sessionStore, state => state.session !== null);
    const items = useStore(favoritesStore, state => state.items);
    const loadFailed = useStore(favoritesStore, state => state.loadFailed);
    const loadError = loadFailed ? 'Could not load favorites. Refresh the page to try again.' : null;

    const list = items ?? EMPTY_ITEMS;

    return {isLoggedIn, items: list, hasFavorites: list.length > 0, isLoading: items === null && !loadFailed, loadError};
};
