import React from 'react';
import { render } from '@testing-library/react';
import PostsContainer from '../UserContainer';
import TestProvider from '../../utils/TestProvider';

describe('<UserContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <PostsContainer />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
});
