import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import 'modern-normalize/modern-normalize.css';
import './index.css';

import {ApiProvider} from './ApiProvider/ApiProvider';
import {App} from './App/App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApiProvider>
            <App />
        </ApiProvider>
    </StrictMode>,
);
