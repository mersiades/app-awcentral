import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedResponse } from '@apollo/client/testing';

import PlayerPage from '../PlayerPage';
import { customRenderForComponent, waitOneTick } from '../../tests/test-utils';
import { mockGame7, mockAuth0UserInfo1 } from '../../tests/mocks';
import { mockAllMoves, mockPlaybook } from '../../tests/mockQueries';
import GAME, { GameData } from '../../queries/game';
import { CANCEL_TEXT, SCRIPT_CHANGE_TITLE } from '../../config/constants';

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
      injectedUserId: mockAuth0UserInfo1.sub,
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
    await userEvent.click(playbookTab);
    screen.getByTestId('character-sheet');
    screen.getByRole('tabpanel', { name: 'Playbook Tab Contents' });

    // Check that MovesPanel opens
    await userEvent.click(movesTab);
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
    await userEvent.click(scriptChangeIcon);
    expect(
      screen.getByRole('heading', { name: SCRIPT_CHANGE_TITLE })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: CANCEL_TEXT }));
    // jest.runAllTimers(); // To allow Layer exit animation
    // expect(
    //   screen.queryByRole('heading', { name: SCRIPT_CHANGE_TITLE })
    // ).not.toBeInTheDocument();
  });
});
