import {randomUUID} from 'node:crypto';
import type {Request} from 'express';

const sessions: Partial<Record<string, string>> = Object.create(null);

export function createSession(email: string) {
    const token = randomUUID();
    sessions[token] = email;
    return {email, token};
}

export function getSession(req: Request) {
    const token = req.get('Authorization')?.match(/^Bearer (\S+)$/i)?.[1];
    const email = token && sessions[token];
    return token && email ? {email, token} : null;
}

export function deleteSession(token: string) {
    delete sessions[token];
}
