import express from 'express';
import {FAVORITES_OWNER_HEADER} from '../../shared/favorites.ts';
import {favoritesRouter} from './favorites/favoritesRouter.ts';
import {logRequest} from './logRequest.ts';
import {showsRouter} from './shows/showsRouter.ts';

export const app = express();

app.use(logRequest);
app.use('/api', (_req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'https://shvartem.github.io');
    next();
}, showsRouter);
app.use('/api/favorites', (req, res, next) => {
    if (req.method === 'OPTIONS' && req.get('Access-Control-Request-Method')) {
        res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
        res.set('Access-Control-Allow-Headers', FAVORITES_OWNER_HEADER);
        res.status(204).end();
        return;
    }

    next();
}, favoritesRouter);
