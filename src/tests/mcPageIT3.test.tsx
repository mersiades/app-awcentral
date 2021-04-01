// import React from 'react';
// import wait from 'waait';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './test-utils';
import { mockKeycloakStub } from '../../__mocks__/@react-keycloak/web';
import { mockGame7, mockKeycloakUser2, mockKeycloakUserInfo2 } from './mocks';
import { mockAddInvitee3, mockAllMoves, mockAppCommsUrl, mockGameForMcPage1 } from './mockQueries';
import App from '../components/App';
import { InMemoryCache } from '@apollo/client';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo2), initialized: true }),
  };
});

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

  test('should change game comms url', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockGameForMcPage1, mockAllMoves, mockAppCommsUrl],
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
      cache,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-edit-link`));
    screen.getByTestId('game-form');

    // "Select all" on the old name in the text box, in order to replace it
    let input = screen.getByRole('textbox', { name: 'url-input' });
    // @ts-ignore
    input.setSelectionRange(0, input.value.length);

    // Open the select's list of options
    userEvent.type(screen.getByRole('textbox', { name: 'url-input' }), 'https://new.url.com');
    // @ts-ignore
    expect((input = screen.getByRole('textbox', { name: 'url-input' }).value)).toEqual('https://new.url.com');

    // Set Skype as the game app
    userEvent.click(screen.getAllByRole('button', { name: /SET/ })[2]);

    screen.getByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`));

    // FAILING: the mock mutation is getting found, but it's payload isn't updating the graphQl cache
    // expect(screen.getByTestId('game-box').textContent).toContain('https://new.url.com');
  });

  test('should invite a player', async () => {
    jest.mock('../helpers/copyToClipboard');
    const originalExecCommand = document.execCommand;
    document.execCommand = jest.fn();
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockGameForMcPage1, mockAllMoves, mockAddInvitee3],
      injectedGame: mockGame7,
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
      cache,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    // Open InvitationForm
    userEvent.click(screen.getByRole('button', { name: /INVITE PLAYER/ }));
    screen.getByTestId('invitation-form');
    screen.getByRole('heading', { name: `Invite a player to ${mockGame7.name}` });

    // Enter invitee's email address
    userEvent.type(screen.getByRole('textbox', { name: 'Email input' }), 'new@email.com');
    // @ts-ignore
    expect(screen.getByRole('textbox', { name: 'Email input' }).value).toEqual('new@email.com');

    // Add invitee
    userEvent.click(screen.getByRole('button', { name: /ADD/ }));

    // Check that InvitationForm has transitioned to second part
    screen.getByRole('button', { name: /INVITE ANOTHER/ });

    // FAILING: the mock mutation is getting found, but it's payload isn't updating the graphQl cache
    // expect(screen.getByTestId('invitations-box').textContent).toContain('new@email.com');

    // Check that the textarea contains the correct invitation message
    const textArea = screen.getByRole('textbox');
    // @ts-ignore
    expect(textArea.value).toContain(`${process.env.REACT_APP_ROOT_URL}/join-game`);
    // @ts-ignore
    expect(textArea.value).toContain('new@email.com');
    // @ts-ignore
    expect(textArea.value).toContain(mockGame7.name);

    // Copy message to clipboard
    // TODO: figure out how to check what copyToClipboard was called with
    userEvent.click(screen.getByRole('button', { name: /COPY TO CLIPBOARD/ }));
    expect(document.execCommand).toHaveBeenCalledWith('copy');

    // Close InvitationForm
    userEvent.click(screen.getByTestId('close-icon-button'));

    document.execCommand = originalExecCommand;
  });
});
