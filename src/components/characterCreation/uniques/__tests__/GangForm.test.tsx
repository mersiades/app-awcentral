import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import GangForm from '../GangForm';
import { mockKeycloakStub } from '../../../../../__mocks__/@react-keycloak/web';
import { mockGame5, mockKeycloakUserInfo1 } from '../../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../../tests/test-utils';
import { mockPlayBookCreatorQueryChopper } from '../../../../tests/mockQueries';
import {
  Character,
  Game,
  Gang,
  PlaybookUniques,
} from '../../../../@types/dataInterfaces';
import { mockChopper_withName } from '../../../../tests/fixtures/characterFixtures';
import { INCREASED_BY_IMPROVEMENT_TEXT } from '../../../../config/constants';
import { mockGangCreator } from '../../../../tests/fixtures/playbookUniqueCreatorsFixtures';

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

const generateGame = (character: Character): Game => ({
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
      characters: [character],
    },
  ],
});

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
      characters: [mockChopper_withName],
    },
  ],
};

describe('Rendering GangForm', () => {
  let cache = new InMemoryCache();

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  describe('with a brand new gang', () => {
    beforeEach(async () => {
      renderWithRouter(<GangForm />, `/character-creation/${mockGame5.id}`, {
        isAuthenticated: true,
        apolloMocks: [mockPlayBookCreatorQueryChopper],
        injectedGame: generateGame(mockChopper_withName),
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should render GangForm in intial state', () => {
      screen.getByTestId('gang-form');
      screen.getByRole('heading', {
        name: `${mockChopper_withName.name?.toUpperCase()}'S GANG`,
      });
      const sizeValue = screen.getByRole('heading', { name: 'size-value' });
      expect(sizeValue.textContent).toEqual(mockGangCreator.defaultSize);
      const harmValue = screen.getByRole('heading', { name: 'harm-value' });
      expect(harmValue.textContent).toEqual(
        mockGangCreator.defaultHarm.toString()
      );
      const armorValue = screen.getByRole('heading', { name: 'armor-value' });
      expect(armorValue.textContent).toEqual(
        mockGangCreator.defaultArmor.toString()
      );
      const tagsBox = screen.getByTestId('tags-tags-box');
      expect('+' + tagsBox.textContent).toContain(
        mockGangCreator.defaultTags[0]
      );
      const checkBoxes = screen.getAllByRole('checkbox');
      expect(checkBoxes.length).toEqual(4);
      screen.getByRole('button', { name: 'SET' });
    });

    test('should enable SET button after completing form', async () => {
      let setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      const strength1 = screen.getByRole('checkbox', {
        name: `option-${mockGangCreator.strengths[0].description}`,
      });
      const strength2 = screen.getByRole('checkbox', {
        name: `option-${mockGangCreator.strengths[1].description}`,
      });
      const weakness = screen.getByRole('checkbox', {
        name: `option-${mockGangCreator.weaknesses[0].description}`,
      });
      const harmValue = screen.getByRole('heading', { name: 'harm-value' });
      const tagsBox = screen.getByTestId('tags-tags-box');

      // Select first strength
      userEvent.click(strength1);
      expect(harmValue.textContent).toEqual('3');
      await waitOneTick();
      setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(true);

      // Select second strength
      userEvent.click(strength2);
      expect(tagsBox.textContent).not.toContain('savage');
      await waitOneTick();
      setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(true);

      // Select weakness
      userEvent.click(weakness);
      expect('+' + tagsBox.textContent).toContain(
        mockGangCreator.weaknesses[0].tag
      );
      await waitOneTick();
      setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(false);
    });
  });

  describe('with ADJUST_UNIQUE improvement', () => {
    const chopperWithExtraStrengths: Character = {
      ...mockChopper_withName,
      playbookUniques: {
        ...(mockChopper_withName.playbookUniques as PlaybookUniques),
        gang: {
          ...(mockChopper_withName.playbookUniques?.gang as Gang),
          allowedStrengths: 4,
        },
      },
    };
    beforeEach(async () => {
      renderWithRouter(<GangForm />, `/character-creation/${mockGame5.id}`, {
        isAuthenticated: true,
        apolloMocks: [mockPlayBookCreatorQueryChopper],
        injectedGame: generateGame(chopperWithExtraStrengths),
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should rended "increased by improvement" text', () => {
      expect(
        screen.getByText(INCREASED_BY_IMPROVEMENT_TEXT)
      ).toBeInTheDocument();
    });
  });
});
