import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import 'modern-normalize/modern-normalize.css';
import './index.css';

import {restoreSession} from './tasks/restoreSession';
import {App} from './App/App';

void restoreSession();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
