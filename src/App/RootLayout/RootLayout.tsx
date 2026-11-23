import {NavLink, Outlet} from 'react-router';

import {useRootLayout} from './logic/useRootLayout';
import {Toast} from './Toast/Toast';

import styles from './RootLayout.module.css';

export const RootLayout = () => {
    const {favorites, favoritesLabel, toastMessage} = useRootLayout();

    return (
        <div className={styles.layout}>
            <nav className={styles.navigation}>
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/favorites">{favoritesLabel}</NavLink>
            </nav>
            <Outlet context={favorites}  />
            <Toast message={toastMessage} />
        </div>
    );
};
