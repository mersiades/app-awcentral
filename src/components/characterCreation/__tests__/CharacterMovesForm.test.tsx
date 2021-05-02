import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import CharacterMovesForm, { INCREASED_BY_IMPROVEMENT_TEXT } from '../CharacterMovesForm';
import { mockKeycloakStub } from '../../../../__mocks__/@react-keycloak/web';
import {
  blankCharacter,
  mockCharacter2,
  mockCharacterMoveAngel1,
  mockGame5,
  mockKeycloakUserInfo1,
  mockPlaybookCreatorAngel,
} from '../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../tests/test-utils';
import { mockPlaybookCreator } from '../../../tests/mockQueries';
import { Game } from '../../../@types/dataInterfaces';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

const generateGame = (allowedPlaybookMoves: number): Game => ({
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
          characterMoves: [{ ...mockCharacterMoveAngel1, isSelected: true }],
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

  test('should render CharacterMovesForm in initial state (Angel)', async () => {
    renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
      isAuthenticated: true,
      injectedGame: generateGame(2),
      apolloMocks: [mockPlaybookCreator],
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });

    await waitOneTick();

    screen.getByTestId('character-moves-form');
    screen.getByRole('heading', { name: `WHAT ARE ${mockCharacter2.name?.toUpperCase()}'S MOVES?` });
    const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(true);
    const defaultMoveCheckbox = screen.getByRole('checkbox', {
      name: mockPlaybookCreatorAngel.defaultMoves[0].description,
    }) as HTMLInputElement;
    expect(defaultMoveCheckbox.checked).toEqual(true);
    mockPlaybookCreatorAngel.optionalMoves.forEach((move) => {
      const checkbox = screen.getByRole('checkbox', { name: move.description }) as HTMLInputElement;
      expect(checkbox.checked).toEqual(false);
    });
    expect(screen.queryByText(INCREASED_BY_IMPROVEMENT_TEXT)).not.toBeInTheDocument();
  });

  test('should render CharacterMovesForm with increased allowed moves', async () => {
    renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
      isAuthenticated: true,
      injectedGame: generateGame(3),
      apolloMocks: [mockPlaybookCreator],
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });

    await waitOneTick();

    screen.getByTestId('character-moves-form');
    expect(screen.getByText('Select 3')).toBeInTheDocument();
    expect(screen.getByText(INCREASED_BY_IMPROVEMENT_TEXT)).toBeInTheDocument();
  });

  test('should select 2 moves and enable SET button', async () => {
    renderWithRouter(<CharacterMovesForm />, `/character-creation/${mockGame5.id}?step=7`, {
      isAuthenticated: true,
      injectedGame: generateGame(2),
      apolloMocks: [mockPlaybookCreator],
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });

    await waitOneTick();

    screen.getByTestId('character-moves-form');
    const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(true);
    const checkbox1 = screen.getByRole('checkbox', {
      name: mockPlaybookCreatorAngel.optionalMoves[0].description,
    }) as HTMLInputElement;
    const checkbox2 = screen.getByRole('checkbox', {
      name: mockPlaybookCreatorAngel.optionalMoves[1].description,
    }) as HTMLInputElement;

    userEvent.click(checkbox1);
    expect(checkbox1.checked).toEqual(true);

    userEvent.click(checkbox2);
    expect(checkbox2.checked).toEqual(true);

    expect(setButton.disabled).toEqual(false);
  });
});
