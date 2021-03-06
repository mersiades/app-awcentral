import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PlayerPage from '../PlayerPage';
import { customRenderForComponent, waitOneTick } from '../../tests/test-utils';
import { mockKeycloakStub } from '../../../__mocks__/@react-keycloak/web';
import { mockGame7, mockKeycloakUserInfo1 } from '../../tests/mocks';
import { mockAllMoves, mockPlaybook } from '../../tests/mockQueries';
import { MockedResponse } from '@apollo/client/testing';
import GAME, { GameData } from '../../queries/game';
import { CANCEL_TEXT, SCRIPT_CHANGE_TITLE } from '../../config/constants';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({
      keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1),
      initialized: true,
    }),
  };
});

const mockGameQuery: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: {
    data: {
      game: { ...mockGame7, hasFinishedPreGame: true, showFirstSession: false },
    },
  },
};

describe('Rendering PlayerPage', () => {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const mockScrollIntoView = jest.fn();
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  test('should render PlayerPage with PlaybookPanel and MovesPanel', async () => {
    customRenderForComponent(<PlayerPage />, {
      isAuthenticated: true,
      apolloMocks: [mockAllMoves, mockPlaybook],
      injectedGame: {
        ...mockGame7,
        hasFinishedPreGame: true,
        showFirstSession: false,
      },
      injectedUserId: mockKeycloakUserInfo1.sub,
    });
    await waitOneTick();

    // Check base roles are rendered
    screen.getByTestId('player-page');
    screen.getByRole('button', { name: 'Open Menu' });
    screen.getByRole('tablist');
    screen.getByRole('banner');
    screen.getByRole('tabpanel', { name: 'Tab Contents' });
    const playbookTab = screen.getByRole('tab', { name: 'Playbook' });
    const movesTab = screen.getByRole('tab', { name: 'Moves' });

    // Check that PlaybookPanel opens
    userEvent.click(playbookTab);
    screen.getByTestId('character-sheet');
    screen.getByRole('tabpanel', { name: 'Playbook Tab Contents' });

    // Check that MovesPanel opens
    userEvent.click(movesTab);
    screen.getByTestId('moves-panel');
    screen.getByRole('tabpanel', { name: 'Moves Tab Contents' });
  });

  test('should open and close ScriptChangeDialog', async () => {
    const screen = customRenderForComponent(<PlayerPage />, {
      isAuthenticated: true,
      apolloMocks: [mockGameQuery, mockAllMoves, mockPlaybook],
      injectedGameId: mockGame7.id,
    });

    await waitOneTick();
    const scriptChangeIcon = screen.getByRole('img', {
      name: 'script-change-button',
    });
    userEvent.click(scriptChangeIcon);
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_TITLE })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: CANCEL_TEXT }));
    expect(
      screen.queryByRole('heading', { name: SCRIPT_CHANGE_TITLE })
    ).not.toBeInTheDocument();
  });
});
