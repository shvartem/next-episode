import {ApiContext} from './useApi';
import {useApiProvider} from './useApiProvider';

interface Props {
    children: React.ReactNode;
}

export const ApiProvider = (props: Props) => {
    const {children} = props;

    const {api} = useApiProvider();

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
