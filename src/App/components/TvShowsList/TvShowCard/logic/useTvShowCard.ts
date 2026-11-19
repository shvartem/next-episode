import {useFavorites} from '~/App/favorites/FavoritesContext';
import type {Props} from '../types';

const getPlainText = (html: string) => {
    const htmlWithSpaces = html.replace(/<\/p>|<br\s*\/?>/gi, ' ');

    return new DOMParser().parseFromString(htmlWithSpaces, 'text/html').body.textContent.trim();
};

export const useTvShowCard = (props: Props) => {
    const {card} = props;
    const {show} = card;
    const {favorites, isSaving, changeFavorite} = useFavorites();
    const isFavorite = favorites?.items.some(({show: item}) => item.id === show.id) ?? false;

    const channel = show.network ?? show.webChannel;
    const details = [show.premiered?.slice(0, 4), show.status, show.type, show.language, channel?.name]
        .filter(Boolean)
        .join(' · ');

    return {
        name: show.name,
        isFavorite,
        favoriteLabel: `Favorite: ${show.name}`,
        favoriteIcon: isFavorite ? '★' : '☆',
        isFavoriteDisabled: !favorites || isSaving,
        handleFavorite: () => changeFavorite(show.id, show.name, !isFavorite),
        url: show.url,
        posterUrl: show.image?.medium ?? null,
        posterAlt: `${show.name} poster`,
        details,
        rating: show.rating.average,
        hasRating: show.rating.average !== null,
        genres: show.genres,
        hasGenres: !!show.genres.length,
        summary: show.summary ? getPlainText(show.summary) : '',
    };
};
