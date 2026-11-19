export interface RequestOptions {
    endpoint: string;
    queryParams?: Record<string, string>;
    signal?: AbortSignal;
}
