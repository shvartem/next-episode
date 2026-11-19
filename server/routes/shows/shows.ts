import {Router} from 'express';

import {getShows} from './showsController.ts';

export const showsRouter = Router();

showsRouter.get('/shows', getShows);
