import type {ReactNode} from 'react';

import type {TvShow} from '#shared/shows';

export interface Props {
    children: ReactNode;
}

export interface FavoritesToast {
    message: string;
    kind: 'added' | 'removed' | 'error';
}

export interface FavoriteChange {
    item: TvShow;
    selected: boolean;
}
