import {createApi} from './createApi';

export const showsApi = createApi({
    baseUrl: import.meta.env.VITE_API_URL || `${import.meta.env.BASE_URL}api`,
});
