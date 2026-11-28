import {createStore} from 'zustand/vanilla';
import type {Show} from '~/api';

export interface FavoritesState {
    items: Show[] | null;
    loadFailed: boolean;
}

export const favoritesStore = createStore<FavoritesState>(() => ({
    items: null,
    loadFailed: false,
}));
