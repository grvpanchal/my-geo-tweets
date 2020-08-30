import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';
import TestProvider from '../../utils/TestProvider';

describe('<Header />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <Header itemsList={[]} title="My Blog" />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
});
