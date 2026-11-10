import {useMemo} from 'react';
import {getTvShowsList} from '../api';

export const useApiProviderPresenter = () => {
    const api = useMemo(
        () => ({
            getTvShowsList,
        }),
        [],
    );

    return {api};
};
