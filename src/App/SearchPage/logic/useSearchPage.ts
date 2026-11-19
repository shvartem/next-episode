import debounce from 'debounce';
import {useEffect, useMemo, useRef, useState} from 'react';
import type {TvShow} from '../types';

import {searchShows} from './tasks/searchShows/searchShows';

const SUBMIT_DELAY = 300;

export const useSearchPage = () => {
    const [tvShowsList, setTvShowsList] = useState<TvShow[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const controllerRef = useRef<AbortController | null>(null);

    const debouncedSearch = useMemo(
        () =>
            debounce(async (value: string, signal: AbortSignal) => {
                setIsLoading(true);
                setError(null);

                try {
                    const data = await searchShows(value, signal);

                    if (!signal.aborted) {
                        setTvShowsList(data);
                    }
                } catch (err) {
                    if (signal.aborted) {
                        return;
                    }

                    if (err instanceof Error) {
                        setError(err.message);
                    }
                } finally {
                    if (!signal.aborted) {
                        setIsLoading(false);
                    }
                }
            }, SUBMIT_DELAY),
        [],
    );

    const handleSearch = (value: string) => {
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();
        debouncedSearch(value, controllerRef.current.signal);
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
        tvShowsList,
        searchHint: 'Results update automatically.',
        handleSearch,
    };
};
