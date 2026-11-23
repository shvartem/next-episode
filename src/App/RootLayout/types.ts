import type {FavoritesResult} from '~/api';

export type FavoritesTaskResult =
    | [error: null, snapshot: FavoritesResult]
    | [error: Error, snapshot: null];

export type FavoriteUpdateResult = 'added' | 'removed' | 'error';

export interface FavoriteUpdateCallbacks {
    onUpdateStart: () => void;
    onUpdateResult: (result: FavoriteUpdateResult) => void;
}

export interface FavoritesContext {
    snapshot: FavoritesResult | null;
    favoriteIds: ReadonlySet<number>;
    loadError: string | null;
    isUpdating: boolean;
    toggleFavorite: (showId: number) => Promise<void>;
}
