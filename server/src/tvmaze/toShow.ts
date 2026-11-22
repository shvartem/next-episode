import type {Show} from '../../../shared/shows.ts';
import type {TvMazeShow} from './types.ts';

export function toShow(show: TvMazeShow): Show {
    return {
        id: show.id,
        name: show.name,
        genres: show.genres,
        url: show.url,
        posterUrl: show.image?.medium ?? null,
        rating: show.rating.average,
        premiered: show.premiered,
        status: show.status,
        type: show.type,
        language: show.language,
        channel: (show.network ?? show.webChannel)?.name ?? null,
        summary: show.summary,
    };
}
