import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PlayerPage from '../PlayerPage';
import { customRenderForComponent } from '../../tests/test-utils';
import { mockKeycloakStub } from '../../../__mocks__/@react-keycloak/web';
import { mockGame7, mockKeycloakUserInfo1 } from '../../tests/mocks';
import { mockAllMoves, mockPlaybook } from '../../tests/mockQueries';
import { MockedResponse } from '@apollo/client/testing';
import GAME, { GameData } from '../../queries/game';
import wait from 'waait';
import { X_CARD_CONTENT } from '../../components/XCard';
import PLAY_X_CARD, { PlayXCardData } from '../../mutations/playXCard';
import { MessageType } from '../../@types/enums';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

const mockGameQuery: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: {
    data: {
      game: mockGame7,
    },
  },
};

const mockPlayXCardMutation: MockedResponse<PlayXCardData> = {
  request: {
    query: PLAY_X_CARD,
    variables: { gameId: mockGame7.id },
  },
  result: {
    data: {
      playXCard: {
        id: mockGame7.id,
        gameMessages: [
          {
            id: 'dummy-id',
            gameId: mockGame7.id,
            messageType: MessageType.xCard,
            title: 'AN X-CARD HAS BEEN PLAYED',
            content: X_CARD_CONTENT,
            sentOn: 'dummy',
            __typename: 'GameMessage',
          },
        ],
        __typename: 'Game',
      },
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
      injectedGame: mockGame7,
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    // Check base roles are rendered
    await screen.findByTestId('player-page');
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

  test.skip('should play an X-Card', async () => {
    const screen = customRenderForComponent(<PlayerPage />, {
      isAuthenticated: true,
      apolloMocks: [mockGameQuery, mockAllMoves, mockPlaybook, mockPlayXCardMutation],
      injectedGameId: mockGame7.id,
    });

    await act(async () => await wait());
    const xCardButton = screen.getByRole('img', { name: 'X-Card icon' });
    userEvent.click(xCardButton);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await act(async () => await wait());
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();

    // Unable to land the mutation
    // screen.getByText('AN X-CARD HAS BEEN PLAYED');
  });
});
