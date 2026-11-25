import {useId, useState} from 'react';
import {createPath, useLocation} from 'react-router';
import {useStore} from 'zustand';
import {sessionStore} from '~/stores/sessionStore';
import {favoritesStore} from '~/stores/favoritesStore';
import type {ToastTone} from '~/stores/toastStore';
import {toastNotify} from '~/tasks/toastNotify';
import {toggleFavorite} from './tasks/toggleFavorite/toggleFavorite';
import type {FavoriteUpdateResult} from './tasks/toggleFavorite/types';
import type {Props} from '../types';

const FAVORITE_TOAST_DURATION_MS = 4_000;

const FAVORITE_UPDATE_TOASTS: Record<FavoriteUpdateResult, {message: (name: string) => string; tone: ToastTone}> = {
    added: {message: name => `“${name}” added to favorites.`, tone: 'success'},
    removed: {message: name => `“${name}” removed from favorites.`, tone: 'warning'},
};

const getPlainText = (html: string) => {
    const htmlWithSpaces = html.replace(/<\/p>|<br\s*\/?>/gi, ' ');

    return new DOMParser().parseFromString(htmlWithSpaces, 'text/html').body.textContent.trim();
};

export const useTvShowCard = (props: Props) => {
    const {card: show} = props;
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

        const [error, result] = await toggleFavorite(show.id).finally(() => setIsUpdating(false));

        if (error !== null) {
            toastNotify(`Could not update favorites for “${show.name}”. Try again.`, FAVORITE_TOAST_DURATION_MS);

            return;
        }

        if (result !== 'skipped') {
            const {message, tone} = FAVORITE_UPDATE_TOASTS[result];
            toastNotify(message(show.name), FAVORITE_TOAST_DURATION_MS, tone);
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
