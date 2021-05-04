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
  mockCharacterMoveAngel1,
  mockCharacterMoveAngel2,
  mockCharacterMoveAngel3,
  mockCharacterMoveAngel4,
  mockSeeingSoulsAsCM,
} from '../../../tests/fixtures/characterMovesFixtures';
import { MockedResponse } from '@apollo/client/testing';
import OTHER_PLAYBOOK_MOVES, { OtherPlaybookMovesData } from '../../../queries/otherPlaybookMoves';
import { mockBonefeel, mockEverybodyEats, mockSeeingSouls } from '../../../tests/fixtures/mockMoves';
import { decapitalize } from '../../../helpers/decapitalize';
import { INCREASED_BY_IMPROVEMENT_TEXT } from '../../../config/constants';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

const mockOtherPlaybookMovesQuery: MockedResponse<OtherPlaybookMovesData> = {
  request: {
    query: OTHER_PLAYBOOK_MOVES,
    variables: { playbookType: mockCharacter2.playbook },
  },
  result: () => {
    // console.log('mockOtherPlaybookMovesQuery');
    return {
      data: {
        otherPlaybookMoves: [mockBonefeel, mockEverybodyEats, mockSeeingSouls],
      },
    };
  },
};

const generateGame = (
  allowedPlaybookMoves: number,
  allowedOtherPlaybookMoves: number,
  characterMoves: CharacterMove[]
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
          playbook: mockCharacter2.playbook,
          name: mockCharacter2.name,
          looks: mockCharacter2.looks,
          statsBlock: mockCharacter2.statsBlock,
          gear: mockCharacter2.gear,
          playbookUniques: mockCharacter2.playbookUniques,
          allowedPlaybookMoves,
          allowedOtherPlaybookMoves,
          characterMoves,
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
        injectedGame: generateGame(2, 0, [{ ...mockCharacterMoveAngel1, isSelected: true }]),
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
        const checkbox = screen.getByRole('checkbox', { name: move.description }) as HTMLInputElement;
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
        name: mockPlaybookCreatorAngel.optionalMoves[0].description,
      }) as HTMLInputElement;
      const checkbox2 = screen.getByRole('checkbox', {
        name: mockPlaybookCreatorAngel.optionalMoves[1].description,
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
        injectedGame: generateGame(2, 0, [
          { ...mockCharacterMoveAngel1, isSelected: true },
          { ...mockCharacterMoveAngel2, isSelected: true },
          { ...mockCharacterMoveAngel3, isSelected: true },
        ]),
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
        injectedGame: generateGame(3, 0, [
          { ...mockCharacterMoveAngel1, isSelected: true },
          { ...mockCharacterMoveAngel2, isSelected: true },
          { ...mockCharacterMoveAngel3, isSelected: true },
        ]),
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
        name: mockPlaybookCreatorAngel.optionalMoves[2].description,
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
        injectedGame: generateGame(3, 1, [
          { ...mockCharacterMoveAngel1, isSelected: true },
          { ...mockCharacterMoveAngel2, isSelected: true },
          { ...mockCharacterMoveAngel3, isSelected: true },
          { ...mockCharacterMoveAngel4, isSelected: true },
        ]),
        apolloMocks: [mockPlaybookCreator, mockOtherPlaybookMovesQuery],
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
        injectedGame: generateGame(3, 1, [
          { ...mockCharacterMoveAngel1, isSelected: true },
          { ...mockCharacterMoveAngel2, isSelected: true },
          { ...mockCharacterMoveAngel3, isSelected: true },
          { ...mockCharacterMoveAngel4, isSelected: true },
          { ...mockSeeingSoulsAsCM, isSelected: true },
        ]),
        apolloMocks: [mockPlaybookCreator, mockOtherPlaybookMovesQuery],
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
});
