import {useEffect, useRef, useState} from 'react';

import type {Favorites} from '#shared/favorites';
import type {FavoritesToast} from '../types';

import {getFavorites} from './tasks/getFavorites';
import {setFavorite} from './tasks/setFavorite';

export const useFavoritesProvider = () => {
    const [favorites, setFavorites] = useState<Favorites | null>(null);
    const [loadFailed, setLoadFailed] = useState(false);
    const [loadAttempt, setLoadAttempt] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState<FavoritesToast | null>(null);
    const saving = useRef(false);

    useEffect(() => {
        const controller = new AbortController();

        getFavorites(controller.signal)
            .then((result) => {
                if (!controller.signal.aborted) {
                    setFavorites(result);
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) {
                    setLoadFailed(true);
                }
            });

        return () => controller.abort();
    }, [loadAttempt]);

    useEffect(() => {
        if (!toast) {
            return;
        }

        const timer = window.setTimeout(() => setToast(null), 4000);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const reload = () => {
        setLoadFailed(false);
        setLoadAttempt((attempt) => attempt + 1);
    };

    const changeFavorite = async (id: number, name: string, selected: boolean) => {
        if (!favorites || saving.current) {
            return;
        }

        saving.current = true;
        setIsSaving(true);

        try {
            await setFavorite(id, selected);
            setToast({
                kind: selected ? 'added' : 'removed',
                message: selected ? `Added ${name} to favorites.` : `Removed ${name} from favorites.`,
            });

            try {
                setFavorites(await getFavorites());
            } catch {
                setFavorites(null);
                setLoadFailed(true);
            }
        } catch {
            setToast({kind: 'error', message: 'Could not update favorites. Please try again.'});
        } finally {
            saving.current = false;
            setIsSaving(false);
        }
    };

    return {
        favoritesContext: {favorites, isSaving, loadFailed, reload, changeFavorite},
        toast,
    };
};
