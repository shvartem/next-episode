import type {ShowsSearchParams} from '#shared/shows';
import {getTvShowsList} from '../../api';

export const searchShows = (params: ShowsSearchParams, signal: AbortSignal) =>
    getTvShowsList(params, signal);
