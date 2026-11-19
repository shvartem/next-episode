import type {Favorites} from '#shared/favorites';

import {showsApi} from '~/api';

export const getFavorites = (signal?: AbortSignal) =>
    showsApi.json<Favorites>({endpoint: 'favorites', signal});
