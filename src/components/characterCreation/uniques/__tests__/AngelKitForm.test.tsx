import React from 'react';
import { screen } from '@testing-library/react';
import { InMemoryCache } from '@apollo/client';

import AngelKitForm from '../AngelKitForm';
import {
  blankCharacter,
  mockAngelKitCreator,
  mockCharacter2,
  mockGame5,
  mockAuth0UserInfo1,
} from '../../../../tests/mocks';
import { renderWithRouter } from '../../../../tests/test-utils';
import { mockPlayBookCreatorQueryAngel } from '../../../../tests/mockQueries';
import { Game } from '../../../../@types/dataInterfaces';

describe('Rendering AngelKitForm', () => {
  test('should load AngelKitForm in initial state', async () => {
    let cache = new InMemoryCache();
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
              name: mockCharacter2.name,
              looks: mockCharacter2.looks,
              statsBlock: mockCharacter2.statsBlock,
              gear: mockCharacter2.gear,
            },
          ],
        },
      ],
    };

    renderWithRouter(<AngelKitForm />, `/character-creation/${mockGame5.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockPlayBookCreatorQueryAngel],
      injectedGame: mockGame,
      injectedUserId: mockAuth0UserInfo1.sub,
      cache,
    });

    await screen.findByTestId('angel-kit-form');

    await screen.findByRole('heading', {
      name: `${mockCharacter2.name?.toUpperCase()}'S ANGEL KIT`,
    });
    screen.getByRole('heading', { name: 'Stock' });
    const setButton = screen.getByRole('button', {
      name: /SET/i,
    }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(false);

    expect(
      screen.getByRole('heading', { name: 'stock-value' }).textContent
    ).toEqual(mockAngelKitCreator.startingStock.toString());
  });
});
