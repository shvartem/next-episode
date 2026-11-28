import type {Props} from '../types';

export const useTvShowsCollection = (props: Props) => ({
    hasItems: props.list.length > 0,
});
