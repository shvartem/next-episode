import {useEffect} from 'react';
import {useStore} from 'zustand';
import {favoritesStore} from '~/stores/favoritesStore';
import {loadFavorites} from './tasks/loadFavorites';

export const useRootLayout = () => {
    const count = useStore(favoritesStore, state => state.items?.length);
    useEffect(() => { void loadFavorites(); }, []);

    return {favoritesLabel: count === undefined ? 'Favorites' : `Favorites (${count})`};
};
