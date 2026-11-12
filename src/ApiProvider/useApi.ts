import {createContext, useContext} from 'react';
import type {TvShow} from '~/api/types';

interface Api {
    getTvShowsList: ({query, signal}: {query: string; signal?: AbortSignal | undefined}) => Promise<TvShow[]>;
}

export const ApiContext = createContext<Api | null>(null);

export const useApi = () => {
    const ctx = useContext(ApiContext);

    if (!ctx) {
        throw new Error(`Use context in ApiProvider!`);
    }

    return ctx;
};
