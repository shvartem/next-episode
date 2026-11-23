import {useEffect, useMemo, useRef, useState} from 'react';

import type {FavoritesResult} from '~/api';
import type {FavoritesContext, FavoritesTaskResult, FavoriteUpdateCallbacks} from '../types';
import {addFavorite} from './tasks/addFavorite';
import {loadFavorites} from './tasks/loadFavorites';
import {removeFavorite} from './tasks/removeFavorite';

export const useFavoritesState = ({onUpdateStart, onUpdateResult}: FavoriteUpdateCallbacks): FavoritesContext => {
    const [snapshot, setSnapshot] = useState<FavoritesResult | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const initialRequest = useRef<Promise<FavoritesTaskResult> | null>(null);
    const updateInFlight = useRef(false);

    useEffect(() => {
        let active = true;
        const request = initialRequest.current ??= loadFavorites();

        void request.then(([error, initialSnapshot]) => {
            if (!active) return;

            if (error === null) {
                setSnapshot(initialSnapshot);
            } else {
                setLoadError('Could not load favorites. Refresh the page to try again.');
            }
        });

        return () => {
            active = false;
        };
    }, []);

    const items = snapshot?.items;
    const favoriteIds = useMemo(() => new Set(items?.map(({id}) => id)), [items]);

    const toggleFavorite = async (showId: number) => {
        if (!snapshot || updateInFlight.current) return;

        const isFavorite = favoriteIds.has(showId);
        const updateFavorite = isFavorite ? removeFavorite : addFavorite;

        updateInFlight.current = true;
        setIsUpdating(true);
        onUpdateStart();

        const [error, nextSnapshot] = await updateFavorite(showId);

        if (error === null) {
            setSnapshot(nextSnapshot);
            onUpdateResult(isFavorite ? 'removed' : 'added');
        } else {
            onUpdateResult('error');
        }

        updateInFlight.current = false;
        setIsUpdating(false);
    };

    return {snapshot, favoriteIds, loadError, isUpdating, toggleFavorite};
};
