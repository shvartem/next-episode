import type {Props} from '../types';

export const useTvShowsResult = (props: Props) => {
    const {genres, totalCount} = props.result;

    return {
        hasGenres: genres.length > 0,
        isEmpty: totalCount === 0,
    };
};
