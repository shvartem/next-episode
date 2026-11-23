import type {Props} from '../types';

export const useSearchForm = (props: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.currentTarget.value);
    };

    return {handleChange};
};
