import type {RequestHandler} from 'express';
import {log} from './log.ts';

export const logRequest: RequestHandler = (req, res, next) => {
    const started = performance.now();
    const params = new URLSearchParams();
    for (const key of ['q', 'genre', 'page']) {
        const value = req.query[key];
        if (typeof value === 'string') params.set(key, value);
    }
    const target = params.size ? `${req.path}?${params}` : req.path;

    res.once('close', () => {
        const duration = Math.round(performance.now() - started);
        const request = `${req.method} ${target}`;
        if (!res.writableFinished) {
            log('WARN', 'HTTP', `${request} | connection closed | ${duration} ms`);
            return;
        }

        const status = res.statusCode;
        const level = status >= 500 ? 'ERROR' : status >= 400 ? 'WARN' : 'OK';
        log(level, 'HTTP', `${request} | ${status} | ${duration} ms`);
    });
    next();
};
