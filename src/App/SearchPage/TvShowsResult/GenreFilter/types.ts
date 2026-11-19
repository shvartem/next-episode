import type {GenreOption} from '#shared/shows';

export interface Props {
    className?: string;
    genres: GenreOption[];
    totalCount: number;
    selectedGenre: string | null;
    onChange: (genre: string | null) => void;
}
