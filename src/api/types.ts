export interface RequestOptions {
    endpoint: string;
    queryParams?: Record<string, string>;
    method?: 'GET' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    signal?: AbortSignal;
}
