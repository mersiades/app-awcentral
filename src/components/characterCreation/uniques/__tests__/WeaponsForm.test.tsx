import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import WeaponsForm from '../WeaponsForm';
import {
  blankCharacter,
  mockCharacter2,
  mockGame5,
  mockAuth0UserInfo1,
} from '../../../../tests/mocks';
import { renderWithRouter } from '../../../../tests/test-utils';
import { mockPlayBookCreatorQueryGunlugger } from '../../../../tests/mockQueries';
import { Game } from '../../../../@types/dataInterfaces';
import { mockWeaponsCreator } from '../../../../tests/fixtures/playbookUniqueCreatorsFixtures';

describe('Rendering WeaponsForm', () => {
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
  beforeEach(() => {
    cache = new InMemoryCache();
  });

  test('should render WeaponsForm in intial state', async () => {
    renderWithRouter(<WeaponsForm />, `/character-creation/${mockGame5.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockPlayBookCreatorQueryGunlugger],
      injectedGame: mockGame,
      injectedUserId: mockAuth0UserInfo1.sub,
      cache,
    });

    await screen.findByTestId('weapons-form');
    await screen.findByRole('heading', {
      name: `${mockCharacter2.name?.toUpperCase()}'S WEAPONS`,
    });
    mockWeaponsCreator.bigFuckOffGuns.forEach((gun) =>
      screen.getByTestId(`${gun}-pill`)
    );
    mockWeaponsCreator.seriousGuns.forEach((gun) =>
      screen.getByTestId(`${gun}-pill`)
    );
    mockWeaponsCreator.backupWeapons.forEach((gun) =>
      screen.getByTestId(`${gun}-pill`)
    );
    screen.getByRole('button', { name: 'SET' });
  });

  test('should enable SET button after form completion', async () => {
    renderWithRouter(<WeaponsForm />, `/character-creation/${mockGame5.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockPlayBookCreatorQueryGunlugger],
      injectedGame: mockGame,
      injectedUserId: mockAuth0UserInfo1.sub,
      cache,
    });

    await screen.findByTestId('weapons-form');
    await screen.findByRole('heading', {
      name: `${mockCharacter2.name?.toUpperCase()}'S WEAPONS`,
    });
    const bigGun = screen.getByTestId(
      `${mockWeaponsCreator.bigFuckOffGuns[0]}-pill`
    );
    const seriousGun1 = screen.getByTestId(
      `${mockWeaponsCreator.seriousGuns[0]}-pill`
    );
    const seriousGun2 = screen.getByTestId(
      `${mockWeaponsCreator.seriousGuns[1]}-pill`
    );
    const backupWeapon = screen.getByTestId(
      `${mockWeaponsCreator.backupWeapons[0]}-pill`
    );

    // Select big gun
    await userEvent.click(bigGun);

    // Select first serious gun
    await userEvent.click(seriousGun1);

    // Select second serious gun
    await userEvent.click(seriousGun2);

    // Select backup weapon
    await userEvent.click(backupWeapon);
    let setButton = screen.getByRole('button', {
      name: 'SET',
    }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(false);

    // De-select backup weapon
    await userEvent.click(backupWeapon);
    setButton = screen.getByRole('button', {
      name: 'SET',
    }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(true);
  });
});
