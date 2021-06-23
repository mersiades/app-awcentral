import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import CharacterMovesForm from '../CharacterMovesForm';
import { mockKeycloakStub } from '../../../../__mocks__/@react-keycloak/web';
import {
  blankCharacter,
  mockCharacter2,
  mockGame5,
  mockKeycloakUserInfo1,
  mockPlaybookCreatorAngel,
} from '../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../tests/test-utils';
import { mockPlaybookCreator } from '../../../tests/mockQueries';
import { Game } from '../../../@types/dataInterfaces';
import { CharacterMove } from '../../../@types/staticDataInterfaces';
import {
  mockAddGangPackAlpha,
  mockAddHolding,
  mockBattlefieldInstincts,
  mockBattleHardened,
  mockAngelSpecialCM,
  mockSixthSenseCM,
  mockInfirmaryCM,
  mockProfessionalCompassionCM,
  mockFuckThisShit,
  mockGunluggerSpecial,
  mockPackAlpha,
  mockSeeingSoulsAsCM,
  mockWealth,
} from '../../../tests/fixtures/characterMovesFixtures';
import { MockedResponse } from '@apollo/client/testing';
import OTHER_PLAYBOOK_MOVES, { OtherPlaybookMovesData } from '../../../queries/otherPlaybookMoves';
import { mockBonefeel, mockEverybodyEats, mockSeeingSouls } from '../../../tests/fixtures/movesFixtures';
import { decapitalize } from '../../../helpers/decapitalize';
import { INCREASED_BY_IMPROVEMENT_TEXT } from '../../../config/constants';
import { PlaybookType } from '../../../@types/enums';
import PLAYBOOK_CREATOR, { PlaybookCreatorData } from '../../../queries/playbookCreator';
import { mockPlaybookCreatorChopper, mockPlaybookCreatorGunlugger } from '../../../tests/fixtures/playbookCreatorFixtures';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

const mockPlaybookCreator_Chopper: MockedResponse<PlaybookCreatorData> = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.chopper },
  },
  result: () => {
    // console.log('mockPlaybookCreator');
    return {
      data: {
        __typename: 'PlaybookCreator',
        playbookCreator: mockPlaybookCreatorChopper,
      },
    };
  },
};

const mockPlaybookCreator_Gunlugger: MockedResponse<PlaybookCreatorData> = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.gunlugger },
  },
  result: () => {
    // console.log('mockPlaybookCreator');
    return {
      data: {
        __typename: 'PlaybookCreator',
        playbookCreator: mockPlaybookCreatorGunlugger,
      },
    };
  },
};

const generateOtherPlaybooksMoveQuery = (playbookType: PlaybookType) => ({
  request: {
    query: OTHER_PLAYBOOK_MOVES,
    variables: { playbookType },
  },
  result: () => {
    // console.log('mockOtherPlaybookMovesQuery');
    return {
      data: {
        otherPlaybookMoves: [mockBonefeel, mockEverybodyEats, mockSeeingSouls],
      },
    };
  },
});

const generateGame = (
  playbook: PlaybookType,
  allowedPlaybookMoves: number,
  allowedOtherPlaybookMoves: number,
  characterMoves: CharacterMove[],
  improvementMoves: CharacterMove[]
): Game => ({
  ...mockGame5,
  gameRoles: [
    mockGame5.gameRoles[0],
    mockGame5.gameRoles[1],
    {
      id: mockGame5.gameRoles[2].id,
      role: mockGame5.gameRoles[2].role,
      userId: mockGame5.gameRoles[2].userId,
      gameName: mockGame5.gameRoles[2].gameName,
      gameId: mockGame5.gameRoles[2].gameId,
      npcs: mockGame5.gameRoles[2].npcs,
      threats: mockGame5.gameRoles[2].threats,
      characters: [
        {
          ...blankCharacter,
          id: mockCharacter2.id,
          playbook,
          name: mockCharacter2.name,
          looks: mockCharacter2.looks,
          statsBlock: mockCharacter2.statsBlock,
          gear: mockCharacter2.gear,
          playbookUniques: mockCharacter2.playbookUniques,
          allowedPlaybookMoves,
          allowedOtherPlaybookMoves,
          characterMoves,
          improvementMoves,
        },
      ],
    },
  ],
});

describe('Rendering CharacterMovesForm', () => {
  let cache = new InMemoryCache();

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  describe('with only default moves on character', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(mockCharacter2.playbook, 2, 0, [{ ...mockAngelSpecialCM, isSelected: true }], []),
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });
    test('should render CharacterMovesForm in initial state (Angel)', async () => {
      screen.getByTestId('character-moves-form');
      screen.getByRole('heading', { name: `WHAT ARE ${mockCharacter2.name?.toUpperCase()}'S MOVES?` });
      const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
      expect(setButton.disabled).toBeTruthy();
      const defaultMoveCheckbox = screen.getByRole('checkbox', {
        name: mockPlaybookCreatorAngel.defaultMoves[0].description,
      }) as HTMLInputElement;
      expect(defaultMoveCheckbox.checked).toBeTruthy();
      mockPlaybookCreatorAngel.optionalMoves.forEach((move) => {
        const checkbox = screen.getByRole('checkbox', { name: `${decapitalize(move.name)}-checkbox` }) as HTMLInputElement;
        expect(checkbox.checked).toBeFalsy();
      });
      expect(screen.queryByText(INCREASED_BY_IMPROVEMENT_TEXT)).not.toBeInTheDocument();
      expect(screen.queryByRole('tab', { name: `${decapitalize(mockCharacter2.playbook)} moves` })).not.toBeInTheDocument();
      expect(screen.queryByRole('tab', { name: 'Other moves' })).not.toBeInTheDocument();
    });
    test('should select 2 moves and enable SET button', async () => {
      const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
      expect(setButton.disabled).toBeTruthy();
      const checkbox1 = screen.getByRole('checkbox', {
        name: `${decapitalize(mockPlaybookCreatorAngel.optionalMoves[0].name)}-checkbox`,
      }) as HTMLInputElement;
      const checkbox2 = screen.getByRole('checkbox', {
        name: `${decapitalize(mockPlaybookCreatorAngel.optionalMoves[1].name)}-checkbox`,
      }) as HTMLInputElement;

      userEvent.click(checkbox1);
      expect(checkbox1.checked).toBeTruthy();

      userEvent.click(checkbox2);
      expect(checkbox2.checked).toBeTruthy();

      expect(setButton.disabled).toBeFalsy();
    });
  });

  describe('with default moves and 2 optional moves on character', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(
          mockCharacter2.playbook,
          2,
          0,
          [
            { ...mockAngelSpecialCM, isSelected: true },
            { ...mockSixthSenseCM, isSelected: true },
            { ...mockInfirmaryCM, isSelected: true },
          ],
          []
        ),
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should render CharacterMovesForm with correct initial state', () => {
      expect(screen.getByText('Select 2')).toBeInTheDocument();
      expect(screen.queryByText(INCREASED_BY_IMPROVEMENT_TEXT)).not.toBeInTheDocument();
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes.filter((cb) => cb.checked)).toHaveLength(3);
    });

    test('should deselect a move and select a different one', () => {
      const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      const checkedCheckboxes = checkboxes.filter((cb) => cb.checked);
      const uncheckedCheckboxes = checkboxes.filter((cb) => !cb.checked);

      // Check that user can't unselect DEFAULT_CHARACTER moves
      userEvent.click(checkedCheckboxes[0]);
      expect(checkedCheckboxes[0].checked).toBeTruthy();

      // Uncheck an optional move
      userEvent.click(checkedCheckboxes[1]);
      expect(checkedCheckboxes[1].checked).toBeFalsy();

      // Select a different optional move
      userEvent.click(uncheckedCheckboxes[0]);
      expect(uncheckedCheckboxes[0].checked).toBeTruthy();

      expect(setButton.disabled).toBeFalsy();
    });
  });

  describe('with default moves, 2 optional moves, and one ADD_CHARACTER_MOVE improvement', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(
          mockCharacter2.playbook,
          3,
          0,
          [
            { ...mockAngelSpecialCM, isSelected: true },
            { ...mockSixthSenseCM, isSelected: true },
            { ...mockInfirmaryCM, isSelected: true },
          ],
          []
        ),
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });
    test('should render CharacterMovesForm with correct initial state', async () => {
      screen.getByTestId('character-moves-form');
      expect(screen.getByText('Select 3')).toBeInTheDocument();
      expect(screen.getByText(INCREASED_BY_IMPROVEMENT_TEXT)).toBeInTheDocument();
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes.filter((cb) => cb.checked)).toHaveLength(3);
    });

    test('should select and add 4th CharacterMove', () => {
      const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
      expect(setButton.disabled).toBeTruthy();
      const checkbox3 = screen.getByRole('checkbox', {
        name: `${decapitalize(mockPlaybookCreatorAngel.optionalMoves[2].name)}-checkbox`,
      }) as HTMLInputElement;

      userEvent.click(checkbox3);
      expect(checkbox3.checked).toBeTruthy();

      expect(setButton.disabled).toBeFalsy();
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes.filter((cb) => cb.checked)).toHaveLength(4);
    });
  });

  describe('with default moves, 3 optional moves, and one ADD_OTHER_PB_MOVE improvement', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(
          mockCharacter2.playbook,
          3,
          1,
          [
            { ...mockAngelSpecialCM, isSelected: true },
            { ...mockSixthSenseCM, isSelected: true },
            { ...mockInfirmaryCM, isSelected: true },
            { ...mockProfessionalCompassionCM, isSelected: true },
          ],
          []
        ),
        apolloMocks: [mockPlaybookCreator, generateOtherPlaybooksMoveQuery(mockCharacter2.playbook)],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick(); // wait for game query & otherPlaybookMoves query
    });

    test('should render CharacterMovesForm with correct initial state', () => {
      expect(screen.getByText('Select 3')).toBeInTheDocument();
      expect(screen.queryByText(INCREASED_BY_IMPROVEMENT_TEXT)).toBeInTheDocument();
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes.filter((cb) => cb.checked)).toHaveLength(4);
      expect(screen.getByRole('tab', { name: `${decapitalize(mockCharacter2.playbook)} moves` })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Other moves' })).toBeInTheDocument();
    });

    test('should change tab and select move from other playbook', () => {
      const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
      userEvent.click(screen.getByRole('tab', { name: 'Other moves' }));

      expect(screen.getByRole('tabpanel', { name: 'Other moves Tab Contents' })).toBeInTheDocument();
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes).toHaveLength(4); // 1 default move + 3 moves from other playbooks

      // Select move from other playbook
      userEvent.click(checkboxes[1]);
      expect(checkboxes[1].checked).toBeTruthy();

      // Check SET button enables
      expect(setButton.disabled).toBeFalsy();
    });
  });

  describe('with default moves and 4 moves on character (one from other playbook)', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(
          mockCharacter2.playbook,
          3,
          1,
          [
            { ...mockAngelSpecialCM, isSelected: true },
            { ...mockSixthSenseCM, isSelected: true },
            { ...mockInfirmaryCM, isSelected: true },
            { ...mockProfessionalCompassionCM, isSelected: true },
            { ...mockSeeingSoulsAsCM, isSelected: true },
          ],
          []
        ),
        apolloMocks: [mockPlaybookCreator, generateOtherPlaybooksMoveQuery(mockCharacter2.playbook)],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick(); // wait for game query & otherPlaybookMoves query
    });

    test('should should render CharacterMovesForm with correct initial state', () => {
      expect(screen.getByText('Select 3')).toBeInTheDocument();
      expect(screen.queryByText(INCREASED_BY_IMPROVEMENT_TEXT)).toBeInTheDocument();
      let checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes.filter((cb) => cb.checked)).toHaveLength(4);
      expect(screen.getByRole('tab', { name: `${decapitalize(mockCharacter2.playbook)} moves` })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Other moves' })).toBeInTheDocument();

      userEvent.click(screen.getByRole('tab', { name: 'Other moves' }));
      checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes.filter((cb) => cb.checked)).toHaveLength(2); // 1 selected default move + 1 selected other playbook move
    });
  });

  describe('with default moves, 0 optional moves, and one ADD_OTHER_PB_MOVE improvement', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(PlaybookType.chopper, 0, 1, [], []),
        apolloMocks: [mockPlaybookCreator_Chopper, generateOtherPlaybooksMoveQuery(PlaybookType.chopper)],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick(); // wait for game query & otherPlaybookMoves query
    });

    test('should should render CharacterMovesForm with correct initial state', () => {
      expect(screen.getByText('Select 1')).toBeInTheDocument();
      expect(screen.queryByRole('tab')).not.toBeInTheDocument();
      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      expect(checkboxes).toHaveLength(4); // 1 selected default move + 3 other playbook moves ready for selection
      expect(checkboxes.filter((cb) => cb.checked)).toHaveLength(1); // 1 selected default move
    });
  });

  describe('with default moves, 3 optional moves, and two moves from ADD_UNIQUE improvement', () => {
    beforeEach(async () => {
      renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(
          PlaybookType.gunlugger,
          3,
          2,
          [mockGunluggerSpecial, mockBattleHardened, mockFuckThisShit, mockBattlefieldInstincts, mockWealth, mockPackAlpha],
          [mockAddHolding, mockAddGangPackAlpha]
        ),
        apolloMocks: [mockPlaybookCreator_Gunlugger, generateOtherPlaybooksMoveQuery(PlaybookType.gunlugger)],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick(); // wait for game query & otherPlaybookMoves query
    });

    test('should render correct instructions on other moves tab', () => {
      userEvent.click(screen.getByRole('tab', { name: 'Other moves' }));
      expect(screen.getByText('Select 0')).toBeInTheDocument();
      expect(screen.getByText('(Already includes Wealth and Pack alpha)')).toBeInTheDocument();
    });
  });
});
