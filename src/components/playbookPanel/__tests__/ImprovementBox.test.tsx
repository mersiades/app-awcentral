import { MockedResponse } from '@apollo/client/testing';
import wait from 'waait';
import GAME, { GameData } from '../../../queries/game';
import { mockGame7 } from '../../../tests/mocks';
import { act, customRenderForComponent, RenderResult } from '../../../tests/test-utils';
import ImprovementBox from '../ImprovementBox';

// With experience = 0 (on gameRole[1]'s character)
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

// With experience = 3 (on gameRole[1]'s character)
const mockGameQuery2: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: {
    data: {
      game: {
        ...mockGame7,
        gameRoles: [
          {
            ...mockGame7.gameRoles[1],
            characters: [
              {
                ...mockGame7.gameRoles[1].characters[0],
                experience: 3,
              },
            ],
          },
        ],
      },
    },
  },
};

// With experience = 8 (on gameRole[1]'s character)
const mockGameQuery3: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: {
    data: {
      game: {
        ...mockGame7,
        gameRoles: [
          {
            ...mockGame7.gameRoles[1],
            characters: [
              {
                ...mockGame7.gameRoles[1].characters[0],
                experience: 8,
              },
            ],
          },
        ],
      },
    },
  },
};

describe('Rendering ImprovementBox', () => {
  let screen: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  describe('when experience is 0', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<ImprovementBox />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await act(async () => await wait());
    });

    test('should render 5 empty circles', () => {
      expect(screen.getByRole('heading', { name: 'Improvement' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
      const improveButton = screen.getByRole('button', { name: 'IMPROVE' }) as HTMLButtonElement;
      expect(improveButton.disabled).toBeTruthy();
      expect(screen.getAllByTestId('unfilled-circle')).toHaveLength(5);
    });
  });

  describe('when experience is 3', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<ImprovementBox />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery2],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await act(async () => await wait());
    });

    test('should render 3 filled circles, 2 empty circles', () => {
      const improveButton = screen.getByRole('button', { name: 'IMPROVE' }) as HTMLButtonElement;
      expect(improveButton.disabled).toBeTruthy();
      expect(screen.getAllByTestId('filled-circle')).toHaveLength(3);
      expect(screen.getAllByTestId('unfilled-circle')).toHaveLength(2);
    });
  });

  describe('when experience is 8', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<ImprovementBox />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery3],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await act(async () => await wait());
    });

    test('should render 5 filled circles and overflow pill', () => {
      const improveButton = screen.getByRole('button', { name: 'IMPROVE' }) as HTMLButtonElement;
      expect(improveButton.disabled).toBeFalsy();
      expect(screen.getAllByTestId('filled-circle')).toHaveLength(5);
      expect(screen.queryAllByTestId('unfilled-circle')).toHaveLength(0);
      expect(screen.getByText('+ 3')).toBeInTheDocument(); // Overflow pill with value of 3
    });
  });
});
