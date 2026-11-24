import {NavLink, Outlet} from 'react-router';

import {useRootLayout} from './logic/useRootLayout';
import {Toast} from './Toast/Toast';

import styles from './RootLayout.module.css';

export const RootLayout = () => {
    const {favoritesLabel, loginState, email, isLoggingOut, handleLogout} = useRootLayout();

    return (
        <div className={styles.layout}>
            <nav className={styles.navigation}>
                <NavLink to="/" end>Home</NavLink>
                {email && <NavLink to="/favorites">{favoritesLabel}</NavLink>}

                {email ? (
                    <>
                        <span className={styles.email}>{email}</span>
                        <button type="button" disabled={isLoggingOut} onClick={handleLogout}>Log out</button>
                    </>
                ) : <NavLink to="/login" state={loginState}>Log in</NavLink>}
            </nav>

            <Outlet />
            <Toast />
        </div>
    );
};
