import {useEffect, useState} from 'react';
import {createPath, matchPath, useLocation} from 'react-router';
import {logout} from '~/tasks/logout';
import {toastNotify} from '~/tasks/toastNotify';
import {loadFavorites} from './tasks/loadFavorites';
import {useFavoritesStore} from '~/App/hooks/useFavoritesStore';
import {useSessionStore} from '~/App/hooks/useSessionStore';

export const useRootLayout = () => {
    const location = useLocation();
    const loginState = matchPath('/login', location.pathname) ? location.state : {returnTo: createPath(location)};
    const count = useFavoritesStore((state) => state.items?.length);
    const token = useSessionStore((state) => state.session?.token);

    useEffect(() => {
        if (!token) {
            return;
        }

        const controller = new AbortController();

        loadFavorites(token, controller.signal);

        return () => {
            controller.abort();
        };
    }, [token]);

    const email = useSessionStore((state) => state.session?.email);

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

    return {favoritesLabel, loginState, email, isLoggingOut, handleLogout};
};
