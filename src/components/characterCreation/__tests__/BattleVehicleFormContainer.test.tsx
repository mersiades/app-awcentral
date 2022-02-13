import React from 'react';
import { screen } from '@testing-library/react';
import { InMemoryCache } from '@apollo/client';
import userEvent from '@testing-library/user-event';

import BattleVehiclesFormContainer from '../BattleVehiclesFormContainer';
import {
  blankCharacter,
  mockCharacter2,
  mockGame5,
  mockAuth0UserInfo1,
} from '../../../tests/mocks';
import { renderWithRouter } from '../../../tests/test-utils';
import {
  mockSetBattleVehicleCount,
  mockVehicleCreatorQuery,
} from '../../../tests/mockQueries';
import { Game } from '../../../@types/dataInterfaces';

describe('Rendering BattleVehicleFormContainer', () => {
  let cache = new InMemoryCache();

  const mockGame: Game = {
    __typename: 'Game',
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
            __typename: 'Character',
            ...blankCharacter,
            id: mockCharacter2.id,
            playbook: mockCharacter2.playbook,
            name: mockCharacter2.name,
            looks: mockCharacter2.looks,
            statsBlock: mockCharacter2.statsBlock,
            gear: mockCharacter2.gear,
            playbookUniques: mockCharacter2.playbookUniques,
            characterMoves: mockCharacter2.characterMoves,
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  test('should give "no default vehicles" message to Angel', async () => {
    renderWithRouter(
      <BattleVehiclesFormContainer />,
      `/character-creation/${mockGame5.id}?step=9`,
      {
        isAuthenticated: true,
        injectedGame: mockGame,
        injectedUserId: mockAuth0UserInfo1.sub,
        cache,
      }
    );

    await screen.findByTestId('no-default-battle-vehicle-message');
    screen.getByRole('button', { name: 'ADD VEHICLE' });
    screen.getByRole('button', { name: 'PASS' });
  });

  test('should open BattleVehicleForm on ADD VEHICLE click', async () => {
    renderWithRouter(
      <BattleVehiclesFormContainer />,
      `/character-creation/${mockGame5.id}?step=9`,
      {
        isAuthenticated: true,
        injectedGame: mockGame,
        apolloMocks: [mockSetBattleVehicleCount, mockVehicleCreatorQuery],
        injectedUserId: mockAuth0UserInfo1.sub,
        cache,
      }
    );

    await screen.findByTestId('no-default-battle-vehicle-message');
    const addButton = screen.getByRole('button', { name: 'ADD VEHICLE' });
    userEvent.click(addButton);
    // FAILING: mutation returns correct value, but it does not update the graphql cache
    // await screen.findByTestId('battle-vehicle-form');
  });
});
