import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import TestProvider from '../utils/TestProvider';

describe('<App />', () => {
  it('Renders successfully without error', () => {
    const app = render(
      <TestProvider>
        <App />
      </TestProvider>,
    );
    expect(app.container).toBeTruthy();
  });
});
