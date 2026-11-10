import type {Props} from './types';
import {ApiContext} from './useApi';
import {useApiProviderPresenter} from './useApiProviderPresenter';

export const ApiProvider = (props: Props) => {
    const {children} = props;

    const {api} = useApiProviderPresenter();

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
