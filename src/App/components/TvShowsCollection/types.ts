import type {ReactNode} from 'react';
import type {Props as ListProps} from './TvShowsList/types';

export interface Props extends ListProps {
    controls?: ReactNode;
    emptyState: ReactNode;
    pagination?: ReactNode;
}
