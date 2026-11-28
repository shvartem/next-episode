import {Router} from 'express';
import {presentShows} from './showsPresenter.ts';

export const showsRouter = Router();

showsRouter.get('/shows', async (req, res) => {
    const {q, genre, page = '1'} = req.query;

    if (typeof q !== 'string' || !q.trim() || (genre !== undefined && typeof genre !== 'string')
        || typeof page !== 'string' || !/^\d+$/.test(page) || !Number.isSafeInteger(Number(page)) || Number(page) < 1) {
        res.status(400).json({error: 'Invalid search parameters'});

        return;
    }

    try {
        res.json(await presentShows({q: q.trim(), genre: genre ?? null, page: Number(page)}));
    } catch {
        res.status(502).json({error: 'Unable to load shows'});
    }
});
