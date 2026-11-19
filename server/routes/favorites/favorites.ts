import {Router} from 'express';

import {deleteFavorite, listFavorites, putFavorite, validateFavoriteId} from './favoritesController.ts';

export const favoritesRouter = Router();

favoritesRouter.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

favoritesRouter.get('/', listFavorites);
favoritesRouter.route('/:id')
    .all(validateFavoriteId)
    .put(putFavorite)
    .delete(deleteFavorite);
