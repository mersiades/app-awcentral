import React from 'react';
import { screen } from '@testing-library/react';

import { Character, Game } from '../../../../@types/dataInterfaces';
import {
  mockBattlebabeLook,
  mockCharacterHarm,
  mockFirearmBaseOption,
  mockFirearmOption,
  mockFirearmOption2,
  mockHandBaseOption,
  mockHandOption,
  mockHandOption2,
  mockKeycloakUserInfo1,
  mockPlaybookCreatorBattlebabe,
} from '../../../../tests/mocks';
import { LookType, PlaybookType, RoleType } from '../../../../@types/enums';
import { mockKeycloakStub } from '../../../../../__mocks__/@react-keycloak/web';
import CustomWeaponsForm from '../CustomWeaponsForm';
import { renderWithRouter, waitOneTick } from '../../../../tests/test-utils';
import { MockedResponse } from '@apollo/client/testing';
import PLAYBOOK_CREATOR, {
  PlaybookCreatorData,
} from '../../../../queries/playbookCreator';
import { InMemoryCache } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import {
  mockAngelSpecialCM,
  mockSixthSenseCM,
  mockInfirmaryCM,
} from '../../../../tests/fixtures/characterMovesFixtures';
import { mockLookBattlebabe2 } from '../../../../tests/fixtures/lookFixtures';
import { mockPlaybookUniqueBattlebabe } from '../../../../tests/fixtures/playBookUniquesFixtures';
import { mockStatsBlock1 } from '../../../../tests/fixtures/statsBlockFixtures';

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

const mockBattleBabe: Character = {
  id: 'mock-character-id-1',
  name: 'Mock Character 1',
  playbook: PlaybookType.battlebabe,
  hasCompletedCharacterCreation: false,
  gear: ['leather jacket', 'Timberland boots'],
  statsBlock: mockStatsBlock1,
  barter: 2,
  experience: 0,
  allowedImprovements: 0,
  allowedPlaybookMoves: 2,
  allowedOtherPlaybookMoves: 0,
  hxBlock: [],
  harm: mockCharacterHarm,
  looks: [mockBattlebabeLook, mockLookBattlebabe2],
  characterMoves: [
    mockAngelSpecialCM,
    { ...mockSixthSenseCM, isSelected: true },
    { ...mockInfirmaryCM, isSelected: true },
  ], // TODO: change to battlebabe moves
  playbookUniques: mockPlaybookUniqueBattlebabe,
  vehicleCount: 0,
  battleVehicleCount: 0,
  battleVehicles: [],
  hasPlusOneForward: false,
  mustChangePlaybook: false,
  isDead: false,
  holds: [],
  vehicles: [],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  __typename: 'Character',
};

const mockGame: Game = {
  id: 'mock-game-id-5',
  name: 'Mock Game 5',
  commsApp: 'Discord',
  commsUrl: 'https://discord.com/urltodiscordchannel',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: { displayName: 'mock-user-2', id: 'mock-keycloak-id-2' },
  players: [
    {
      id: 'mock-keycloak-id-3',
      displayName: 'mock-user-3',
      email: 'mock-user-3@email.com',
    },
    {
      id: 'mock-keycloak-id-1',
      displayName: 'mock-user-1',
      email: 'mock-user-3@email.com',
    },
  ],
  gameRoles: [
    {
      id: 'mock-gameRole-id-6',
      role: RoleType.mc,
      userId: 'mock-keycloak-id-2',
      gameName: 'Mock Game 5',
      gameId: 'mock-game-id-5',
      npcs: [],
      threats: [],
      characters: [],
    },
    {
      id: 'mock-gameRole-id-8',
      role: RoleType.player,
      userId: 'mock-keycloak-id-1',
      gameName: 'Mock Game 5',
      gameId: 'mock-game-id-5',
      npcs: [],
      threats: [],
      characters: [{ ...mockBattleBabe, playbookUniques: undefined }],
    },
  ],
  invitees: [],
  gameMessages: [],
};

export const mockPlayBookCreatorQueryBattlebabe: MockedResponse<PlaybookCreatorData> =
  {
    request: {
      query: PLAYBOOK_CREATOR,
      variables: { playbookType: PlaybookType.battlebabe },
    },
    result: () => {
      // console.log('mockPlayBookCreatorQueryBattlebabe');
      return {
        data: {
          playbookCreator: mockPlaybookCreatorBattlebabe,
        },
      };
    },
  };

describe('Rendering CustomWeaponsForm', () => {
  let cache = new InMemoryCache();

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  test('should render CustomWeaponsForm in initial state', async () => {
    renderWithRouter(
      <CustomWeaponsForm />,
      `/character-creation/${mockGame.id}`,
      {
        isAuthenticated: true,
        apolloMocks: [mockPlayBookCreatorQueryBattlebabe],
        injectedGame: mockGame,
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      }
    );

    screen.getByTestId('custom-weapons-form');
    screen.getByRole('heading', {
      name: `WHAT ARE ${mockBattleBabe.name?.toUpperCase()}'S TWO CUSTOM WEAPONS?`,
    });
    await waitOneTick(); // wait for playbookCreator query

    screen.getByRole('heading', { name: 'CUSTOM FIREARMS' });
    screen.getByRole('heading', { name: 'CUSTOM HAND WEAPONS' });
    const weaponInput = screen.getByRole('textbox', {
      name: 'weapon-input',
    }) as HTMLInputElement;
    expect(weaponInput.value).toEqual('');
    const resetButton = screen.getByRole('button', {
      name: 'RESET',
    }) as HTMLButtonElement;
    expect(resetButton.disabled).toEqual(true);
    const removeButton = screen.getByRole('button', {
      name: 'REMOVE',
    }) as HTMLButtonElement;
    expect(removeButton.disabled).toEqual(true);
    const addButton = screen.getByRole('button', {
      name: 'ADD',
    }) as HTMLButtonElement;
    expect(addButton.disabled).toEqual(true);
    const setButton = screen.getByRole('button', {
      name: 'SET',
    }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(true);
    screen.getByRole('list', { name: 'interim-weapons-list' });
  });

  test('should be able to add, remove and reset interim weapons and enable SET button', async () => {
    renderWithRouter(
      <CustomWeaponsForm />,
      `/character-creation/${mockGame.id}`,
      {
        isAuthenticated: true,
        apolloMocks: [mockPlayBookCreatorQueryBattlebabe],
        injectedGame: mockGame,
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      }
    );

    await waitOneTick(); // wait for playbookCreator query

    const weaponInput = screen.getByRole('textbox', {
      name: 'weapon-input',
    }) as HTMLInputElement;
    const resetButton = screen.getByRole('button', {
      name: 'RESET',
    }) as HTMLButtonElement;
    const removeButton = screen.getByRole('button', {
      name: 'REMOVE',
    }) as HTMLButtonElement;
    const addButton = screen.getByRole('button', {
      name: 'ADD',
    }) as HTMLButtonElement;
    const setButton = screen.getByRole('button', {
      name: 'SET',
    }) as HTMLButtonElement;
    const interimList = screen.getByRole('list', {
      name: 'interim-weapons-list',
    });

    // Click base firearm pill
    const baseOption1 = screen.getByTestId(
      `${mockFirearmBaseOption.description}-base-option-pill`
    );
    userEvent.click(baseOption1);
    expect(weaponInput.value).toContain(mockFirearmBaseOption.description);
    mockFirearmBaseOption.tags.forEach((tag) =>
      expect(weaponInput.value).toContain(tag)
    );

    // Click RESET button
    userEvent.click(resetButton);
    expect(weaponInput.value).toEqual('');

    // Click base firearm pill again
    userEvent.click(baseOption1);

    // Click 1st firearm option (should add tag because +antique)
    const option1 = screen.getByTestId(
      `${mockFirearmOption.description}-option-pill`
    );
    userEvent.click(option1);
    expect(weaponInput.value).toContain(mockFirearmOption.description);

    // Click 2nd firearm option (should remove tag because -reload)
    const option2 = screen.getByTestId(
      `${mockFirearmOption2.description}-option-pill`
    );
    userEvent.click(option2);
    expect(weaponInput.value).toContain(mockFirearmOption2.description);
    expect(weaponInput.value).not.toContain(mockFirearmOption2.tag);

    // Click ADD button
    userEvent.click(addButton);
    expect(interimList.textContent).toContain(
      mockFirearmBaseOption.description
    );
    expect(interimList.textContent).toContain(mockFirearmOption.description);
    expect(interimList.textContent).toContain(mockFirearmOption2.description);
    expect(weaponInput.value).toEqual('');

    // SET button should still be disabled because only one interim weapon
    expect(setButton.disabled).toEqual(true);

    // Remove the weapon from interim list
    const interimWeapon1 = screen.getByRole('listitem', {
      name: 'interim-weapon-1',
    });
    userEvent.click(interimWeapon1);
    expect(weaponInput.value).toContain(mockFirearmOption2.description);
    expect(weaponInput.value).not.toContain(mockFirearmOption2.tag);
    expect(weaponInput.value).toContain(mockFirearmOption.description);
    expect(weaponInput.value).toContain(mockFirearmBaseOption.description);
    expect(removeButton.disabled).toEqual(false);
    userEvent.click(removeButton);
    expect(interimList.textContent).toEqual('');

    // Add firearm back into interim list
    userEvent.click(baseOption1);
    userEvent.click(option1);
    userEvent.click(option2);
    userEvent.click(addButton);

    // Add hand weapon to interim list
    const baseOption2 = screen.getByTestId(
      `${mockHandBaseOption.description}-base-option-pill`
    );
    userEvent.click(baseOption2);
    const option3 = screen.getByTestId(
      `${mockHandOption.description}-option-pill`
    );
    userEvent.click(option3);
    const option4 = screen.getByTestId(
      `${mockHandOption2.description}-option-pill`
    );
    userEvent.click(option4);

    expect(weaponInput.value).toContain('2-harm');
    userEvent.click(addButton);
    expect(interimList.textContent).toContain(
      mockFirearmBaseOption.description
    );
    expect(interimList.textContent).toContain(mockHandBaseOption.description);

    // Check SET button is enabled
    expect(setButton.disabled).toEqual(false);
  });
});
