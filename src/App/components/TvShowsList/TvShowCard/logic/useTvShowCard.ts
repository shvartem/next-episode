import {useStore} from 'zustand';
import {favoritesStore} from '~/stores/favoritesStore';
import {toastNotify} from '~/tasks/toastNotify';
import {toggleFavorite} from './tasks/toggleFavorite/toggleFavorite';
import type {FavoriteUpdateResult} from './tasks/toggleFavorite/types';
import type {Props} from '../types';

const FAVORITE_TOAST_DURATION_MS = 4_000;

const FAVORITE_UPDATE_MESSAGES: Record<FavoriteUpdateResult, string> = {
    added: 'Added to favorites.',
    removed: 'Removed from favorites.',
    error: 'Could not update favorites. Try again.',
};

const getPlainText = (html: string) => {
    const htmlWithSpaces = html.replace(/<\/p>|<br\s*\/?>/gi, ' ');

    return new DOMParser().parseFromString(htmlWithSpaces, 'text/html').body.textContent.trim();
};

export const useTvShowCard = (props: Props) => {
    const {card: show} = props;

    const isFavorite = useStore(favoritesStore, state => state.items?.some(item => item.id === show.id) ?? false);

    const isFavoriteDisabled = useStore(favoritesStore, state => state.items === null || state.isUpdating);

    const handleFavoriteClick = async () => {
        const update = toggleFavorite(show.id);

        if (!update) return;

        const result = await update;

        toastNotify(FAVORITE_UPDATE_MESSAGES[result], FAVORITE_TOAST_DURATION_MS);
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
        favoriteLabel: `Favorite ${show.name}`,
        isFavorite,
        isFavoriteDisabled,
        handleFavoriteClick,
    };
};
