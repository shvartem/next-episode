import {createBrowserRouter} from 'react-router';

import {RootLayout} from './RootLayout/RootLayout';
import {SearchPage} from './SearchPage/SearchPage';
import {FavoritesPage} from './FavoritesPage/FavoritesPage';
import {LoginPage} from './LoginPage/LoginPage';
import {NotFoundPage} from './NotFoundPage/NotFoundPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {index: true, element: <SearchPage />},
            {path: 'favorites', element: <FavoritesPage />},
            {path: 'login', element: <LoginPage />},
            {path: '*', element: <NotFoundPage />},
        ],
    },
], {basename: import.meta.env.BASE_URL});
