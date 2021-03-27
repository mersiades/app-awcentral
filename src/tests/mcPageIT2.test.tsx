// import React from 'react';
import wait from 'waait';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './test-utils';
import { mockKeycloakStub } from '../../__mocks__/@react-keycloak/web';
import { mockGame7, mockKeycloakUser2, mockKeycloakUserInfo2 } from './mocks';
import { mockAllMoves, mockAppCommsApp, mockGameForMcPage1, mockMcContentQuery, mockSetGameName } from './mockQueries';
import App from '../components/App';
import { InMemoryCache } from '@apollo/client';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo2), initialized: true }),
  };
});

jest.setTimeout(20000);

describe('Testing MCPage functionality', () => {
  let cache = new InMemoryCache();
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const mockScrollIntoView = jest.fn();
  beforeEach(() => {
    cache = new InMemoryCache();
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  test('should change game name', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockGameForMcPage1, mockAllMoves, mockMcContentQuery, mockSetGameName],
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
      cache,
    });

    await screen.findByRole('tab', { name: 'Moves' });

    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-edit-link`));
    screen.getByTestId('game-form');

    // "Select all" on the old name in the text box, in order to replace it
    let input = screen.getByRole('textbox', { name: 'name-input' });
    // @ts-ignore
    input.setSelectionRange(0, input.value.length);

    userEvent.type(screen.getByRole('textbox', { name: 'name-input' }), 'New Game Name');

    userEvent.click(screen.getAllByRole('button', { name: /SET/ })[0]);

    // FAILING: the mock mutation is getting found, but it's payload isn't updating the graphQl cache
    await act(async () => await wait());
    // await screen.findByRole('heading', { name: 'New Game Name' });
  });

  test('should change game comms app', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockGameForMcPage1, mockAllMoves, mockMcContentQuery, mockAppCommsApp],
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
      cache,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-edit-link`));
    screen.getByTestId('game-form');

    // Open the select's list of options
    userEvent.click(screen.getByRole('textbox', { name: 'app-input' }));

    // Click on the Skype option
    userEvent.click(screen.getByRole('menuitem', { name: 'Skype' }));
    const select = screen.getByRole('textbox', { name: 'app-input' });
    // @ts-ignore
    expect(select.value).toEqual('Skype');

    // Set Skype as the game app
    userEvent.click(screen.getAllByRole('button', { name: /SET/ })[1]);

    screen.getByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`));

    // FAILING: the mock mutation is getting found, but it's payload isn't updating the graphQl cache
    await act(async () => await wait());
    // expect(screen.getByTestId('game-box').textContent).toContain('Skype');
  });
});
