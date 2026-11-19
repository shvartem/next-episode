import {NavLink, Outlet} from 'react-router';

import {useRootLayoutContent} from './logic/useRootLayoutContent';

import styles from './RootLayoutContent.module.css';

export const RootLayoutContent = () => {
    const {favoritesLabel} = useRootLayoutContent();

    return (
        <div className={styles.layout}>
            <nav className={styles.nav}>
                <NavLink to="/">Home</NavLink>
                <NavLink className={styles.favoritesLink} to="/favorites">
                    {favoritesLabel}
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
};
