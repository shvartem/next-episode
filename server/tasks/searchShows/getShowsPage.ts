import type {GenreOption, ShowsPage, ShowsSearchParams, TvShow} from '#shared/shows';
import {filterShowsByGenre} from './filterShowsByGenre.ts';

const PAGE_SIZE = 3;

const getGenreOptions = (list: TvShow[]): GenreOption[] => {
    const counts = new Map<string, number>();

    for (const item of list) {
        for (const genre of item.show.genres) {
            counts.set(genre, (counts.get(genre) ?? 0) + 1);
        }
    }

    return [...counts]
        .map(([name, count]) => ({name, count}))
        .sort((a, b) => a.name.localeCompare(b.name));
};

export const getShowsPage = (list: TvShow[], params: ShowsSearchParams): ShowsPage => {
    const filteredList = filterShowsByGenre(list, params.genre);
    const pagesCount = Math.ceil(filteredList.length / PAGE_SIZE);
    const page = Math.min(params.page, Math.max(pagesCount, 1));

    return {
        items: filteredList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        genres: getGenreOptions(list),
        unfilteredCount: list.length,
        totalCount: filteredList.length,
        page,
        pagesCount,
    };
};
