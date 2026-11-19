import express from 'express';

import {logger} from './logger.ts';
import {apiCors} from './middleware/apiCors.ts';
import {favoritesRouter} from './routes/favorites/favorites.ts';
import {showsRouter} from './routes/shows/shows.ts';

const app = express();
const port = Number(process.env.PORT ?? '3001');

app.use((req, res, next) => {
    const startedAt = performance.now();
    const {method, path} = req;

    res.once('finish', () => {
        logger.info('http.request.completed', {
            method,
            path,
            status: res.statusCode,
            durationMs: Math.round(performance.now() - startedAt),
        });
    });

    next();
});

app.use('/api', apiCors, showsRouter);
app.use('/api/favorites', favoritesRouter);

app.listen(port, (error) => {
    if (error) {
        logger.error('server.start.failed', error);
        process.exitCode = 1;
        return;
    }

    logger.info('server.started', {port});
});
