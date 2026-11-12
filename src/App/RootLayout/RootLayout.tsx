import {NavLink, Outlet} from 'react-router';

import styles from './RootLayout.module.css';

export const RootLayout = () => {
    return (
        <div className={styles.layout}>
            <nav>
                <NavLink to="/">Home</NavLink>
            </nav>
            <Outlet />
        </div>
    );
};
