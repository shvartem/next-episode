import type {TvShow} from './types';

export const getTvShowsList = ({query, signal}: {query: string; signal?: AbortSignal}): Promise<TvShow[]> => {
    return fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`, {signal}).then((r) => {
        if (!r.ok) {
            throw new Error(`Request failed with status ${r.status}`);
        }

        return r.json();
    });
};
