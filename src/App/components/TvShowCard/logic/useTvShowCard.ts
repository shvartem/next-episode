import {useId, useState} from 'react';
import {createPath, useLocation} from 'react-router';
import {useStore} from 'zustand';
import {sessionStore} from '~/stores/sessionStore';
import {favoritesStore} from '~/stores/favoritesStore';
import type {Props} from '../types';

const getPlainText = (html: string) => {
    const htmlWithSpaces = html.replace(/<\/p>|<br\s*\/?>/gi, ' ');

    return new DOMParser().parseFromString(htmlWithSpaces, 'text/html').body.textContent.trim();
};

export const useTvShowCard = (props: Props) => {
    const {card: show, onFavoriteClick} = props;
    const [isUpdating, setIsUpdating] = useState(false);
    const loginPromptId = useId();
    const loginState = {returnTo: createPath(useLocation())};

    const isFavorite = useStore(favoritesStore, state => state.items?.some(item => item.id === show.id) ?? false);

    const isLoggedIn = useStore(sessionStore, state => state.session !== null);

    const areFavoritesLoaded = useStore(favoritesStore, state => state.items !== null);

    const handleFavoriteClick = async () => {
        if (isUpdating || !isLoggedIn || !areFavoritesLoaded) {
            return;
        }

        setIsUpdating(true);

        try {
            await onFavoriteClick(show);
        } finally {
            setIsUpdating(false);
        }
    };

    const details = [show.premiered?.slice(0, 4), show.status, show.type, show.language, show.channel]
        .filter(Boolean)
        .join(' · ');

    return {
        name: show.name,
        url: show.url,
        posterUrl: show.posterUrl,
        posterAlt: `${show.name} poster`,
        details,
        rating: show.rating,
        hasRating: show.rating !== null,
        genres: show.genres,
        hasGenres: !!show.genres.length,
        summary: show.summary ? getPlainText(show.summary) : '',
        favoriteLabel: isLoggedIn ? `Favorite ${show.name}` : 'Log in to add favorites',
        isFavorite,
        favoritePressed: isLoggedIn ? isFavorite : undefined,
        favoriteLoginPromptId: isLoggedIn ? undefined : loginPromptId,
        loginState,
        isFavoriteDisabled: isLoggedIn && (!areFavoritesLoaded || isUpdating),
        handleFavoriteClick,
    };
};
