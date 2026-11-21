import {showsRepository, type SearchQuery} from '~/api';

export const searchShows = (query: SearchQuery, signal: AbortSignal) =>
    showsRepository.getShowsList(query, signal);
