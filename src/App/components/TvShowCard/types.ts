import type {Show} from '~/api';

export interface Props {
    className?: string;
    card: Show;
    onFavoriteClick: (show: Show) => Promise<void>;
}
