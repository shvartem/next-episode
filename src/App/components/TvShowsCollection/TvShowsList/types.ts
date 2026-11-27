import type {ReactNode} from 'react';
import type {Show} from '~/api';

export interface Props {
    className?: string;
    list: Show[];
    renderCard: (show: Show) => ReactNode;
}
