import {json, Router} from 'express';
import {createSession, deleteSession, getSession} from './sessions.ts';

export const authRouter = Router();

authRouter.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

authRouter.post('/', json(), (req, res) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({error: 'Invalid email'});

        return;
    }

    res.json(createSession(email));
});

authRouter.get('/', (req, res) => {
    const session = getSession(req);

    if (!session) {
        res.status(401).json({error: 'Login required'});

        return;
    }

    res.json(session);
});

authRouter.delete('/', (req, res) => {
    const session = getSession(req);

    if (session) {
        deleteSession(session.token);
    }

    res.json(null);
});
