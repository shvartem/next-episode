import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router/dom';

import 'modern-normalize/modern-normalize.css';
import './index.css';

import {router} from './router';
import {ApiProvider} from '~/ApiProvider/ApiProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApiProvider>
            <RouterProvider router={router} />
        </ApiProvider>
    </StrictMode>,
);
