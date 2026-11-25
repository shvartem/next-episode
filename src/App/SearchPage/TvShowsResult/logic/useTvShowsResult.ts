import {updateFavoriteWithToast} from '../../../handlers/updateFavoriteWithToast';
import type {Props} from '../types';

export const useTvShowsResult = (props: Props) => {
    const {result} = props;

    return {
        onFavoriteClick: updateFavoriteWithToast,
        ...result,
        hasMatches: result.totalCount > 0,
        hasItems: result.items.length > 0,
    };
};
