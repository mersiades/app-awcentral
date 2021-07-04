import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import HoldingForm from '../HoldingForm';
import { mockKeycloakStub } from '../../../../../__mocks__/@react-keycloak/web';
import {
  blankCharacter,
  mockCharacter2,
  mockGame5,
  mockKeycloakUserInfo1,
} from '../../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../../tests/test-utils';
import { mockPlayBookCreatorQueryHardHolder } from '../../../../tests/mockQueries';
import { Game, PlaybookUniques } from '../../../../@types/dataInterfaces';
import {
  mockHoldingCreator,
  holdingOption1,
} from '../../../../tests/fixtures/playbookUniqueCreatorsFixtures';
import {
  mockHolding_noSelectionsMade,
  mockPlaybookUniqueHardHolder,
  mockPlaybookUniqueHardHolder_with3Improvements,
} from '../../../../tests/fixtures/playBookUniquesFixtures';
import { PlaybookType } from '../../../../@types/enums';
import {
  DECREASED_BY_IMPROVEMENT_TEXT,
  INCREASED_BY_IMPROVEMENT_TEXT,
} from '../../../../config/constants';

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

const generateGame = (playbookUniques: PlaybookUniques) => ({
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
          playbook: PlaybookType.hardholder,
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

describe('Rendering HoldingForm', () => {
  let cache = new InMemoryCache();

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  describe('with a fresh Holding', () => {
    beforeEach(async () => {
      renderWithRouter(<HoldingForm />, `/character-creation/${mockGame5.id}`, {
        isAuthenticated: true,
        apolloMocks: [mockPlayBookCreatorQueryHardHolder],
        injectedGame: generateGame(mockPlaybookUniqueHardHolder),
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should render HoldingForm in intial state', () => {
      screen.getByTestId('holding-form');
      screen.getByRole('heading', {
        name: `${mockCharacter2.name?.toUpperCase()}'S HOLDING`,
      });
      const holdingSize = screen.getByRole('heading', {
        name: 'holding size-value',
      });
      expect(holdingSize.textContent).toEqual(
        mockHolding_noSelectionsMade.holdingSize
      );
      const gangSize = screen.getByRole('heading', { name: 'gang size-value' });
      expect(gangSize.textContent).toEqual(
        mockHolding_noSelectionsMade.gangSize
      );
      const surplusValue = screen.getByRole('heading', {
        name: 'surplus-value',
      });
      expect(surplusValue.textContent).toContain(
        mockHolding_noSelectionsMade.surplus.toString()
      );
      const defenseBonusValue = screen.getByRole('heading', {
        name: 'defense bonus-value',
      });
      expect(defenseBonusValue.textContent).toContain(
        mockHolding_noSelectionsMade.gangDefenseArmorBonus.toString()
      );
      const harmValue = screen.getByRole('heading', { name: 'harm-value' });
      expect(harmValue.textContent).toEqual(
        mockHolding_noSelectionsMade.gangHarm.toString()
      );
      const armorValue = screen.getByRole('heading', { name: 'armor-value' });
      expect(armorValue.textContent).toEqual(
        mockHolding_noSelectionsMade.gangArmor.toString()
      );
      const checkBoxes = screen.getAllByRole('checkbox');
      expect(checkBoxes.length).toEqual(6);
      screen.getByRole('button', { name: 'SET' });
    });

    test('should enable SET button when form is complete', () => {
      let setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      const strength1 = screen.getByRole('checkbox', {
        name: mockHoldingCreator.strengthOptions[0].description,
      });
      const strength2 = screen.getByRole('checkbox', {
        name: mockHoldingCreator.strengthOptions[1].description,
      });
      const strength3 = screen.getByRole('checkbox', {
        name: mockHoldingCreator.strengthOptions[2].description,
      });
      const strength4 = screen.getByRole('checkbox', {
        name: mockHoldingCreator.strengthOptions[3].description,
      });
      const weakness1 = screen.getByRole('checkbox', {
        name: mockHoldingCreator.weaknessOptions[0].description,
      });
      const weakness2 = screen.getByRole('checkbox', {
        name: mockHoldingCreator.weaknessOptions[1].description,
      });

      // Select first strength
      userEvent.click(strength1);
      const holdingSizeBox = screen.getByRole('heading', {
        name: 'holding size-value',
      });
      expect(holdingSizeBox.textContent).toEqual(holdingOption1.newHoldingSize);
      const wantsBox = screen.getByTestId('wants-tags-box');
      expect(wantsBox.textContent).toContain('disease');

      // Select second strength
      userEvent.click(strength2);
      const surplusValue = screen.getByRole('heading', {
        name: 'surplus-value',
      });
      expect(surplusValue.textContent).toContain('3');
      expect(wantsBox.textContent).toContain('strangers');
      const gigsBox = screen.getByTestId('gigs-tags-box');
      expect(gigsBox.textContent).toContain('market commons');

      // Select third strength
      userEvent.click(strength3);
      const tagsBox = screen.getByTestId('tags-tags-box');
      expect(tagsBox.textContent).toEqual('Tags');

      // Select fourth strength
      userEvent.click(strength4);
      const harmValue = screen.getByRole('heading', { name: 'harm-value' });
      expect(harmValue.textContent).toEqual('3');
      setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(true);

      // Select first weakness
      userEvent.click(weakness1);
      expect(surplusValue.textContent).toContain('2');
      expect(wantsBox.textContent).toContain('savagery');

      // Select second weakness
      userEvent.click(weakness2);
      // No screen updates to check for with weakness2 (it updates vehicle counts)

      // Check SET button is enabled
      setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(false);
    });
  });

  describe('with a Holding with three improvements', () => {
    beforeEach(async () => {
      renderWithRouter(<HoldingForm />, `/character-creation/${mockGame5.id}`, {
        isAuthenticated: true,
        apolloMocks: [mockPlayBookCreatorQueryHardHolder],
        injectedGame: generateGame(
          mockPlaybookUniqueHardHolder_with3Improvements
        ),
        injectedUserId: mockKeycloakUserInfo1.sub,
        cache,
      });

      await waitOneTick();
    });

    test('should render with adjusted strength and weakness counts', () => {
      expect(screen.getByText('Then, choose 6:')).toBeInTheDocument();
      expect(screen.getByText('And choose 1:')).toBeInTheDocument();
      expect(
        screen.getByText(INCREASED_BY_IMPROVEMENT_TEXT)
      ).toBeInTheDocument();
      expect(
        screen.getByText(DECREASED_BY_IMPROVEMENT_TEXT)
      ).toBeInTheDocument();
    });
  });
});
