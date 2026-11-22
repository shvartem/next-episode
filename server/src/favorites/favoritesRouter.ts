import {Router} from 'express';
import {FAVORITES_OWNER_HEADER} from '../../../shared/favorites.ts';
import type {FavoritesResult} from '../../../shared/favorites.ts';
import {favoritesPresenter} from './favoritesPresenter.ts';

interface OwnerLocals {
    ownerId: string;
}

const UUID_V4 = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

export const favoritesRouter = Router();

favoritesRouter.use<unknown, unknown, unknown, unknown, OwnerLocals>((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    const ownerId = req.get(FAVORITES_OWNER_HEADER);
    if (!ownerId || !UUID_V4.test(ownerId)) {
        res.status(400).json({error: 'Invalid favorites owner'});
        return;
    }

    res.locals.ownerId = ownerId.toLowerCase();
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
        res.status(502).json({error: 'Unable to load show from TVmaze'});
    }
});

favoritesRouter.delete<ShowParams, FavoritesResult, unknown, unknown, OwnerLocals>('/:showId', (req, res) => {
    res.json(favoritesPresenter.remove(res.locals.ownerId, Number(req.params.showId)));
});
