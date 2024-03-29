import wait from 'waait';
import { act, screen } from '@testing-library/react';

import CharacterNameForm from '../CharacterNameForm';
import {
  blankCharacter,
  mockCharacter2,
  mockGame5,
  mockAuth0UserInfo1,
} from '../../../tests/mocks';
import { renderWithRouter } from '../../../tests/test-utils';
import { mockPlaybookCreator } from '../../../tests/mockQueries';
import { UniqueTypes } from '../../../@types/enums';
import { Game } from '../../../@types/dataInterfaces';
import { dummyAngelKitMove } from '../../../tests/fixtures/dummyData';
import { mockNameAngel1 } from '../../../tests/fixtures/nameFixtures';

describe('Rendering CharacterNameForm', () => {
  test('should render CharacterNameForm in initial state', async () => {
    const mockGame: Game = {
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
            },
          ],
        },
      ],
    };

    renderWithRouter(
      <CharacterNameForm />,
      `/character-creation/${mockGame5.id}?step=2`,
      {
        isAuthenticated: true,
        injectedGame: mockGame,
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockAuth0UserInfo1.sub,
      }
    );

    await screen.findByTestId('character-name-form');
    await act(async () => await wait());
    screen.getByRole('heading', {
      name: `WHAT IS THE ${mockCharacter2.playbook} CALLED?`,
    });
    screen.getByRole('button', { name: 'SET' });
    screen.getByRole('textbox', { name: 'name-input' });
    screen.getByTestId(`${mockNameAngel1.name}-pill`);
  });

  test('should render CharacterNameForm with existing characters name', async () => {
    const existingName = 'Keenan';
    const mockGame: Game = {
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
              id: mockCharacter2.id,
              playbook: mockCharacter2.playbook,
              name: existingName,
              gear: [],
              statsBlock: {
                id: '',
                statsOptionId: '',
                stats: [],
              },
              hxBlock: [],
              looks: [],
              hasCompletedCharacterCreation: false,
              characterMoves: [],
              barter: 0,
              experience: 0,
              allowedImprovements: 0,
              allowedPlaybookMoves: 2,
              allowedOtherPlaybookMoves: 0,
              harm: mockCharacter2.harm,
              hasPlusOneForward: false,
              mustChangePlaybook: false,
              isDead: false,
              holds: [],
              vehicleCount: 0,
              battleVehicleCount: 0,
              vehicles: [],
              battleVehicles: [],
              playbookUniques: {
                id: 'dummy',
                type: UniqueTypes.angelKit,
                brainerGear: {
                  id: 'dummy',
                  uniqueType: UniqueTypes.brainerGear,
                  allowedItemsCount: 2,
                  brainerGear: [],
                },
                customWeapons: {
                  id: 'dummy',
                  uniqueType: UniqueTypes.customWeapons,
                  weapons: [],
                },
                angelKit: {
                  id: 'dummy',
                  uniqueType: UniqueTypes.angelKit,
                  description: 'dummy',
                  stock: 0,
                  hasSupplier: false,
                  supplierText: 'dummy',
                  angelKitMoves: [dummyAngelKitMove],
                },
              },
              improvementMoves: [],
              futureImprovementMoves: [],
              deathMoves: [],
            },
          ],
        },
      ],
    };

    renderWithRouter(
      <CharacterNameForm />,
      `/character-creation/${mockGame5.id}?step=2`,
      {
        isAuthenticated: true,
        injectedGame: mockGame,
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockAuth0UserInfo1.sub,
      }
    );

    await screen.findByTestId('character-name-form');
    const input = screen.getByRole('textbox', {
      name: 'name-input',
    }) as HTMLInputElement;
    expect(input.value).toEqual(existingName);
  });
});
