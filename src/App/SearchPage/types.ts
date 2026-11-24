import type {SearchResult} from '~/api';

export type SearchTaskResult =
    | [error: null, result: SearchResult]
    | [error: Error, result: null];

export interface SearchResponse {
    locationKey: string;
    result?: SearchResult;
    error?: string;
}
