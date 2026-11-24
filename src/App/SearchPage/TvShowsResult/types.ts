import type {SearchResult} from '~/api';

export interface Props {
    className?: string;
    result: SearchResult;
    selectedGenre: string | null;
    onGenreChange: (genre: string | null) => void;
    onPageChange: (page: number) => void;
}
