import {useOutletContext} from 'react-router';

import type {Show} from '~/api';
import type {FavoritesContext} from '../types';

const EMPTY_ITEMS: Show[] = [];

export const useFavoritesList = () => {
    const {snapshot, loadError} = useOutletContext<FavoritesContext>();

    return {items: snapshot?.items ?? EMPTY_ITEMS, isLoading: !snapshot && !loadError, loadError};
};

export const useFavoriteShow = (showId: number) => {
    const {snapshot, favoriteIds, isUpdating, toggleFavorite} = useOutletContext<FavoritesContext>();

    return {
        isFavorite: favoriteIds.has(showId),
        isFavoriteDisabled: !snapshot || isUpdating,
        handleFavoriteClick: () => void toggleFavorite(showId),
    };
};
