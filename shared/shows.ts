export interface Show {
    id: number;
    name: string;
    url: string;
    genres: string[];
    posterUrl: string | null;
    rating: number | null;
    premiered: string | null;
    status: string;
    type: string;
    language: string | null;
    channel: string | null;
    summary: string | null;
}

export interface SearchQuery {
    q: string;
    genre: string | null;
    page: number;
}

export interface SearchResult {
    items: Show[];
    genres: {name: string; count: number}[];
    totalCount: number;
    page: number;
    pagesCount: number;
}
