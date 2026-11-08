import { createBrowserRouter } from 'react-router'
import RootLayout from './RootLayout/RootLayout'
import SearchPage from './pages/SearchPage/SearchPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <SearchPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], { basename: import.meta.env.BASE_URL })
