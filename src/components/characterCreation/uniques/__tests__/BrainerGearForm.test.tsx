import React from 'react';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BrainerGearForm from '../BrainerGearForm';
import { mockKeycloakStub } from '../../../../../__mocks__/@react-keycloak/web';
import { blankCharacter, mockCharacter2, mockGame5, mockKeycloakUserInfo1 } from '../../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../../tests/test-utils';
import { PlaybookType } from '../../../../@types/enums';
import { mockPlayBookCreatorQueryBrainer } from '../../../../tests/mockQueries';
import { BrainerGear, Game } from '../../../../@types/dataInterfaces';
import { mockPlaybookUniqueBrainer } from '../../../../tests/fixtures/playBookUniquesFixtures';
import { INCREASED_BY_IMPROVEMENT_TEXT } from '../../../../config/constants';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({ keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1), initialized: true }),
  };
});

describe('Rendering BrainerGearForm', () => {
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
            playbook: PlaybookType.brainer,
            name: mockCharacter2.name,
            looks: mockCharacter2.looks,
            statsBlock: mockCharacter2.statsBlock,
            gear: mockCharacter2.gear,
            playbookUniques: mockPlaybookUniqueBrainer,
          },
        ],
      },
    ],
  };

  const mockGame2: Game = {
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
            playbook: PlaybookType.brainer,
            name: mockCharacter2.name,
            looks: mockCharacter2.looks,
            statsBlock: mockCharacter2.statsBlock,
            gear: mockCharacter2.gear,
            playbookUniques: {
              ...mockPlaybookUniqueBrainer,
              brainerGear: {
                ...(mockPlaybookUniqueBrainer.brainerGear as BrainerGear),
                allowedItemsCount: 4,
              },
            },
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  test('should render BrainerGearForm in initial state', async () => {
    renderWithRouter(<BrainerGearForm />, `/character-creation/${mockGame5.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockPlayBookCreatorQueryBrainer],
      injectedGame: mockGame,
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });

    await waitOneTick();

    screen.getByTestId('brainer-gear-form');

    screen.getByRole('heading', {
      name: `WHAT SPECIAL BRAINER GEAR DOES ${mockCharacter2.name?.toUpperCase()} HAVE?`,
    });
    screen.getByRole('button', { name: 'SET' });
    screen.getByRole('checkbox', { name: /implant syringe/i });
    screen.getByRole('checkbox', { name: /brain relay/i });
  });

  test('should enable SET button after selecting two items', async () => {
    renderWithRouter(<BrainerGearForm />, `/character-creation/${mockGame5.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockPlayBookCreatorQueryBrainer],
      injectedGame: mockGame,
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });

    await waitOneTick();

    const setButton = screen.getByRole('button', { name: 'SET' }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(true);
    const item1 = screen.getByRole('checkbox', { name: /implant syringe/i }) as HTMLInputElement;
    expect(item1.checked).toEqual(false);
    const item2 = screen.getByRole('checkbox', { name: /brain relay/i }) as HTMLInputElement;
    expect(item1.checked).toEqual(false);

    userEvent.click(item1);
    expect(item1.checked).toEqual(true);
    userEvent.click(item2);
    expect(item2.checked).toEqual(true);
    expect(setButton.disabled).toEqual(false);
  });

  test('should show extra options when character has improvement move', async () => {
    renderWithRouter(<BrainerGearForm />, `/character-creation/${mockGame5.id}`, {
      isAuthenticated: true,
      apolloMocks: [mockPlayBookCreatorQueryBrainer],
      injectedGame: mockGame2,
      injectedUserId: mockKeycloakUserInfo1.sub,
      cache,
    });

    await waitOneTick();

    expect(screen.getByText('Select 4')).toBeInTheDocument();
    expect(screen.getByText(INCREASED_BY_IMPROVEMENT_TEXT)).toBeInTheDocument();
  });
});
