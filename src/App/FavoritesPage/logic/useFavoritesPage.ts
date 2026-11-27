import {updateFavoriteWithToast} from '../../handlers/updateFavoriteWithToast';
import {createPath, useLocation} from 'react-router';

import type {Show} from '~/api';
import {useSessionStore} from '~/App/hooks/useSessionStore';
import {useFavoritesStore} from '~/App/hooks/useFavoritesStore';

const EMPTY_ITEMS: Show[] = [];

export const useFavoritesPage = () => {
    const loginState = {returnTo: createPath(useLocation())};
    const isLoggedIn = useSessionStore((state) => state.session !== null);

    const items = useFavoritesStore((state) => state.items);

    const loadFailed = useFavoritesStore((state) => state.loadFailed);

    const loadError = loadFailed ? 'Could not load favorites. Refresh the page to try again.' : null;

    const list = items ?? EMPTY_ITEMS;

    return {
        onFavoriteClick: updateFavoriteWithToast,
        isLoggedIn,
        loginState,
        items: list,
        isLoading: items === null && !loadFailed,
        loadError,
    };
};
