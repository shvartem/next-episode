import type {Props} from './types';
import {useGenreFilteredList} from './useGenreFilteredList';
import {usePaginatedList} from './usePaginatedList';

const PAGE_SIZE = 3;

export const useTvShowsResult = (props: Props) => {
    const {list} = props;

    const {genres, selectedGenre, filteredList, setSelectedGenre} = useGenreFilteredList(list);
    const {page, pagesCount, pageItems, setPage} = usePaginatedList(filteredList, PAGE_SIZE);

    const handleGenreChange = (genre: string | null) => {
        setSelectedGenre(genre);
        setPage(1);
    };

    return {
        hasList: !!list.length,
        totalCount: list.length,
        genres,
        selectedGenre,
        handleGenreChange,
        page,
        pagesCount,
        pageItems,
        setPage,
    };
};
