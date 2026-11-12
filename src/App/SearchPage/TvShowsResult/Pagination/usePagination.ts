import type {Props} from './types';

export const usePagination = (props: Props) => {
    const {page, pagesCount, onChange} = props;

    const pages = Array.from({length: pagesCount}, (_, index) => {
        const value = index + 1;

        return {
            value,
            isCurrent: value === page,
            handleClick: () => onChange(value),
        };
    });

    return {
        isVisible: pagesCount > 1,
        pages,
        isFirst: page === 1,
        isLast: page === pagesCount,
        handlePrevious: () => onChange(page - 1),
        handleNext: () => onChange(page + 1),
    };
};
