import type {Props} from '../types';

const getPlainText = (html: string) => {
    const htmlWithSpaces = html.replace(/<\/p>|<br\s*\/?>/gi, ' ');

    return new DOMParser().parseFromString(htmlWithSpaces, 'text/html').body.textContent.trim();
};

export const useTvShowCard = (props: Props) => {
    const {card: show} = props;

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
    };
};
