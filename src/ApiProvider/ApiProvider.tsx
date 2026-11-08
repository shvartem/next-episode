import {useMemo} from 'react';
import {getTvShowsList} from '../api';
import {ApiContext} from './useApi';

interface Props {
    children: React.ReactNode;
}

export const ApiProvider = (props: Props) => {
    const {children} = props;

    const api = useMemo(
        () => ({
            getTvShowsList,
        }),
        [],
    );

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
