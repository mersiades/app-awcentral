import { MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import react from 'react';
import ADJUST_IMPROVEMENTS, { AdjustImprovementsData } from '../../../mutations/adjustImprovements';
import GAME, { GameData } from '../../../queries/game';
import PLAYBOOK_CREATOR, { PlaybookCreatorData } from '../../../queries/playbookCreator';
import {
  mockCoolMax2AsCM,
  mockHardMax2AsCM,
  mockHotMax2AsCM,
  mockSharpMax2AsCM,
  mockWeirdMax2AsCM,
} from '../../../tests/fixtures/characterMovesFixtures';
import { mockCoolMax2 } from '../../../tests/fixtures/movesFixtures';
import { mockGame7, mockPlaybookCreatorAngel } from '../../../tests/mocks';
import { customRenderForComponent, RenderResult, waitOneTick } from '../../../tests/test-utils';
import CharacterImprovementDialog from '../CharacterImprovementDialog';

// With allowedImprovments = 1, no improvementMoves (on gameRole[1]'s character)
const mockGameQuery1: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: () => {
    // console.log('mockGameQuery1');
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
                  allowedImprovements: 1,
                  improvementMoves: [],
                },
              ],
            },
          ],
        },
      },
    };
  },
};

// With allowedImprovments = 2, 1 improvementMove (on gameRole[1]'s character)
const mockGameQuery2: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: () => {
    // console.log('mockGameQuery2');
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
                  allowedImprovements: 2,
                  improvementMoves: [mockCoolMax2AsCM],
                },
              ],
            },
          ],
        },
      },
    };
  },
};

// With allowedImprovments = 6, 5 improvementMove (on gameRole[1]'s character)
const mockGameQuery3: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame7.id },
  },
  result: () => {
    // console.log('mockGameQuery2');
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
                  allowedImprovements: 6,
                  improvementMoves: [
                    mockSharpMax2AsCM,
                    mockCoolMax2AsCM,
                    mockHardMax2AsCM,
                    mockHotMax2AsCM,
                    mockWeirdMax2AsCM,
                  ],
                },
              ],
            },
          ],
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

const mockAdjustImprovementsMutation: MockedResponse<AdjustImprovementsData> = {
  request: {
    query: ADJUST_IMPROVEMENTS,
    variables: {
      gameRoleId: mockGame7.gameRoles[1].id,
      characterId: mockGame7.gameRoles[1].characters[0].id,
      improvementIds: [mockCoolMax2.id],
      futureImprovementIds: [],
    },
  },
  result: () => {
    // console.log('mockAdjustImprovementsMutation');
    return {
      data: {
        adjustImprovements: {
          id: mockGame7.gameRoles[1].characters[0].id,
          name: mockGame7.gameRoles[1].characters[0].name as string,
          playbook: mockGame7.gameRoles[1].characters[0].playbook,
          allowedImprovements: 1,
          allowedOtherPlaybookMoves: mockGame7.gameRoles[1].characters[0].allowedOtherPlaybookMoves,
          characterMoves: mockGame7.gameRoles[1].characters[0].characterMoves.map((cm) => ({
            id: cm.id,
            name: cm.name,
            __typename: 'CharacterMove',
          })),
          improvementMoves: [{ id: 'mock-id', name: mockCoolMax2.name, __typename: 'CharacterMove' }],
          futureImprovementMoves: [],
          __typename: 'Character',
        },
      },
    };
  },
};
describe('Rendering CharacterImprovementDialog', () => {
  let screen: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
  const mockHandleClose = jest.fn();

  describe('with 1 unassigned and 0 assigned improvements', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<CharacterImprovementDialog handleClose={mockHandleClose} />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery1, mockPlaybookCreatorQuery, mockAdjustImprovementsMutation],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await waitOneTick(); // wait for game query
      await waitOneTick(); // wait for playbookCreator query
    });

    test.skip('should render with no pre-selected moves and 1 improvement available', async () => {
      expect(screen.getByRole('heading', { name: 'Improvements' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'You can select 1 improvement' })).toBeInTheDocument();
      const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
      expect(setButton.disabled).toBeTruthy();
      const checkBoxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkBoxes).toHaveLength(16);

      // Check that none of the moves a pre-selected
      checkBoxes.forEach((cb) => expect(cb.checked).toBeFalsy());

      // Check that the 6 futureImprovements are disabled
      expect(checkBoxes.filter((cb) => cb.disabled)).toHaveLength(6);
    });

    test('should allow move selection and click SET button', async () => {
      const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;

      // Check can select item
      const firstMoveCheckbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
      userEvent.click(firstMoveCheckbox);
      expect(firstMoveCheckbox.checked).toBeTruthy();
      expect(setButton.disabled).toBeFalsy();

      // Check can de-select item
      userEvent.click(firstMoveCheckbox);
      expect(firstMoveCheckbox.checked).toBeFalsy();
      expect(setButton.disabled).toBeTruthy();

      // Check can select another item
      const secondMoveCheckbox = screen.getByRole('checkbox', { name: mockCoolMax2.description }) as HTMLInputElement;
      userEvent.click(secondMoveCheckbox);
      expect(secondMoveCheckbox.checked).toBeTruthy();
      expect(setButton.disabled).toBeFalsy();

      // Click SET button
      userEvent.click(setButton);
      await waitOneTick(); // wait for adjustImprovements mutation

      // Check have navigated away
      await waitOneTick(); // wait for navigation
      expect(screen.queryByRole('heading', { name: 'Improvements' })).not.toBeInTheDocument();
    });
  });

  describe('with 1 unassigned and 2 assigned improvements', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<CharacterImprovementDialog handleClose={mockHandleClose} />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery2, mockPlaybookCreatorQuery],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await waitOneTick(); // wait for game query
      await waitOneTick(); // wait for playbookCreator query
    });

    test('should render with 1 pre-selected move and 2 improvements available', async () => {
      expect(screen.getByRole('heading', { name: 'You can select 2 improvements' })).toBeInTheDocument();
      const checkedCheckBox = screen.getByRole('checkbox', { name: mockCoolMax2AsCM.description }) as HTMLInputElement;
      expect(checkedCheckBox.checked).toBeTruthy();
    });
  });

  describe('with 1 unassigned and 5 assigned improvements', () => {
    beforeEach(async () => {
      screen = customRenderForComponent(<CharacterImprovementDialog handleClose={mockHandleClose} />, {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery3, mockPlaybookCreatorQuery],
        injectedGameId: mockGame7.id,
        injectedUserId: mockGame7.gameRoles[1].userId,
      });

      await waitOneTick(); // wait for game query
      await waitOneTick(); // wait for playbookCreator query
    });

    test('should render with 5 pre-selected move and 6 improvements available', async () => {
      expect(screen.getByRole('heading', { name: 'You can select 6 improvements' })).toBeInTheDocument();

      const checkBoxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

      // Check 5 are pre-selected
      expect(checkBoxes.filter((cb) => cb.checked)).toHaveLength(5);

      // Check futureImprovements are now enabled
      expect(checkBoxes.filter((cb) => !cb.disabled)).toHaveLength(16);
    });
  });
});
