import {useState} from 'react';

export const usePaginatedList = <T>(items: T[], pageSize: number) => {
    const [page, setPageState] = useState(1);

    const pagesCount = Math.ceil(items.length / pageSize);
    const pageItems = items.slice((page - 1) * pageSize, page * pageSize);

    const setPage = (nextPage: number) => {
        setPageState(Math.min(Math.max(nextPage, 1), Math.max(pagesCount, 1)));
    };

    return {
        page,
        pagesCount,
        pageItems,
        setPage,
    };
};
