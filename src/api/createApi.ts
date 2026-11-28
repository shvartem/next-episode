import {formatQueryParams} from './formatQueryParams';
import type {RequestOptions} from './types';

export const createApi = ({baseUrl}: {baseUrl: string}) => {
    const request = async ({endpoint, queryParams = {}, method, headers, body, signal}: RequestOptions) => {
        const response = await fetch(`${baseUrl}${endpoint}${formatQueryParams(queryParams)}`, {method, headers, body, signal});

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response;
    };

    return {
        createRequest: async <T>(options: RequestOptions): Promise<T> => {
            const response = await request(options);

            return response.json();
        },
        createEmptyRequest: async (options: RequestOptions): Promise<void> => {
            await request(options);
        },
    };
};
