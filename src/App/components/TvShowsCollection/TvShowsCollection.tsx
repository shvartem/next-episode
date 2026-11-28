import type {Props} from './types';
import {useTvShowsCollection} from './logic/useTvShowsCollection';
import {TvShowsList} from './TvShowsList/TvShowsList';

export const TvShowsCollection = (props: Props) => {
    const {className, list, renderCard, controls, emptyState, pagination} = props;
    const {hasItems} = useTvShowsCollection(props);

    return (
        <div className={className}>
            {controls}

            {hasItems ? (
                <>
                    <TvShowsList list={list} renderCard={renderCard} />
                    {pagination}
                </>
            ) : emptyState}
        </div>
    );
};
