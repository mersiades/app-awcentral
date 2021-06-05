import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import { renderWithRouter } from '../../tests/test-utils';
import { mockKeycloakStub } from '../../../__mocks__/@react-keycloak/web';
import { mockKeycloakUserInfo1 } from '../../tests/mocks';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

describe('Rendering App', () => {
  test('should render App and AppRouter without error', async () => {
    renderWithRouter(<App />, '/menu', { isAuthenticated: true });

    const MenuPageBox = await screen.findByTestId('landing-page-layout');
    expect(MenuPageBox).toBeInTheDocument();
  });
});
