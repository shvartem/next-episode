import type {ReactNode} from 'react';
import type {Show} from '~/api';

export interface Props {
    className?: string;
    card: Show;
    favoriteAction: ReactNode;
}
