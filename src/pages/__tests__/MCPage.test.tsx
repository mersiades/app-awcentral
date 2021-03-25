import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MCPage from '../MCPage';
import { customRenderForComponent } from '../../tests/test-utils';
import { mockGame7, mockKeycloakUserInfo1 } from '../../tests/mocks';
import { mockAllMoves } from '../../tests/mockQueries';
import { RoleType } from '../../@types/enums';

describe('Rendering MCPage', () => {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const mockScrollIntoView = jest.fn();
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
    customRenderForComponent(<MCPage />, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves],
      injectedGame: mockGame7,
      injectedUserId: mockKeycloakUserInfo1.sub,
    });
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  test('should render initial MCPage with GamePanel open', async () => {
    // Check that inital parts have been rendered
    screen.getByRole('banner');
    screen.getByRole('button', { name: 'Open Menu' });
    mockGame7.gameRoles.forEach((gameRole) => {
      if (gameRole.role === RoleType.player) {
        screen.getByRole('button', { name: gameRole.characters[0].name });
      }
    });
    screen.getByRole('button', { name: 'Threat map' });
    screen.getByRole('button', { name: 'Pre-game' });
    screen.getByRole('tab', { name: 'Game' });
    screen.getByRole('tab', { name: 'MC' });
    screen.getByRole('tab', { name: 'Threats' });
    screen.getByRole('tab', { name: 'NPCs' });
    screen.getByRole('tabpanel', { name: 'Game Tab Contents' });
    await screen.findByRole('tab', { name: 'Moves' });
  });

  test('should open each tab', async () => {
    screen.getByRole('tabpanel', { name: 'Game Tab Contents' });
    const movesTab = await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(movesTab);
    screen.getByRole('tabpanel', { name: 'Moves Tab Contents' });

    userEvent.click(screen.getByRole('tab', { name: 'MC' }));
    screen.getByRole('tabpanel', { name: 'MC Tab Contents' });

    userEvent.click(screen.getByRole('tab', { name: 'Threats' }));
    screen.getByRole('tabpanel', { name: 'MC Tab Contents' });
    screen.getByRole('tabpanel', { name: 'Threats Tab Contents' });

    userEvent.click(screen.getByRole('tab', { name: 'NPCs' }));
    screen.getByRole('tabpanel', { name: 'MC Tab Contents' });
    screen.getByRole('tabpanel', { name: 'NPCs Tab Contents' });
  });

  test('should open delete-game dialog', async () => {
    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`));
    userEvent.click(screen.getByRole('button', { name: /DELETE GAME/ }));
    screen.getByTestId('delete game?-warning-dialog');
  });

  test('should open and close GameForm', async () => {
    await screen.findByRole('tab', { name: 'Moves' });
    userEvent.click(screen.getByTestId(`${mockGame7.name.toLowerCase()}-edit-link`));
    screen.getByTestId('game-form');
    userEvent.click(screen.getByTestId('close-icon-button'));
  });

  test('should open and close InvitationForm using INVITE PLAYER button', async () => {
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
      injectedGame: { ...mockGame7, invitees: ['john@email.com'] },
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
