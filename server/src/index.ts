import express from 'express';
import {log} from './log.ts';
import {logRequest} from './logRequest.ts';
import {showsRouter} from './shows/showsRouter.ts';

const app = express();
app.use(logRequest);
app.use('/api', (_req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'https://shvartem.github.io');
    next();
}, showsRouter);

const port = Number(process.env.PORT ?? 3001);
app.listen(port, (error) => {
    if (error) throw error;
    log('INFO', 'API', `Shows API listening on port ${port}`);
});
