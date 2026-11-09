import type {GenreOption} from './types';

interface Props {
    genres: GenreOption[];
    totalCount: number;
    selectedGenre: string | null;
    onChange: (genre: string | null) => void;
}

export const useGenreFilter = (props: Props) => {
    const {genres, totalCount, selectedGenre, onChange} = props;

    const chips = genres.map((genre) => {
        const isSelected = genre.name === selectedGenre;

        return {
            name: genre.name,
            count: genre.count,
            isSelected,
            handleClick: () => onChange(isSelected ? null : genre.name),
        };
    });

    return {
        isVisible: genres.length > 0,
        totalCount,
        isAllSelected: selectedGenre === null,
        handleReset: () => onChange(null),
        chips,
    };
};
