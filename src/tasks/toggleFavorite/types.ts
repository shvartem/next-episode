export type FavoritesTaskResult<T> =
    | [error: null, result: T]
    | [error: Error, result: null];

export type FavoriteUpdateResult = 'added' | 'removed';

export type ToggleFavoriteTaskResult =
    | [error: null, result: FavoriteUpdateResult | 'skipped']
    | [error: Error, result: null];
