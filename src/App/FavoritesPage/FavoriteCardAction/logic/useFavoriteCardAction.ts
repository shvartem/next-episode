import {useState} from 'react';
import {useFavoritesStore} from '~/App/hooks/useFavoritesStore';
import type {Props} from '../types';

export const useFavoriteCardAction = ({show, onClick}: Props) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const isFavorite = useFavoritesStore((state) => state.items?.some((item) => item.id === show.id) ?? false);

    const handleClick = async () => {
        if (isUpdating) {
            return;
        }

        setIsUpdating(true);

        try {
            await onClick(show);
        } finally {
            setIsUpdating(false);
        }
    };

    const restoreText = isFavorite ? undefined : 'Restore to favorites';

    return {
        isFavorite,
        isUpdating,
        label: restoreText ? `${restoreText}: ${show.name}` : `Remove ${show.name} from favorites`,
        restoreText,
        handleClick,
    };
};
