import type {TvMazeSearchResult} from '~/api/tvMazeTypes';

export const filterShowsByGenre = (list: TvMazeSearchResult[], genre: string | null): TvMazeSearchResult[] => {
    if (genre === null) {
        return list;
    }

    return list.filter((item) => item.show.genres.includes(genre));
};
