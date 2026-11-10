import {useState} from 'react';

import type {Props} from './types';

export const useSearchFormPresenter = (props: Props) => {
    const {onSubmit} = props;

    const [search, setSearch] = useState('');

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = evt.target.value;

        setSearch(value);
        onSubmit(value);
    };

    const handleSubmit = (evt: React.SubmitEvent<HTMLFormElement>) => {
        evt.preventDefault();
    };

    return {
        search,
        handleChange,
        handleSubmit,
    };
};
