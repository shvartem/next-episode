import {useId, useState} from 'react';
import {createPath, useLocation} from 'react-router';
import type {Props} from '../types';
import {useFavoritesStore} from '~/App/hooks/useFavoritesStore';
import {useSessionStore} from '~/App/hooks/useSessionStore';

export const useSearchFavoriteButton = (props: Props) => {
    const {show, onClick} = props;
    const [isUpdating, setIsUpdating] = useState(false);
    const loginPromptId = useId();
    const loginState = {returnTo: createPath(useLocation())};

    const isFavorite = useFavoritesStore((state) => state.items?.some((item) => item.id === show.id) ?? false);

    const isLoggedIn = useSessionStore((state) => state.session !== null);

    const areFavoritesLoaded = useFavoritesStore((state) => state.items !== null);

    const handleFavoriteClick = async () => {
        if (isUpdating || !isLoggedIn || !areFavoritesLoaded) {
            return;
        }

        setIsUpdating(true);

        try {
            await onClick(show);
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        favoriteLabel: isLoggedIn ? `Favorite ${show.name}` : 'Log in to add favorites',
        isFavorite,
        favoritePressed: isLoggedIn ? isFavorite : undefined,
        favoriteLoginPromptId: isLoggedIn ? undefined : loginPromptId,
        loginState,
        isFavoriteDisabled: isLoggedIn && (!areFavoritesLoaded || isUpdating),
        handleFavoriteClick,
    };
};
