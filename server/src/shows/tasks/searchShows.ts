import type {SearchQuery, Show} from '../../../../shared/shows.ts';

const PAGE_SIZE = 3;

export async function searchShows(query: SearchQuery, loadShows: (q: string) => Promise<Show[]>) {
    const shows = await loadShows(query.q);
    const counts = new Map<string, number>();

    for (const show of shows) {
        for (const genre of show.genres) {
            counts.set(genre, (counts.get(genre) ?? 0) + 1);
        }
    }

    const {genre} = query;
    const filtered = genre === null ? shows : shows.filter(show => show.genres.includes(genre));
    const sorted = filtered.toSorted((a, b) => a.name.localeCompare(b.name));
    const pagesCount = Math.ceil(sorted.length / PAGE_SIZE);
    const page = Math.min(query.page, Math.max(1, pagesCount));
    const items = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return {items, counts, totalCount: shows.length, page, pagesCount};
}
