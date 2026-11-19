import {showsApi} from '~/api';
import type {ShowsPage, ShowsSearchParams} from '#shared/shows';

export const getTvShowsList = ({query, genre, page}: ShowsSearchParams, signal: AbortSignal) =>
    showsApi<ShowsPage>({
        endpoint: 'shows',
        queryParams: {q: query, page: String(page), ...(genre === null ? {} : {genre})},
        signal,
    });
