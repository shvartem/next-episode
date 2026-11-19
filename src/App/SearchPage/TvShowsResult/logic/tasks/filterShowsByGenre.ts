import type {TvShow} from '../../../types';

export const filterShowsByGenre = (list: TvShow[], genre: string | null): TvShow[] => {
    if (genre === null) {
        return list;
    }

    return list.filter((item) => item.show.genres.includes(genre));
};
