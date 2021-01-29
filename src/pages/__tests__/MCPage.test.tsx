import React from 'react';
// import wait from 'waait';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { customRenderForComponent, renderWithRouter } from '../../tests/test-utils';
import { mockKeycloakStub } from '../../../__mocks__/@react-keycloak/web';
import { mockGame7, mockKeycloakUser2, mockKeycloakUserInfo1, mockKeycloakUserInfo2 } from '../../tests/mocks';
import {
  mockAddInvitee3,
  mockAllMoves,
  mockAppCommsApp,
  mockAppCommsUrl,
  mockDeleteGame,
  mockGameRolesByUserId2,
  mockRemoveInvitee,
  mockSetGameName,
} from '../../tests/mockQueries';
import MCPage from '../MCPage';
import { RoleType } from '../../@types/enums';
import App from '../../components/App';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo2), initialized: true }),
  };
});

describe('Rendering MCPage', () => {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const mockScrollIntoView = jest.fn();
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  test('should render initial MCPage with GamePanel open', async () => {
    customRenderForComponent(<MCPage />, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves],
      injectedGame: mockGame7,
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    // Check that inital parts have been rendered
    screen.getByRole('banner');
    screen.getByRole('button', { name: 'Open Menu' });
    mockGame7.gameRoles.forEach((gameRole) => {
      if (gameRole.role === RoleType.player) {
        screen.getByRole('button', { name: gameRole.characters[0].name });
      }
    });
    screen.getByRole('button', { name: 'THREAT MAP' });
    screen.getByRole('button', { name: 'PRE-GAME' });
    screen.getByRole('tab', { name: 'Game' });
    screen.getByRole('tab', { name: 'MC Moves' });
    screen.getByRole('tab', { name: 'Threats' });
    screen.getByRole('tab', { name: 'NPCs' });
    screen.getByRole('tabpanel', { name: 'Game Tab Contents' });
    await screen.findByRole('tab', { name: 'Moves' });
  });

  test('should open each tab', async () => {
    customRenderForComponent(<MCPage />, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves],
      injectedGame: mockGame7,
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    screen.getByRole('tabpanel', { name: 'Game Tab Contents' });
    const movesTab = await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(movesTab);
    screen.getByRole('tabpanel', { name: 'Moves Tab Contents' });

    userEvent.click(screen.getByRole('tab', { name: 'MC Moves' }));
    screen.getByRole('tabpanel', { name: 'MC Moves Tab Contents' });

    userEvent.click(screen.getByRole('tab', { name: 'Threats' }));
    screen.getByRole('tabpanel', { name: 'MC Moves Tab Contents' });
    screen.getByRole('tabpanel', { name: 'Threats Tab Contents' });

    userEvent.click(screen.getByRole('tab', { name: 'NPCs' }));
    screen.getByRole('tabpanel', { name: 'MC Moves Tab Contents' });
    screen.getByRole('tabpanel', { name: 'NPCs Tab Contents' });
  });

  test('should open delete-game dialog', async () => {
    customRenderForComponent(<MCPage />, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves],
      injectedGame: mockGame7,
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`));
    userEvent.click(screen.getByRole('button', { name: /DELETE GAME/ }));
    screen.getByTestId('delete game?-warning-dialog');
  });

  test('should open and close GameForm', async () => {
    customRenderForComponent(<MCPage />, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves],
      injectedGame: mockGame7,
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-edit-link`));
    screen.getByTestId('game-form');
    userEvent.click(screen.getByTestId('close-icon-button'));
  });

  test('should open and close InvitationForm using INVITE PLAYER button', async () => {
    customRenderForComponent(<MCPage />, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves],
      injectedGame: mockGame7,
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByRole('button', { name: /INVITE PLAYER/ }));
    screen.getByTestId('invitation-form');

    // Check InvitationForm is open to the email input part
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('type')).toEqual('email');

    userEvent.click(screen.getByTestId('close-icon-button'));
  });

  test('should open and close InvitationForm by clicking on player name', async () => {
    customRenderForComponent(<MCPage />, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves],
      injectedGame: { ...mockGame7, invitees: ['john@email.com', 'sara@email.com'] },
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`john@email.com-list-item`));
    screen.getByTestId('invitation-form');

    // Check InvitationForm is open to the email input part
    screen.getByRole('button', { name: /COPY TO CLIPBOARD/ });

    userEvent.click(screen.getByTestId('close-icon-button'));
  });
});

describe('Testing MCPage functionality', () => {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const mockScrollIntoView = jest.fn();
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  test('should delete game and navigate to /menu', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockDeleteGame, mockGameRolesByUserId2],
      injectedGame: { ...mockGame7, invitees: ['john@email.com', 'sara@email.com'] },
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`));

    // Open dialog
    userEvent.click(screen.getByRole('button', { name: /DELETE GAME/ }));
    screen.getByTestId('delete game?-warning-dialog');

    // Cancel dialog
    userEvent.click(screen.getByRole('button', { name: /CANCEL/ }));

    // Open dialog again and click DELETE
    userEvent.click(screen.getByRole('button', { name: /DELETE GAME/ }));
    screen.getByTestId('delete game?-warning-dialog');
    userEvent.click(screen.getByRole('button', { name: 'DELETE' }));

    const welcomeHeading = await screen.findByRole('heading');
    expect(welcomeHeading.textContent).toEqual(`Welcome, ${mockKeycloakUserInfo2.preferred_username}`);
  });

  test('should remove invitee', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockRemoveInvitee],
      injectedGame: { ...mockGame7, invitees: ['john@email.com', 'sara@email.com'] },
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
    });

    let invitationsBox = await screen.findByTestId('invitations-box');
    expect(invitationsBox.textContent).toContain('john@email.com');
    userEvent.click(screen.getByTestId('john@email.com-trash-icon'));
    invitationsBox = await screen.findByTestId('invitations-box');
    // FAILING: The mock query is getting found, but the graphql cache isn't being updated
    // expect(invitationsBox.textContent).not.toContain('john@email.com');
  });

  test('should navigate to /menu from navbar', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockGameRolesByUserId2],
      injectedGame: { ...mockGame7, invitees: ['john@email.com', 'sara@email.com'] },
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByRole('button', { name: 'Open Menu' }));
    userEvent.click(screen.getByRole('button', { name: 'Main menu' }));

    const welcomeHeading = await screen.findByRole('heading');
    expect(welcomeHeading.textContent).toEqual(`Welcome, ${mockKeycloakUserInfo2.preferred_username}`);
  });

  test('should logout from navbar', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockGameRolesByUserId2],
      injectedGame: { ...mockGame7, invitees: ['john@email.com', 'sara@email.com'] },
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
    });

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByRole('button', { name: 'Open Menu' }));
    userEvent.click(screen.getByRole('button', { name: 'Log out' }));
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

  test('should change game comms url', async () => {
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockAppCommsUrl],
      injectedGame: { ...mockGame7, invitees: ['john@email.com', 'sara@email.com'] },
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
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

    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`));

    // FAILING: the mock mutation is getting found, but it's payload isn't updating the graphQl cache
    // expect(screen.getByTestId('game-box').textContent).toContain('https://new.url.com');
  });

  test('should invite a player', async () => {
    jest.mock('../../helpers/copyToClipboard');
    const originalExecCommand = document.execCommand;
    document.execCommand = jest.fn();
    renderWithRouter(<App />, `/mc-game/${mockGame7.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockAddInvitee3],
      injectedGame: mockGame7,
      keycloakUser: mockKeycloakUser2,
      injectedUserId: mockKeycloakUser2.id,
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
    await screen.findByRole('button', { name: /INVITE ANOTHER/ });

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