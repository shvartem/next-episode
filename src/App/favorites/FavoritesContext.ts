import {createContext, useContext} from 'react';

import type {Favorites} from '#shared/favorites';
import type {TvShow} from '#shared/shows';

interface FavoritesContextValue {
    favorites: Favorites | null;
    loadFailed: boolean;
    reload: () => void;
    changeFavorite: (item: TvShow, selected: boolean) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('FavoritesContext is required');
    }
    return context;
};
