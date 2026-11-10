import debounce from 'debounce';
import {useEffect, useMemo, useState} from 'react';
import type {TvShow} from '../../api/types';
import {useApi} from '../../ApiProvider/useApi';

const MIN_SEARCH_LENGTH = 3;
const SUBMIT_DELAY = 1000;

export const useSearchPagePresenter = () => {
    const [tvShowsList, setTvShowsList] = useState<TvShow[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {getTvShowsList} = useApi();

    const handleSearch = useMemo(
        () =>
            debounce(async (value: string) => {
                const trimmedValue = value.trim();

                if (trimmedValue.length < MIN_SEARCH_LENGTH) {
                    return;
                }

                setIsLoading(true);
                setError(null);

                try {
                    const data = await getTvShowsList(trimmedValue);

                    setTvShowsList(data);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }, SUBMIT_DELAY),
        [getTvShowsList],
    );

    useEffect(() => () => handleSearch.clear(), [handleSearch]);

    return {
        error,
        isLoading,
        tvShowsList,
        searchHint: `Type at least ${MIN_SEARCH_LENGTH} characters. Results update automatically.`,
        handleSearch,
    };
};
