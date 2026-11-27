export type FavoriteUpdateResult = 'added' | 'removed';

export type FavoriteTaskResult =
    | [error: null, result: FavoriteUpdateResult | 'skipped']
    | [error: Error, result: null];
