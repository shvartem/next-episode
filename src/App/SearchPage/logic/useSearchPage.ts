import {useEffect, useRef, useState} from 'react';
import type {SearchQuery, SearchResult} from '~/api';
import {searchShows} from './tasks/searchShows/searchShows';

const SUBMIT_DELAY = 300;

export const useSearchPage = () => {
    const [query, setQuery] = useState<SearchQuery>({q: '', genre: null, page: 1});
    const [result, setResult] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const controller = useRef<AbortController | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const request = (next: SearchQuery, delay = 0) => {
        clearTimeout(timer.current);
        controller.current?.abort();
        setQuery(next);
        setError(null);
        setIsLoading(Boolean(next.q));

        if (!next.q) {
            setResult(null);
            return;
        }

        const abort = new AbortController();
        controller.current = abort;
        const load = async () => {
            try {
                const data = await searchShows(next, abort.signal);
                if (!abort.signal.aborted) setResult(data);
            } catch (err) {
                if (!abort.signal.aborted && err instanceof Error) setError(err.message);
            } finally {
                if (!abort.signal.aborted) setIsLoading(false);
            }
        };

        if (delay) timer.current = setTimeout(load, delay);
        else void load();
    };

    useEffect(() => () => {
        clearTimeout(timer.current);
        controller.current?.abort();
    }, []);

    return {
        error,
        isLoading,
        result,
        selectedGenre: query.genre,
        searchHint: 'Results update automatically.',
        handleSearch: (value: string) => request({q: value.trim(), genre: null, page: 1}, SUBMIT_DELAY),
        handleGenreChange: (genre: string | null) => request({...query, genre, page: 1}),
        handlePageChange: (page: number) => request({...query, page}),
    };
};
