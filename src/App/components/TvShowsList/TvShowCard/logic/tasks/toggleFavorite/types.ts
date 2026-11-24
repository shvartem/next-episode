import type {FavoritesResult} from '~/api';

export type FavoritesTaskResult =
    | [error: null, snapshot: FavoritesResult]
    | [error: Error, snapshot: null];

export type FavoriteUpdateResult = 'added' | 'removed' | 'error';
