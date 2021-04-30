import wait from 'waait';
import { act, screen } from '@testing-library/react';

import CharacterNameForm from '../CharacterNameForm';
import { mockKeycloakStub } from '../../../../__mocks__/@react-keycloak/web';
import {
  blankCharacter,
  dummyAngelKitMove,
  mockCharacter2,
  mockGame5,
  mockKeycloakUserInfo1,
  mockNameAngel1,
} from '../../../tests/mocks';
import { renderWithRouter } from '../../../tests/test-utils';
import { mockPlaybookCreator } from '../../../tests/mockQueries';
import { UniqueTypes } from '../../../@types/enums';
import { Game } from '../../../@types/dataInterfaces';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

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

    renderWithRouter(<CharacterNameForm />, `/character-creation/${mockGame5.id}?step=2`, {
      isAuthenticated: true,
      injectedGame: mockGame,
      apolloMocks: [mockPlaybookCreator],
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    await screen.findByTestId('character-name-form');
    await act(async () => await wait());
    screen.getByRole('heading', { name: `WHAT IS THE ${mockCharacter2.playbook} CALLED?` });
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
              harm: mockCharacter2.harm,
              hasPlusOneForward: false,
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
                  brainerGear: [],
                },
                customWeapons: {
                  id: 'dummy',
                  weapons: [],
                },
                angelKit: {
                  id: 'dummy',
                  description: 'dummy',
                  stock: 0,
                  hasSupplier: false,
                  supplierText: 'dummy',
                  angelKitMoves: [dummyAngelKitMove],
                },
              },
            },
          ],
        },
      ],
    };

    renderWithRouter(<CharacterNameForm />, `/character-creation/${mockGame5.id}?step=2`, {
      isAuthenticated: true,
      injectedGame: mockGame,
      apolloMocks: [mockPlaybookCreator],
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    await screen.findByTestId('character-name-form');
    const input = screen.getByRole('textbox', { name: 'name-input' }) as HTMLInputElement;
    expect(input.value).toEqual(existingName);
  });
});
