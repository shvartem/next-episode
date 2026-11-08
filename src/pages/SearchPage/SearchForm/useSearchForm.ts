import {useEffect, useState} from 'react';
import {useDebounce} from './useDebounce';

export const MIN_SEARCH_LENGTH = 3;

export const useSearchForm = (props: {onSubmit: (search: string) => void}) => {
    const {onSubmit} = props;

    const [search, setSearch] = useState('');
    const debouncedTvShowList = useDebounce(search, 1000);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setSearch(evt.target.value);
    };

    const handleSubmit = (evt: React.SubmitEvent<HTMLFormElement>) => {
        evt.preventDefault();
    };

    useEffect(() => {
        const trimmedSearch = debouncedTvShowList.trim();

        if (trimmedSearch.length >= MIN_SEARCH_LENGTH) {
            onSubmit(trimmedSearch);
        }
    }, [debouncedTvShowList, onSubmit]);

    return {
        search,
        handleChange,
        handleSubmit,
    };
};
