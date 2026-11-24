import {useEffect, useState} from 'react';
import {useStore} from 'zustand';
import {favoritesStore} from '~/stores/favoritesStore';
import {sessionStore} from '~/stores/sessionStore';
import {logout} from '~/tasks/logout';
import {toastNotify} from '~/tasks/toastNotify';
import {loadFavorites} from './tasks/loadFavorites';

export const useRootLayout = () => {
    const count = useStore(favoritesStore, state => state.items?.length);
    useEffect(() => { void loadFavorites(); }, []);

    const email = useStore(sessionStore, state => state.session?.email);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch {
            toastNotify('Could not log out. Try again.', 4_000);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const favoritesLabel = count === undefined ? 'Favorites' : `Favorites (${count})`;
    return {favoritesLabel, email, isLoggingOut, handleLogout};
};
