import {useState} from 'react';
import type {TvMazeSearchResult} from '~/api/tvMazeTypes';
import type {GenreOption} from '../GenreFilter/types';

import {filterShowsByGenre} from './tasks/filterShowsByGenre';

const getGenreOptions = (list: TvMazeSearchResult[]): GenreOption[] => {
    const counts = new Map<string, number>();

    for (const item of list) {
        for (const genre of item.show.genres) {
            counts.set(genre, (counts.get(genre) ?? 0) + 1);
        }
    }

    return [...counts]
        .map(([name, count]) => ({name, count}))
        .toSorted((a, b) => a.name.localeCompare(b.name));
};

export const useGenreFilteredList = (list: TvMazeSearchResult[]) => {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const genres = getGenreOptions(list);
    const filteredList = filterShowsByGenre(list, selectedGenre);

    return {
        genres,
        selectedGenre,
        filteredList,
        setSelectedGenre,
    };
};
