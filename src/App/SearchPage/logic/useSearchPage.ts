import type {SearchQuery} from '~/api';
import {updateFavoriteWithToast} from '../../handlers/updateFavoriteWithToast';
import {useSearchPageParams} from './useSearchPageParams';
import {useShouldLoadSearchLocation} from './useShouldLoadSearchLocation';
import {useShowSearch} from './useShowSearch';

export const useSearchPage = () => {
    const {search, genre, page, updateParams} = useSearchPageParams();
    const shouldLoadLocation = useShouldLoadSearchLocation();
    const {runSearch, error, isLoading, result} = useShowSearch({q: search.trim(), genre, page}, shouldLoadLocation);

    const updateSearch = (params: SearchQuery, replace = false) => {
        updateParams(params, replace);

        return runSearch({...params, q: params.q.trim()});
    };

    return {
        search,
        error,
        isLoading,
        result,
        hasMatches: (result?.totalCount ?? 0) > 0,
        onFavoriteClick: updateFavoriteWithToast,
        selectedGenre: genre,
        searchHint: 'Results update automatically.',
        handleSearch: (value: string) => updateSearch({q: value, genre: null, page: 1}, true),
        handleGenreChange: (value: string | null) => updateSearch({q: search, genre: value, page: 1}),
        handlePageChange: (value: number) => updateSearch({q: search, genre, page: value}),
    };
};
