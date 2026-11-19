import debounce from 'debounce';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import type {ShowsPage, ShowsSearchParams} from '#shared/shows';
import {searchShows} from './tasks/searchShows/searchShows';

const SUBMIT_DELAY = 300;

export const useSearchPage = () => {
    const [result, setResult] = useState<ShowsPage | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const controllerRef = useRef<AbortController | null>(null);
    const queryRef = useRef('');

    const loadResults = useCallback(async (params: ShowsSearchParams, signal: AbortSignal) => {
        try {
            const data = await searchShows(params, signal);

            if (!signal.aborted) {
                setResult(data);
                setSelectedGenre(params.genre);
            }
        } catch (err) {
            if (!signal.aborted) {
                setError(err instanceof Error ? err.message : 'Search failed');
            }
        } finally {
            if (!signal.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    const debouncedSearch = useMemo(() => debounce(loadResults, SUBMIT_DELAY), [loadResults]);

    const requestResults = (params: ShowsSearchParams, debounced: boolean) => {
        debouncedSearch.clear();
        controllerRef.current?.abort();
        setError(null);

        if (!params.query) {
            setResult(null);
            setSelectedGenre(null);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();
        controllerRef.current = controller;
        setIsLoading(true);

        if (debounced) {
            debouncedSearch(params, controller.signal);
        } else {
            void loadResults(params, controller.signal);
        }
    };

    const handleSearch = (value: string) => {
        queryRef.current = value.trim();
        requestResults({query: queryRef.current, genre: null, page: 1}, true);
    };

    const handleGenreChange = (genre: string | null) => {
        requestResults({query: queryRef.current, genre, page: 1}, false);
    };

    const handlePageChange = (page: number) => {
        requestResults({query: queryRef.current, genre: selectedGenre, page}, false);
    };

    useEffect(
        () => () => {
            debouncedSearch.clear();
            controllerRef.current?.abort();
        },
        [debouncedSearch],
    );

    return {
        error,
        isLoading,
        result,
        selectedGenre,
        searchHint: 'Results update automatically.',
        handleSearch,
        handleGenreChange,
        handlePageChange,
    };
};
