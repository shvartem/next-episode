export interface RequestOptions {
    endpoint: string;
    queryParams?: Record<string, string>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: string;
    signal?: AbortSignal;
}
