import {getTvShowsList} from '../../api';

export const searchShows = async (value: string, signal?: AbortSignal) => {
    const query = value.trim();

    if (!query) {
        return null;
    }

    return getTvShowsList({query, signal});
};
