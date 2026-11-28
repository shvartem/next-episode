import {useSearchParams} from 'react-router';
import type {SearchQuery} from '~/api';

const readPage = (value: string | null) => {
    if (!value || !/^\d+$/.test(value)) {
        return 1;
    }

    const page = Number(value);

    return Number.isSafeInteger(page) && page > 0 ? page : 1;
};

export const useSearchPageParams = () => {
    const [params, setParams] = useSearchParams();
    const search = params.get('q') ?? '';
    const genre = params.get('genre') || null;
    const page = readPage(params.get('page'));

    const updateParams = (next: SearchQuery, replace = false) => {
        const nextParams = new URLSearchParams(params);

        if (next.q) {
            nextParams.set('q', next.q);
        } else {
            nextParams.delete('q');
        }

        if (next.genre) {
            nextParams.set('genre', next.genre);
        } else {
            nextParams.delete('genre');
        }

        if (next.page > 1) {
            nextParams.set('page', String(next.page));
        } else {
            nextParams.delete('page');
        }

        if (nextParams.toString() !== params.toString()) {
            setParams(nextParams, {replace, flushSync: replace});
        }
    };

    return {search, genre, page, updateParams};
};
