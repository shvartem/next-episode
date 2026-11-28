import {FavoriteButton} from '../../components/FavoriteButton/FavoriteButton';
import type {Props} from './types';
import {useFavoriteCardAction} from './logic/useFavoriteCardAction';

import styles from './FavoriteCardAction.module.css';

export const FavoriteCardAction = (props: Props) => {
    const {isFavorite, isUpdating, label, restoreText, handleClick} = useFavoriteCardAction(props);

    return (
        <FavoriteButton
            className={restoreText ? styles.restoreButton : undefined}
            aria-label={label}
            aria-pressed={isFavorite ? true : undefined}
            disabled={isUpdating}
            onClick={handleClick}
        >
            <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
            {restoreText && <span className={styles.restoreText}>{restoreText}</span>}
        </FavoriteButton>
    );
};
