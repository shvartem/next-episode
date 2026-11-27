import type {Show} from '~/api';

export interface Props {
    show: Show;
    onClick: (show: Show) => Promise<void>;
}
