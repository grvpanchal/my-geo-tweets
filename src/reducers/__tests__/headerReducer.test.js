import headerReducer, { initialState } from '../headerReducer';

describe('Header Reducer', () => {
  it('Should handle an initial state', () => {
    expect(headerReducer()).toEqual(initialState);
  });
});
