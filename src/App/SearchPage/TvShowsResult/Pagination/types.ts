export interface Props {
    className?: string;
    page: number;
    pagesCount: number;
    onChange: (page: number) => void;
}
