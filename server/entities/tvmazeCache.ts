import type {TvShow} from '#shared/shows';

import {createCache} from './createCache.ts';

const CACHE_TTL_MS = 5 * 60 * 1000;

export const tvmazeCache = createCache<TvShow[]>(CACHE_TTL_MS);
