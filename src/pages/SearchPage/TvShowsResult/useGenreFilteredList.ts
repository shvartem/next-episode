import {useState} from 'react';
import type {TvShow} from '../../../api/types';
import type {GenreOption} from './GenreFilter/types';

const getGenreOptions = (list: TvShow[]): GenreOption[] => {
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

export const useGenreFilteredList = (list: TvShow[]) => {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const genres = getGenreOptions(list);
    const filteredList = selectedGenre ? list.filter((item) => item.show.genres.includes(selectedGenre)) : list;

    return {
        genres,
        selectedGenre,
        filteredList,
        setSelectedGenre,
    };
};
