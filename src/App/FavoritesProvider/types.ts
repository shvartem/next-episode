import type {ReactNode} from 'react';

export interface Props {
    children: ReactNode;
}

export interface FavoritesToast {
    message: string;
    kind: 'added' | 'removed' | 'error';
}
