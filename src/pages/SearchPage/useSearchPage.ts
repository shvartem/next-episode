import {useCallback, useState} from 'react';
import type {TvShow} from '../../api/types';
import {useApi} from '../../ApiProvider/useApi';

export const useSearchPage = () => {
    const [tvShowsList, setTvShowsList] = useState<TvShow[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {getTvShowsList} = useApi();

    const handleGetTvShowsList = useCallback(
        (search: string) => {
            setIsLoading(true);
            setError(null);

            getTvShowsList(search)
                .then((data) => {
                    setTvShowsList(data);
                })
                .catch((err) => {
                    if (err instanceof Error) {
                        setError(err.message);
                    }
                })
                .finally(() => setIsLoading(false));
        },
        [getTvShowsList],
    );

    return {
        error,
        isLoading,
        tvShowsList,
        getTvShowsList: handleGetTvShowsList,
    };
};
