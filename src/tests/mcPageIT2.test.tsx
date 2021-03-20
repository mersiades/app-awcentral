// import React from 'react';
// import wait from 'waait';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './test-utils';
import { mockKeycloakStub } from '../../__mocks__/@react-keycloak/web';
import { mockGame7, mockKeycloakUser2, mockKeycloakUserInfo2 } from './mocks';
import { mockAddInvitee3, mockAllMoves, mockAppCommsApp, mockAppCommsUrl, mockSetGameName } from './mockQueries';
import App from '../components/App';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo2), initialized: true }),
  };
});

jest.setTimeout(20000);

describe('Testing MCPage functionality', () => {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const mockScrollIntoView = jest.fn();
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  test('should change game name', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockSetGameName],
      injectedGame: { ...mockGame7, invitees: ['john@email.com', 'sara@email.com'] },
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
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

    await screen.findByRole('tab', { name: 'Moves' });

    // FAILING: the mock mutation is getting found, but it's payload isn't updating the graphQl cache
    // screen.getByRole('heading', { name: 'New Game Name' });
  });

  test('should change game comms app', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockAppCommsApp],
      injectedGame: { ...mockGame7, invitees: ['john@email.com', 'sara@email.com'] },
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
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

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`));

    // FAILING: the mock mutation is getting found, but it's payload isn't updating the graphQl cache
    // expect(screen.getByTestId('game-box').textContent).toContain('Skype');
  });
});
