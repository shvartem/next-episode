import {useState} from 'react';

import type {Props} from './types';

export const useSearchForm = (props: Props) => {
    const {onSubmit} = props;

    const [search, setSearch] = useState('');

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = evt.target.value;

        setSearch(value);
        onSubmit(value);
    };

    return {
        search,
        handleChange,
    };
};
