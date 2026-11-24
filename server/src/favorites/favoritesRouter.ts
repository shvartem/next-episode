import {Router} from 'express';
import {getSession} from '../auth/sessions.ts';
import type {FavoritesResult} from '../../../shared/favorites.ts';
import {favoritesPresenter} from './favoritesPresenter.ts';

interface OwnerLocals {
    ownerId: string;
}

export const favoritesRouter = Router();

favoritesRouter.use<unknown, unknown, unknown, unknown, OwnerLocals>((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    const session = getSession(req);

    if (!session) {
        res.status(401).json({error: 'Login required'});

        return;
    }

    res.locals.ownerId = session.email;
    next();
});

favoritesRouter.param('showId', (_req, res, next, value: string) => {
    const showId = Number(value);

    if (!/^\d+$/.test(value) || !Number.isSafeInteger(showId) || showId < 1) {
        res.status(400).json({error: 'Invalid show ID'});

        return;
    }

    next();
});

favoritesRouter.get<unknown, FavoritesResult, unknown, unknown, OwnerLocals>('/', (_req, res) => {
    res.json(favoritesPresenter.list(res.locals.ownerId));
});

type ShowParams = {showId: string};
type MutationResult = FavoritesResult | {error: string};

favoritesRouter.put<ShowParams, MutationResult, unknown, unknown, OwnerLocals>('/:showId', async (req, res) => {
    const {ownerId} = res.locals;
    const showId = Number(req.params.showId);

    try {
        const result = await favoritesPresenter.add(ownerId, showId);

        if (result === null) {
            res.status(404).json({error: 'Show not found'});

            return;
        }

        res.json(result);
    } catch {
        res.status(502).json({error: 'Unable to load show'});
    }
});

favoritesRouter.delete<ShowParams, FavoritesResult, unknown, unknown, OwnerLocals>('/:showId', (req, res) => {
    res.json(favoritesPresenter.remove(res.locals.ownerId, Number(req.params.showId)));
});
