import {useEffect, useRef, useState} from 'react';

import type {Favorites} from '#shared/favorites';
import type {TvShow} from '#shared/shows';
import type {FavoriteChange, FavoritesToast} from '../types';

import {getFavorites} from './tasks/getFavorites';
import {setFavorite} from './tasks/setFavorite';

const applyChange = (favorites: Favorites, {item, selected}: FavoriteChange): Favorites => {
    const items = favorites.items.filter(({show}) => show.id !== item.show.id);
    if (selected) {
        items.push(item);
        items.sort((a, b) => a.show.id - b.show.id);
    }

    return {items, count: items.length};
};

export const useFavoritesProvider = () => {
    const [favorites, setFavorites] = useState<Favorites | null>(null);
    const [loadFailed, setLoadFailed] = useState(false);
    const [loadAttempt, setLoadAttempt] = useState(0);
    const [pendingChanges, setPendingChanges] = useState<FavoriteChange[]>([]);
    const [toast, setToast] = useState<FavoritesToast | null>(null);
    const queue = useRef(Promise.resolve());

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

    const changeFavorite = (item: TvShow, selected: boolean) => {
        if (!favorites) {
            return;
        }

        const change = {item, selected};
        setPendingChanges((changes) => [...changes, change]);

        queue.current = queue.current.then(async () => {
            const {id, name} = item.show;

            try {
                await setFavorite(id, selected);
                setToast({
                    kind: selected ? 'added' : 'removed',
                    message: selected ? `Added ${name} to favorites.` : `Removed ${name} from favorites.`,
                });

                const refreshed = await getFavorites(AbortSignal.timeout(10_000)).catch(() => null);
                setFavorites((current) => refreshed ?? (current && applyChange(current, change)));
            } catch {
                setToast({kind: 'error', message: 'Could not update favorites. Please try again.'});
            } finally {
                setPendingChanges((changes) => changes.filter((pending) => pending !== change));
            }
        });
    };

    return {
        favoritesContext: {
            favorites: favorites && pendingChanges.reduce(applyChange, favorites),
            loadFailed,
            reload,
            changeFavorite,
        },
        toast,
    };
};
