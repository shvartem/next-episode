import {showsRepository} from '~/api';

export const searchShows = async (value: string, signal?: AbortSignal) => {
    const query = value.trim();

    if (!query) {
        return null;
    }

    const shows = await showsRepository.getShowsList(query, signal);

    return shows.toSorted((a, b) => a.show.name.localeCompare(b.show.name));
};
