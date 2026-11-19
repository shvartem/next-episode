import type {ShowsPage, ShowsSearchParams} from '#shared/shows';

import {getShowsPage} from './getShowsPage.ts';
import {searchTvmaze} from '../../tvmaze.ts';

export const searchShows = async (params: ShowsSearchParams): Promise<ShowsPage> => {
    const list = await searchTvmaze(params.query);
    return getShowsPage(list, params);
};
