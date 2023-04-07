import { MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import SPEND_EXPERIENCE, {
  SpendExperienceData,
} from '../../../mutations/spendExperience';
import GAME, { GameData } from '../../../queries/game';
import PLAYBOOK_CREATOR, {
  PlaybookCreatorData,
} from '../../../queries/playbookCreator';
import {
  mockCoolMax2AsCM,
  mockSharpMax2AsCM,
} from '../../../tests/fixtures/characterMovesFixtures';
import { mockGame7, mockPlaybookCreatorAngel } from '../../../tests/mocks';
import {
  customRenderForComponent,
  RenderResult,
  waitOneTick,
} from '../../../tests/test-utils';
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
  result: () => {
    // console.log('mockGameQuery3');
    return {
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
    };
  },
};

// With 2 improvement moves on Character
const mockGameQuery4: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: () => {
    // console.log('mockGameQuery3');
    return {
      data: {
        game: {
          ...mockGame7,
          gameRoles: [
            {
              ...mockGame7.gameRoles[1],
              characters: [
                {
                  ...mockGame7.gameRoles[1].characters[0],
                  improvementMoves: [mockSharpMax2AsCM, mockCoolMax2AsCM],
                },
              ],
            },
          ],
        },
      },
    };
  },
};

const mockSendExperienceMutation: MockedResponse<SpendExperienceData> = {
  request: {
    query: SPEND_EXPERIENCE,
    variables: {
      gameRoleId: mockGame7.gameRoles[1].id,
      characterId: mockGame7.gameRoles[1].characters[0].id,
    },
  },
  result: () => {
    // console.log('mockSendExperienceMutation');
    return {
      data: {
        spendExperience: {
          id: mockGame7.gameRoles[1].characters[0].id,
          name: mockGame7.gameRoles[1].characters[0].name as string,
          playbook: mockGame7.gameRoles[1].characters[0].playbook,
          experience: 3,
          allowedImprovements: 1,
          allowedPlaybookMoves:
            mockGame7.gameRoles[1].characters[0].allowedPlaybookMoves,
          allowedOtherPlaybookMoves:
            mockGame7.gameRoles[1].characters[0].allowedOtherPlaybookMoves,
          __typename: 'Character',
        },
      },
    };
  },
};

const mockPlaybookCreatorQuery: MockedResponse<PlaybookCreatorData> = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: mockGame7.gameRoles[1].characters[0].playbook },
  },
  result: () => {
    // console.log('mockPlaybookCreatorQuery');
    return {
      data: {
        playbookCreator: mockPlaybookCreatorAngel,
      },
    };
  },
};

describe('Rendering ImprovementBox', () => {
  let screen: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement
  >;
  describe('when experience is 0', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<ImprovementBox />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await waitOneTick();
    });

    test('should render 5 empty circles', () => {
      expect(
        screen.getByRole('heading', { name: 'Improvement' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Experience' })
      ).toBeInTheDocument();
      const improveButton = screen.getByRole('button', {
        name: 'IMPROVE',
      }) as HTMLButtonElement;
      expect(improveButton.disabled).toBeTruthy();
      expect(screen.getAllByTestId('unfilled-circle')).toHaveLength(5);

      // Check no improvement moves are being listed
      expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
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

      await waitOneTick();
    });

    test('should render 3 filled circles, 2 empty circles', () => {
      const improveButton = screen.getByRole('button', {
        name: 'IMPROVE',
      }) as HTMLButtonElement;
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

      await waitOneTick();
    });

    test('should render 5 filled circles and overflow pill', () => {
      const improveButton = screen.getByRole('button', {
        name: 'IMPROVE',
      }) as HTMLButtonElement;
      expect(improveButton.disabled).toBeFalsy();
      expect(screen.getAllByTestId('filled-circle')).toHaveLength(5);
      expect(screen.queryAllByTestId('unfilled-circle')).toHaveLength(0);
      expect(screen.getByText('+ 3')).toBeInTheDocument(); // Overflow pill with value of 3
    });
  });

  describe('when clicking IMPROVE button with experience at 8', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<ImprovementBox />, {
        isAuthenticated: true,
        apolloMocks: [
          mockGameQuery3,
          mockSendExperienceMutation,
          mockPlaybookCreatorQuery,
        ],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await waitOneTick();
    });

    test.skip('should show experience reduced by 5 and open CharacterImprovementDialog', async () => {
      const improveButton = screen.getByRole('button', {
        name: 'IMPROVE',
      }) as HTMLButtonElement;
      await userEvent.click(improveButton);
      await waitOneTick(); // wait for spendExperience mutation
      // Check button still enabled because there is now an unspent improvement point
      expect(improveButton.disabled).toBeFalsy();

      // Check rendered experience is now 3
      expect(screen.getAllByTestId('filled-circle')).toHaveLength(3);

      await waitOneTick(); // wait for playbookCreator query

      // Check dialog is open
      expect(
        screen.getByRole('heading', { name: 'Improvements' })
      ).toBeInTheDocument();
    });
  });

  describe('when character has two improvement moves', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<ImprovementBox />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery4],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await waitOneTick();
    });
    test('should list two improvement moves', () => {
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    });
  });
});
