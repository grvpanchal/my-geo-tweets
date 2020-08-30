import { UPDATE_SEARCH_FORM, CLEAR_SEARCH_FORM } from './types';

export const updateSearchForm = (payload) => ({ type: UPDATE_SEARCH_FORM, payload });
export const clearSearchForm = () => ({ type: CLEAR_SEARCH_FORM });
