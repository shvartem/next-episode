import type {ShowsPage} from '#shared/shows';

export interface Props {
    className?: string;
    result: ShowsPage;
    selectedGenre: string | null;
    onGenreChange: (genre: string | null) => void;
    onPageChange: (page: number) => void;
}
