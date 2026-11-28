import {useState} from 'react';
import {createPath, useLocation} from 'react-router';

import {toggleFavoriteWithToast} from '../../handlers/updateFavoriteWithToast';
import {useSessionStore} from '~/App/hooks/useSessionStore';
import {useFavoritesStore} from '~/App/hooks/useFavoritesStore';

export const useFavoritesPage = () => {
    const loginState = {returnTo: createPath(useLocation())};
    const session = useSessionStore((state) => state.session);

    const items = useFavoritesStore((state) => state.items);

    const loadFailed = useFavoritesStore((state) => state.loadFailed);

    const loadError = loadFailed ? 'Could not load favorites. Refresh the page to try again.' : null;

    const [snapshot, setSnapshot] = useState(() => ({session, items}));

    if (snapshot.session !== session || (snapshot.items === null && items !== null)) {
        setSnapshot({session, items});
    }

    const initialItems = snapshot.session === session ? snapshot.items : items;
    const visibleItems = new Map((initialItems ?? []).map((item) => [item.id, item]));

    for (const item of items ?? []) {
        visibleItems.set(item.id, item);
    }

    return {
        onFavoriteClick: toggleFavoriteWithToast,
        isLoggedIn: session !== null,
        loginState,
        items: Array.from(visibleItems.values()),
        isLoading: items === null && !loadFailed,
        loadError,
    };
};
