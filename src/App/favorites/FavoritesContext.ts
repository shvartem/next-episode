import {createContext, useContext} from 'react';

import type {Favorites} from '#shared/favorites';

interface FavoritesContextValue {
    favorites: Favorites | null;
    isSaving: boolean;
    loadFailed: boolean;
    reload: () => void;
    changeFavorite: (id: number, name: string, selected: boolean) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('FavoritesContext is required');
    }
    return context;
};
