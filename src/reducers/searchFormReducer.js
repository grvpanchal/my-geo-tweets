import { UPDATE_SEARCH_FORM } from '../actions/types';

export const initialState = {
  location: {
    lat: 45.51,
    lng: -122.67,
  },
  query: '',
};

export default function searchFormReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SEARCH_FORM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
