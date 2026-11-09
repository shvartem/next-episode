import type {TvShow} from '../../../api/types';
import {usePaginatedList} from './usePaginatedList';

const PAGE_SIZE = 3;

interface Props {
    list: TvShow[];
}

export const useTvShowsResult = (props: Props) => {
    const {list} = props;

    const {page, pagesCount, pageItems, setPage} = usePaginatedList(list, PAGE_SIZE);

    return {
        hasList: !!list.length,
        page,
        pagesCount,
        pageItems,
        setPage,
    };
};
