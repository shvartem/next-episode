import {formatQueryParams} from './formatQueryParams';
import type {RequestOptions} from './types';

export const createApi = ({baseUrl}: {baseUrl: string}) => {
    const request = async ({endpoint, method = 'GET', queryParams = {}, signal}: RequestOptions) => {
        const response = await fetch(`${baseUrl}/${endpoint}${formatQueryParams(queryParams)}`, {method, signal});

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response;
    };

    const json = async <T>(options: RequestOptions): Promise<T> => {
        const response = await request(options);
        return response.json();
    };

    return {request, json};
};
