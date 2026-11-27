import {useEffect, useState} from 'react';
import {useLocation, useNavigationType, useSearchParams} from 'react-router';

import type {SearchQuery} from '~/api';
import type {SearchResponse} from '../types';
import {updateFavoriteWithToast} from '../../handlers/updateFavoriteWithToast';
import {searchShows} from './tasks/searchShows';

const SUBMIT_DELAY = 300;

const readPage = (value: string | null) => {
    if (!value || !/^\d+$/.test(value)) {
        return 1;
    }

    const page = Number(value);

    return Number.isSafeInteger(page) && page > 0 ? page : 1;
};

export const useSearchPage = () => {
    const [params, setParams] = useSearchParams();
    const {key} = useLocation();
    const navigationType = useNavigationType();
    const [response, setResponse] = useState<SearchResponse | null>(null);

    const search = params.get('q') ?? '';
    const q = search.trim();
    const genre = params.get('genre') || null;
    const page = readPage(params.get('page'));
    const currentResponse = response?.locationKey === key ? response : null;

    useEffect(() => {
        if (!q) {
            return;
        }

        const abort = new AbortController();
        const load = async () => {
            const [error, result] = await searchShows({q, genre, page}, abort.signal);

            if (abort.signal.aborted) {
                return;
            }

            if (error === null) {
                setResponse({locationKey: key, result});
            } else {
                setResponse({locationKey: key, error: error.message});
            }
        };

        // Typing replaces the location. Filters, pagination and browser history load immediately.
        const timeout = navigationType === 'REPLACE' ? setTimeout(load, SUBMIT_DELAY) : undefined;

        if (timeout === undefined) {
            void load();
        }

        return () => {
            clearTimeout(timeout);
            abort.abort();
        };
    }, [q, genre, page, key, navigationType]);

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

    const result = currentResponse?.result;

    return {
        search,
        error: currentResponse?.error,
        isLoading: Boolean(q) && !currentResponse,
        result,
        hasMatches: (result?.totalCount ?? 0) > 0,
        onFavoriteClick: updateFavoriteWithToast,
        selectedGenre: genre,
        searchHint: 'Results update automatically.',
        handleSearch: (value: string) => updateParams({q: value, genre: null, page: 1}, true),
        handleGenreChange: (value: string | null) => updateParams({q: search, genre: value, page: 1}),
        handlePageChange: (value: number) => updateParams({q: search, genre, page: value}),
    };
};
