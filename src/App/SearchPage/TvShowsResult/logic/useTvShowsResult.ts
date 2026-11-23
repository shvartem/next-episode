import type {Props} from '../types';

export const useTvShowsResult = (props: Props) => {
    const {result} = props;

    return {
        ...result,
        hasMatches: result.totalCount > 0,
        hasItems: result.items.length > 0,
    };
};
