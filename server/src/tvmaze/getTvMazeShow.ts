import type {Show} from '../../../shared/shows.ts';
import {toShow} from './toShow.ts';
import type {TvMazeShow} from './types.ts';

export async function getTvMazeShow(showId: number): Promise<Show | null> {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}`, {signal: AbortSignal.timeout(15000)});
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`TVmaze returned ${response.status}`);

    const show = toShow(await response.json() as TvMazeShow);
    const requiredStrings = [show.name, show.url, show.status, show.type];
    const optionalStrings = [show.posterUrl, show.premiered, show.language, show.channel, show.summary];
    if (show.id !== showId
        || !requiredStrings.every(value => typeof value === 'string')
        || !optionalStrings.every(value => value === null || typeof value === 'string')
        || !Array.isArray(show.genres) || !show.genres.every(genre => typeof genre === 'string')
        || (show.rating !== null && !Number.isFinite(show.rating))) {
        throw new Error('TVmaze returned invalid show data');
    }

    return show;
}
