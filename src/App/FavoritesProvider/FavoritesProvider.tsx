import {FavoritesContext} from '../favorites/FavoritesContext';
import {useFavoritesProvider} from './logic/useFavoritesProvider';
import type {Props} from './types';

import styles from './FavoritesProvider.module.css';

export const FavoritesProvider = (props: Props) => {
    const {children} = props;
    const {favoritesContext, toast} = useFavoritesProvider();

    return (
        <FavoritesContext.Provider value={favoritesContext}>
            {children}
            <div className={styles.toastRegion} role="status" aria-live="polite">
                {toast && <div className={styles.toast} data-kind={toast.kind}>{toast.message}</div>}
            </div>
        </FavoritesContext.Provider>
    );
};
