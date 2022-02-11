import { MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import {
  NO_PLAYER_TEXT,
  WARNING_DIALOG_TITLE,
} from '../../../config/constants';
import REMOVE_PLAYER, {
  RemovePlayerData,
} from '../../../mutations/removePlayer';
import GAME, { GameData } from '../../../queries/game';
import { mockGame7 } from '../../../tests/mocks';
import {
  act,
  customRenderForComponent,
  RenderResult,
  waitOneTick,
} from '../../../tests/test-utils';

import PlayersBox from '../PlayersBox';

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

const mockRemovePlayerMutation: MockedResponse<RemovePlayerData> = {
  request: {
    query: REMOVE_PLAYER,
    variables: { gameId: mockGame7.id, playerId: mockGame7.players[0].id },
  },
  result: {
    data: {
      removePlayer: {
        id: mockGame7.id,
        players: mockGame7.players
          .filter((player) => player.id !== mockGame7.players[0].id)
          .map((player) => ({ ...player, __typename: 'User' as const })),
        __typename: 'Game',
      },
    },
  },
};

describe('Rendering PlayersBox', () => {
  let screen: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement
  >;
  const originalWarn = console.warn.bind(console.warn);

  beforeAll(() => {
    /*
     Suppressing this warning. It's only occuring in test env because the 'existing' players are actual objects, rather than __refs
     Test env:
       existing: [{"id":"mock-keycloak-id-3","displayName":"mock-user-3"},{"id":"mock-keycloak-id-1","displayName":"mock-user-1"}]
       incoming: [{"__ref":"User:mock-keycloak-id-1"}]
     Browser env:
       existing: ["__ref":"User:mock-keycloak-id-3","__ref":"User:mock-keycloak-id-1"]
       incoming: [{"__ref":"User:mock-keycloak-id-1"}]
     */
    console.warn = (msg: { toString: () => string | string[] }) =>
      !msg
        .toString()
        .includes(
          'Cache data may be lost when replacing the players field of a Game object.'
        ) && originalWarn(msg);
  });

  afterAll(() => {
    console.warn = originalWarn;
  });
  describe('with no players', () => {
    beforeEach(() => {
      screen = customRenderForComponent(<PlayersBox />, {
        isAuthenticated: true,
        apolloMocks: [],
      });
    });

    test('should render PlayersBox with no players', () => {
      screen.getByText(NO_PLAYER_TEXT);
      screen.getByRole('heading', { name: 'Players' });
    });
  });

  describe('with players', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<PlayersBox />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery, mockRemovePlayerMutation],
        injectedGameId: mockGame7.id,
      });

      await act(async () => await wait());
    });

    test('should render with two players', async () => {
      screen.getByText(mockGame7.players[0].displayName);
      screen.getByTestId(`${mockGame7.players[0].displayName}-remove-button`);
      screen.getByText(mockGame7.players[1].displayName);
      screen.getByTestId(`${mockGame7.players[1].displayName}-remove-button`);
    });

    test('should open and close remove player dialog', () => {
      jest.useFakeTimers();
      const removeButton = screen.getByTestId(
        `${mockGame7.players[0].displayName}-remove-button`
      );
      userEvent.click(removeButton);
      screen.getByRole('heading', { name: WARNING_DIALOG_TITLE });
      // screen.getByText(WARNING_DIALOG_TITLE);

      // Close with CANCEL button
      const cancelButton = screen.getByRole('button', { name: 'CANCEL' });
      userEvent.click(cancelButton);
      jest.runAllTimers(); // To allow Layer exit animation
      expect(
        screen.queryByRole('heading', { name: WARNING_DIALOG_TITLE })
      ).not.toBeInTheDocument();

      userEvent.click(removeButton);
      screen.getByText(WARNING_DIALOG_TITLE);

      // Close by clicking outside of dialog
      userEvent.click(screen.container);
      jest.runAllTimers(); // To allow Layer exit animation
      expect(
        screen.queryByRole('heading', { name: WARNING_DIALOG_TITLE })
      ).not.toBeInTheDocument();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test('should remove player', async () => {
      const removeButton = screen.getByTestId(
        `${mockGame7.players[0].displayName}-remove-button`
      );
      userEvent.click(removeButton);

      const confirmButton = screen.getByRole('button', { name: 'REMOVE' });
      userEvent.click(confirmButton);
      await waitOneTick();
      expect(
        screen.queryByText(mockGame7.players[0].displayName)
      ).not.toBeInTheDocument();
    });
  });
});
