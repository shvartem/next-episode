import {createStore} from 'zustand/vanilla';
import type {Show} from '~/api';

interface FavoritesState {
    items: Show[] | null;
    loadFailed: boolean;
    isUpdating: boolean;
}

export const favoritesStore = createStore<FavoritesState>(() => ({
    items: null,
    loadFailed: false,
    isUpdating: false,
}));
