import {showsRepository, type SearchQuery} from '~/api';
import type {SearchTaskResult} from '../../types';

export const searchShows = async (query: SearchQuery, signal: AbortSignal): Promise<SearchTaskResult> => {
    try {
        return [null, await showsRepository.getShowsList(query, signal)];
    } catch (error) {
        return [error instanceof Error ? error : new Error('Could not load shows.', {cause: error}), null];
    }
};
