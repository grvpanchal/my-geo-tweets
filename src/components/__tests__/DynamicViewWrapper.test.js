import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import DynamicViewWrapper from '../DynamicViewWrapper';
import TestProvider from '../../utils/TestProvider';

describe('<DynamicViewWrapper />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <DynamicViewWrapper isLoading={false}>
          <div>Some Text</div>
        </DynamicViewWrapper>
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
  it('Renders successfully with error', async () => {
    const { getByText } = render(
      <TestProvider>
        <DynamicViewWrapper isLoading={false} error="Unable to Fetch">
          <div>Some Text</div>
        </DynamicViewWrapper>
      </TestProvider>,
    );
    const noResults = await waitForElement(() => getByText('Unable to Fetch'));
    expect(noResults).toBeTruthy();
  });
  it('Renders successfully with loading', async () => {
    const { getByText } = render(
      <TestProvider>
        <DynamicViewWrapper isLoading>
          <div>Some Text</div>
        </DynamicViewWrapper>
      </TestProvider>,
    );
    const loading = await waitForElement(() => getByText('Loading...'));
    expect(loading).toBeTruthy();
  });
});
