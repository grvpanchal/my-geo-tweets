import config from '../config';

export const initialState = {
  title: config.siteTitle,
};

export default function headerReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
