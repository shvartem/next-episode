import {Router} from 'express';

import {logger} from '../../logger.ts';
import {parseSearchParams} from './parseSearchParams.ts';
import {searchShows} from '../../tasks/searchShows/searchShows.ts';

export const showsRouter = Router();
const allowedOrigin = process.env.FRONTEND_ORIGIN;

showsRouter.get('/shows', async (req, res) => {
    res.vary('Origin');

    if (allowedOrigin && req.get('Origin') === allowedOrigin) {
        res.set('Access-Control-Allow-Origin', allowedOrigin);
    }

    const {searchParams} = new URL(req.originalUrl, 'http://localhost');
    const params = parseSearchParams(searchParams);

    if (!params) {
        res.status(400).json({error: 'q must be nonempty and page must be a positive integer'});
        return;
    }

    try {
        const result = await searchShows(params);
        res.json(result);
    } catch (error) {
        logger.error('shows.search.failed', error);
        res.status(502).json({error: 'TVmaze search failed'});
    }
});
