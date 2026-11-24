import {formatQueryParams} from './formatQueryParams';
import type {RequestOptions} from './types';

export const createApi = ({baseUrl}: {baseUrl: string}) => ({
    createRequest: <T>({endpoint, queryParams = {}, method, headers, body, signal}: RequestOptions): Promise<T> => {
        return fetch(`${baseUrl}${endpoint}${formatQueryParams(queryParams)}`, {method, headers, body, signal}).then((response) => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return response.json();
        });
    },
});
