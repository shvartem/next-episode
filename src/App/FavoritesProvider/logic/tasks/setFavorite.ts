import {showsApi} from '~/api';

export const setFavorite = async (id: number, selected: boolean): Promise<void> => {
    await showsApi.request({
        endpoint: `favorites/${id}`,
        method: selected ? 'PUT' : 'DELETE',
    });
};
