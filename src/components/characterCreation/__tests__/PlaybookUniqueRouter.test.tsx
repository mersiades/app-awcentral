import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import { mockPlaybookCreator } from '../../../tests/mockQueries';
import { blankCharacter, mockCharacter2, mockGame5, mockKeycloakUserInfo1 } from '../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../tests/test-utils';
import PlaybookUniqueRouter from '../PlaybookUniqueRouter';
import { Game, PlaybookUniques } from '../../../@types/dataInterfaces';
import {
  mockPlaybookUniqueAngel,
  mockPlaybookUniqueBattlebabe,
  mockPlaybookUniqueGunlugger,
  mockPlaybookUniqueGunlugger_withAngelKit,
} from '../../../tests/fixtures/playBookUniquesFixtures';
import { ANGEL_KIT_FORM_TEST_ID } from '../uniques/AngelKitForm';
import { WEAPONS_FORM_TEST_ID } from '../uniques/WeaponsForm';
import { decapitalize } from '../../../helpers/decapitalize';
import { UniqueTypes } from '../../../@types/enums';
import { CUSTOM_WEAPONS_FORM_TEST_ID } from '../uniques/CustomWeaponsForm';
describe('Rendering PlaybookUniqueRouter', () => {
  let cache = new InMemoryCache();

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  const generateGame = (playbookUniques: PlaybookUniques): Game => ({
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
            playbookUniques,
          },
        ],
      },
    ],
  });

  describe('with AngelKit', () => {
    beforeEach(async () => {
      renderWithRouter(<PlaybookUniqueRouter />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(mockPlaybookUniqueAngel),
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should render AngelKitForm with no tabs', () => {
      expect(screen.getByTestId(ANGEL_KIT_FORM_TEST_ID)).toBeInTheDocument();
      const tabs = screen.queryAllByRole('tab');
      expect(tabs).toHaveLength(0);
    });
  });

  describe('with CustomWeapons', () => {
    beforeEach(async () => {
      renderWithRouter(<PlaybookUniqueRouter />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(mockPlaybookUniqueBattlebabe),
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should render CustomWeaponsForm with no tabs', () => {
      expect(screen.getByTestId(CUSTOM_WEAPONS_FORM_TEST_ID)).toBeInTheDocument();
      const tabs = screen.queryAllByRole('tab');
      expect(tabs).toHaveLength(0);
    });
  });

  describe('with BrainerGear', () => {});

  describe('with Gang', () => {});

  describe('with Weapons', () => {
    beforeEach(async () => {
      renderWithRouter(<PlaybookUniqueRouter />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(mockPlaybookUniqueGunlugger),
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should render WeaponsForm with no tabs', () => {
      expect(screen.getByTestId(WEAPONS_FORM_TEST_ID)).toBeInTheDocument();
      const tabs = screen.queryAllByRole('tab');
      expect(tabs).toHaveLength(0);
    });
  });

  describe('with Weapons and AngelKit', () => {
    beforeEach(async () => {
      renderWithRouter(<PlaybookUniqueRouter />, `/character-creation/${mockGame5.id}?step=7`, {
        isAuthenticated: true,
        injectedGame: generateGame(mockPlaybookUniqueGunlugger_withAngelKit),
        apolloMocks: [mockPlaybookCreator],
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should render tabs for WeaponsForm and AngelKit', () => {
      expect(screen.getByTestId(WEAPONS_FORM_TEST_ID)).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: decapitalize(UniqueTypes.weapons) })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: decapitalize(UniqueTypes.angelKit) })).toBeInTheDocument();
      expect(
        screen.getByRole('tabpanel', { name: `${decapitalize(UniqueTypes.weapons)} Tab Contents` })
      ).toBeInTheDocument();

      userEvent.click(screen.getByRole('tab', { name: decapitalize(UniqueTypes.angelKit) }));
      expect(
        screen.getByRole('tabpanel', { name: `${decapitalize(UniqueTypes.angelKit)} Tab Contents` })
      ).toBeInTheDocument();
    });
  });

  describe('with Holding', () => {});

  describe('with Followers', () => {});

  describe('with Establishment', () => {});

  describe('with Workspace', () => {});

  describe('with SkinnerGear', () => {});
});
