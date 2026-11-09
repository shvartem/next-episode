import {useMemo} from 'react';
import {getTvShowsList} from '../api';

export const useApiProvider = () => {
    const api = useMemo(
        () => ({
            getTvShowsList,
        }),
        [],
    );

    return {api};
};
