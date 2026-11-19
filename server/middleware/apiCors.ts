import type {RequestHandler} from 'express';

const allowedOrigin = process.env.FRONTEND_ORIGIN;

export const apiCors: RequestHandler = (req, res, next) => {
    res.vary('Origin');

    if (allowedOrigin && req.get('Origin') === allowedOrigin) {
        res.set('Access-Control-Allow-Origin', allowedOrigin);

        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
            res.sendStatus(204);
            return;
        }
    }

    next();
};
