import type {TvShow} from '../../../../../api/types';

interface Props {
    card: TvShow;
}

const getPlainText = (html: string) => {
    const htmlWithSpaces = html.replace(/<\/p>|<br\s*\/?>/gi, ' ');

    return new DOMParser().parseFromString(htmlWithSpaces, 'text/html').body.textContent.trim();
};

export const useTvShowCard = (props: Props) => {
    const {card} = props;
    const {show} = card;

    const channel = show.network ?? show.webChannel;
    const details = [show.premiered?.slice(0, 4), show.status, show.type, show.language, channel?.name]
        .filter(Boolean)
        .join(' · ');

    return {
        name: show.name,
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
