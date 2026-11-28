import {FavoriteButton} from '../../components/FavoriteButton/FavoriteButton';
import {FavoriteLoginPrompt} from './FavoriteLoginPrompt/FavoriteLoginPrompt';
import {useSearchFavoriteButton} from './logic/useSearchFavoriteButton';
import type {Props} from './types';

export const SearchFavoriteButton = (props: Props) => {
    const {
        favoriteLabel, isFavorite, isFavoriteDisabled, handleFavoriteClick,
        favoritePressed, favoriteLoginPromptId, loginState,
    } = useSearchFavoriteButton(props);

    return (
        <>
            <FavoriteButton
                aria-label={favoriteLabel}
                aria-pressed={favoritePressed}
                popoverTarget={favoriteLoginPromptId}
                disabled={isFavoriteDisabled}
                onClick={handleFavoriteClick}
            >
                <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
            </FavoriteButton>

            {favoriteLoginPromptId && <FavoriteLoginPrompt id={favoriteLoginPromptId} loginState={loginState} />}
        </>
    );
};
