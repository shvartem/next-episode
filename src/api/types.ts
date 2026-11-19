export interface RequestOptions {
    endpoint: string;
    method?: 'GET' | 'PUT' | 'DELETE';
    queryParams?: Record<string, string>;
    signal?: AbortSignal;
}
