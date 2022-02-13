import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import { renderWithRouter } from '../../tests/test-utils';

describe('Rendering App', () => {
  test('should render App and AppRouter without error', async () => {
    renderWithRouter(<App />, '/menu', { isAuthenticated: true });

    const MenuPageBox = await screen.findByTestId('landing-page-layout');
    expect(MenuPageBox).toBeInTheDocument();
  });
});
