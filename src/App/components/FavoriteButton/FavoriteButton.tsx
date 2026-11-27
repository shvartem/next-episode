import {FavoriteLoginPrompt} from './FavoriteLoginPrompt/FavoriteLoginPrompt';
import {useFavoriteButton} from './logic/useFavoriteButton';
import type {Props} from './types';

import styles from './FavoriteButton.module.css';

export const FavoriteButton = (props: Props) => {
    const {
        favoriteLabel, isFavorite, isFavoriteDisabled, handleFavoriteClick,
        favoritePressed, favoriteLoginPromptId, loginState,
    } = useFavoriteButton(props);

    return (
        <>
        <button
            className={styles.favoriteButton}
            type="button"
            aria-label={favoriteLabel}
            aria-pressed={favoritePressed}
            popoverTarget={favoriteLoginPromptId}
            disabled={isFavoriteDisabled}
            onClick={handleFavoriteClick}
        >
            <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
        </button>

            {favoriteLoginPromptId && <FavoriteLoginPrompt id={favoriteLoginPromptId} loginState={loginState} />}
        </>
    );
};
