export const formatQueryParams = (queryParams: Record<string, string>): string => {
    const query = new URLSearchParams(queryParams).toString();

    return query ? `?${query}` : '';
};
