import type {SearchQuery, SearchResult} from '~/api';

export type SearchTaskResult =
    | [error: null, result: SearchResult]
    | [error: Error, result: null];

export interface SearchResponse {
    query: SearchQuery;
    isLoading: boolean;
    result?: SearchResult;
    error?: string;
}
