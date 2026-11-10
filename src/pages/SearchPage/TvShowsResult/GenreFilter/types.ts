export interface GenreOption {
    name: string;
    count: number;
}

export interface Props {
    className?: string;
    genres: GenreOption[];
    totalCount: number;
    selectedGenre: string | null;
    onChange: (genre: string | null) => void;
}
