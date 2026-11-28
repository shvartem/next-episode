import {useCallback, useEffect, useRef, useState} from 'react';
import type {SearchQuery} from '~/api';
import type {SearchResponse} from '../types';
import {searchShows} from './tasks/searchShows';

export const useShowSearch = ({q, genre, page}: SearchQuery, shouldLoadLocation: boolean) => {
    const [response, setResponse] = useState<SearchResponse | null>(null);
    const request = useRef<AbortController | null>(null);

    const load = useCallback(async (nextQuery: SearchQuery): Promise<SearchResponse | undefined> => {
        request.current?.abort();

        const controller = new AbortController();
        request.current = controller;
        const [error, result] = await searchShows(nextQuery, controller.signal);

        if (controller.signal.aborted) {
            return;
        }

        return error === null
            ? {query: nextQuery, result, isLoading: false}
            : {query: nextQuery, error: error.message, isLoading: false};
    }, []);

    useEffect(() => {
        if (!shouldLoadLocation) {
            return;
        }

        if (!q) {
            request.current?.abort();

            return;
        }

        load({q, genre, page}).then((nextResponse) => {
            if (nextResponse) {
                setResponse(nextResponse);
            }
        });
    }, [q, genre, page, shouldLoadLocation, load]);

    useEffect(() => {
        return () => {
            request.current?.abort();
        };
    }, []);

    const runSearch = async (nextQuery: SearchQuery) => {
        if (!nextQuery.q) {
            request.current?.abort();
            setResponse(null);

            return;
        }

        setResponse({query: nextQuery, isLoading: true});
        const nextResponse = await load(nextQuery);

        if (nextResponse) {
            setResponse(nextResponse);
        }
    };

    const currentResponse =
        response?.query.q === q && response.query.genre === genre && response.query.page === page ? response : null;

    return {
        runSearch,
        error: currentResponse?.error,
        isLoading: currentResponse?.isLoading ?? (shouldLoadLocation && Boolean(q)),
        result: currentResponse?.result,
    };
};
