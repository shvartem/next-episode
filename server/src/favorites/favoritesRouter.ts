import {Router} from 'express';
import {FAVORITES_OWNER_HEADER} from '../../../shared/favorites.ts';
import type {FavoritesResult} from '../../../shared/favorites.ts';
import type {Show} from '../../../shared/shows.ts';
import {getTvMazeShow} from '../tvmaze/getTvMazeShow.ts';

interface OwnerLocals {
    owner: string;
}

const UUID_V4 = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
const favorite: Partial<Record<string, Record<number, Show>>> = {};

function getFavorites(owner: string): FavoritesResult {
    const collection = favorite[owner];
    const items = collection ? Object.values(collection) : [];
    return {items, count: items.length};
}

export const favoritesRouter = Router();

favoritesRouter.use<unknown, unknown, unknown, unknown, OwnerLocals>((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    const owner = req.get(FAVORITES_OWNER_HEADER);
    if (!owner || !UUID_V4.test(owner)) {
        res.status(400).json({error: 'Invalid favorites owner'});
        return;
    }

    res.locals.owner = owner.toLowerCase();
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
    res.json(getFavorites(res.locals.owner));
});

type ShowParams = {showId: string};
type MutationResult = FavoritesResult | {error: string};

favoritesRouter.put<ShowParams, MutationResult, unknown, unknown, OwnerLocals>('/:showId', async (req, res) => {
    const {owner} = res.locals;
    const showId = Number(req.params.showId);

    if (!favorite[owner]?.[showId]) {
        try {
            const show = await getTvMazeShow(showId);
            if (!show) {
                res.status(404).json({error: 'Show not found'});
                return;
            }

            const collection = favorite[owner] ??= {};
            collection[show.id] ??= show;
        } catch {
            res.status(502).json({error: 'Unable to load show from TVmaze'});
            return;
        }
    }

    res.json(getFavorites(owner));
});

favoritesRouter.delete<ShowParams, FavoritesResult, unknown, unknown, OwnerLocals>('/:showId', (req, res) => {
    const {owner} = res.locals;
    const collection = favorite[owner];
    if (collection) delete collection[Number(req.params.showId)];
    res.json(getFavorites(owner));
});
