import React from 'react';
import { screen } from '@testing-library/react';
import { InMemoryCache } from '@apollo/client';
import userEvent from '@testing-library/user-event';

import FollowersForm from '../FollowersForm';
import {
  blankCharacter,
  mockCharacter2,
  mockGame5,
  mockAuth0UserInfo1,
} from '../../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../../tests/test-utils';
import { mockPlayBookCreatorQueryHocus } from '../../../../tests/mockQueries';
import { PlaybookUniques } from '../../../../@types/dataInterfaces';
import { mockFollowersCreator } from '../../../../tests/fixtures/playbookUniqueCreatorsFixtures';
import {
  mockPlaybookUniqueHocus,
  mockPlaybookUniqueHocus_with1Improvement,
} from '../../../../tests/fixtures/playBookUniquesFixtures';
import { INCREASED_BY_IMPROVEMENT_TEXT } from '../../../../config/constants';

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

describe('Rendering FollowersForm', () => {
  let cache = new InMemoryCache();

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  describe('with a fresh Followers', () => {
    beforeEach(async () => {
      renderWithRouter(
        <FollowersForm />,
        `/character-creation/${mockGame5.id}`,
        {
          isAuthenticated: true,
          apolloMocks: [mockPlayBookCreatorQueryHocus],
          injectedGame: generateGame(mockPlaybookUniqueHocus),
          injectedUserId: mockAuth0UserInfo1.sub,
          cache,
        }
      );

      await waitOneTick();
    });
    test('should render FollowersForm in initial state', () => {
      screen.getByTestId('followers-form');
      screen.getByRole('heading', {
        name: `${mockCharacter2.name?.toUpperCase()}'S FOLLOWERS`,
      });
      mockFollowersCreator.travelOptions.forEach((opt) =>
        screen.getByRole('checkbox', { name: opt })
      );
      mockFollowersCreator.strengthOptions.forEach((opt) =>
        screen.getByRole('checkbox', { name: opt.description })
      );
      mockFollowersCreator.weaknessOptions.forEach((opt) =>
        screen.getByRole('checkbox', { name: opt.description })
      );
      mockFollowersCreator.characterizationOptions.forEach((opt) =>
        screen.getByTestId(`${opt}-pill`)
      );
      const fortuneValue = screen.getByRole('heading', {
        name: 'fortune-value',
      }) as HTMLHeadingElement;
      expect(fortuneValue.textContent).toContain('1');
      screen.getByRole('button', { name: 'SET' });
    });

    test('should enable SET button after completing the form', () => {
      let setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(true);

      // Select characterization
      const characterization = screen.getByTestId(
        `${mockFollowersCreator.characterizationOptions[0]}-pill`
      );
      userEvent.click(characterization);
      const descriptionBox = screen.getByTestId('description-tags-box');
      expect(descriptionBox.textContent?.toLowerCase()).toContain(
        mockFollowersCreator.characterizationOptions[0]
      );

      // Select travel option
      const travelOption = screen.getByRole('checkbox', {
        name: mockFollowersCreator.travelOptions[0],
      });
      userEvent.click(travelOption);
      expect(descriptionBox.textContent?.toLowerCase()).toContain(
        mockFollowersCreator.travelOptions[0]
      );

      // Select two strengths
      const strength1 = screen.getByRole('checkbox', {
        name: mockFollowersCreator.strengthOptions[0].description,
      });
      const strength2 = screen.getByRole('checkbox', {
        name: mockFollowersCreator.strengthOptions[1].description,
      });
      const surplusBox = screen.getByTestId('surplus-tags-box');
      const wantBox = screen.getByTestId('want-tags-box');
      expect(wantBox.textContent).toContain('Want');
      expect(surplusBox.textContent).toContain('Surplus');
      userEvent.click(strength1);
      expect(surplusBox.textContent).toContain('2');
      expect(wantBox.textContent).toContain('hungry');
      userEvent.click(strength2);
      expect(surplusBox.textContent).toContain('insight');

      // Select two weaknesses
      const weakness1 = screen.getByRole('checkbox', {
        name: mockFollowersCreator.weaknessOptions[0].description,
      });
      const weakness2 = screen.getByRole('checkbox', {
        name: mockFollowersCreator.weaknessOptions[1].description,
      });
      userEvent.click(weakness1);
      expect(surplusBox.textContent).toContain('violence');
      userEvent.click(weakness2);
      expect(surplusBox.textContent).toContain('1');

      // Check SET button is enabled
      setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(false);
    });
  });

  describe('with a Followers with 1 improvement', () => {
    beforeEach(async () => {
      renderWithRouter(
        <FollowersForm />,
        `/character-creation/${mockGame5.id}`,
        {
          isAuthenticated: true,
          apolloMocks: [mockPlayBookCreatorQueryHocus],
          injectedGame: generateGame(mockPlaybookUniqueHocus_with1Improvement),
          injectedUserId: mockAuth0UserInfo1.sub,
          cache,
        }
      );

      await waitOneTick();
    });

    test('should render with increased strength count', () => {
      expect(screen.getByText('Choose 3:')).toBeInTheDocument();
      expect(
        screen.getByText(INCREASED_BY_IMPROVEMENT_TEXT)
      ).toBeInTheDocument();
    });
  });
});
