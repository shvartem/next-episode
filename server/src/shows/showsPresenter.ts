import type {SearchQuery, SearchResult} from '../../../shared/shows.ts';
import {searchTvMaze} from '../tvmaze/searchTvMaze.ts';
import {searchShows} from './tasks/searchShows.ts';

export async function presentShows(query: SearchQuery): Promise<SearchResult> {
    const {counts, ...page} = await searchShows(query, searchTvMaze);
    const genres = [...counts].map(([name, count]) => ({name, count}))
        .toSorted((a, b) => a.name.localeCompare(b.name));

    return {...page, genres};
}
