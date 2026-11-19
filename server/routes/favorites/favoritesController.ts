import type {RequestHandler} from 'express';

import {getFavorites} from '../../entities/favorites.ts';
import {logger} from '../../logger.ts';
import {HttpResponseError} from '../../requestJson.ts';
import {addFavorite} from '../../tasks/favorites/addFavorite.ts';
import {removeFavorite} from '../../tasks/favorites/removeFavorite.ts';

type FavoriteParams = {id: string};

export const listFavorites: RequestHandler = (_req, res) => {
    res.json(getFavorites());
};

export const validateFavoriteId: RequestHandler<FavoriteParams> = (req, res, next) => {
    const {id} = req.params;
    const showId = Number(id);

    if (!/^\d+$/.test(id) || !Number.isSafeInteger(showId) || showId < 1) {
        res.status(400).json({error: 'Show id must be a positive integer'});
        return;
    }

    next();
};

export const putFavorite: RequestHandler<FavoriteParams> = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const {item, created} = await addFavorite(id);
        if (created) {
            res.location(`${req.baseUrl}/${id}`).status(201);
        }

        res.json(item);
    } catch (error) {
        if (error instanceof HttpResponseError && error.status === 404) {
            res.status(404).json({error: 'Show not found'});
            return;
        }

        logger.error('favorites.add.failed', error);
        res.status(502).json({error: 'Could not load the show from TVmaze'});
    }
};

export const deleteFavorite: RequestHandler<FavoriteParams> = (req, res) => {
    removeFavorite(Number(req.params.id));
    res.status(204).end();
};
