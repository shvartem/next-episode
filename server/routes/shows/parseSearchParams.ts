import type {ShowsSearchParams} from '#shared/shows';

export const parseSearchParams = (params: URLSearchParams): ShowsSearchParams | null => {
    const query = params.get('q')?.trim();
    const genre = params.get('genre')?.trim() || null;
    const rawPage = params.get('page') ?? '1';
    const page = Number(rawPage);

    if (!query || !/^\d+$/.test(rawPage) || !Number.isSafeInteger(page) || page < 1) {
        return null;
    }

    return {query, genre, page};
};
