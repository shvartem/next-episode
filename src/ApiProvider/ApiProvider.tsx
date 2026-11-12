import type {Props} from './types';
import {ApiContext} from './useApi';
import {useApiProvider} from './useApiProvider';

export const ApiProvider = (props: Props) => {
    const {children} = props;

    const {api} = useApiProvider();

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
