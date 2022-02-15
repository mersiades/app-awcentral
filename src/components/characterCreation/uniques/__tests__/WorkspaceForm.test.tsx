import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import WorkspaceForm from '../WorkspaceForm';
import {
  blankCharacter,
  mockCharacter2,
  mockGame5,
  mockAuth0UserInfo1,
} from '../../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../../tests/test-utils';
import { mockPlayBookCreatorQuerySavvyhead } from '../../../../tests/mockQueries';
import { PlaybookUniques } from '../../../../@types/dataInterfaces';
import { mockWorkspaceCreator } from '../../../../tests/fixtures/playbookUniqueCreatorsFixtures';
import { PlaybookType } from '../../../../@types/enums';
import {
  mockPlaybookUniqueSavvyhead,
  mockPlaybookUniqueSavvyhead_withBothImprovements,
  mockPlaybookUniqueSavvyhead_withImprovement,
} from '../../../../tests/fixtures/playBookUniquesFixtures';
import {
  INCREASED_BY_IMPROVEMENT_TEXT,
  INCREASED_BY_IMPROVEMENT_WITH_LIFE_SUPPORT_TEXT,
} from '../../../../config/constants';

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
          playbook: PlaybookType.savvyhead,
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

describe('Rendering WorkspaceForm', () => {
  let cache = new InMemoryCache();

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  describe('with a fresh Workspace', () => {
    beforeEach(async () => {
      renderWithRouter(
        <WorkspaceForm />,
        `/character-creation/${mockGame5.id}`,
        {
          isAuthenticated: true,
          apolloMocks: [mockPlayBookCreatorQuerySavvyhead],
          injectedGame: generateGame(mockPlaybookUniqueSavvyhead),
          injectedUserId: mockAuth0UserInfo1.sub,
          cache,
        }
      );

      await waitOneTick();
    });

    test('should render WorkspaceForm in initial state', () => {
      screen.getByTestId('workspace-form');
      screen.getByRole('heading', {
        name: `${mockCharacter2.name?.toUpperCase()}'S WORKSPACE`,
      });
      screen.getByRole('heading', { name: 'Projects' });
      screen.getByRole;
    });

    test('should enable SET button when form is completed', () => {
      screen.getByTestId('workspace-form');
      let setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      const item1 = screen.getByTestId(
        `${mockWorkspaceCreator.workspaceItems[0]}-pill`
      );
      const item2 = screen.getByTestId(
        `${mockWorkspaceCreator.workspaceItems[1]}-pill`
      );
      const item3 = screen.getByTestId(
        `${mockWorkspaceCreator.workspaceItems[2]}-pill`
      );

      // Select first workspace item
      userEvent.click(item1);

      // Select second workspace item
      userEvent.click(item2);
      setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(true);

      // Select second workspace item
      userEvent.click(item3);
      setButton = screen.getByRole('button', {
        name: 'SET',
      }) as HTMLButtonElement;
      expect(setButton.disabled).toEqual(false);
    });
  });

  describe('with a Workspace with improvement', () => {
    beforeEach(async () => {
      renderWithRouter(
        <WorkspaceForm />,
        `/character-creation/${mockGame5.id}`,
        {
          isAuthenticated: true,
          apolloMocks: [mockPlayBookCreatorQuerySavvyhead],
          injectedGame: generateGame(
            mockPlaybookUniqueSavvyhead_withImprovement
          ),
          injectedUserId: mockAuth0UserInfo1.sub,
          cache,
        }
      );
      await waitOneTick();
    });

    test('should show increased item count', () => {
      expect(screen.getByText('Choose 5:')).toBeInTheDocument();
      expect(
        screen.getByText(INCREASED_BY_IMPROVEMENT_TEXT)
      ).toBeInTheDocument();
    });
  });

  describe('with a Workspace with both improvements', () => {
    beforeEach(async () => {
      renderWithRouter(
        <WorkspaceForm />,
        `/character-creation/${mockGame5.id}`,
        {
          isAuthenticated: true,
          apolloMocks: [mockPlayBookCreatorQuerySavvyhead],
          injectedGame: generateGame(
            mockPlaybookUniqueSavvyhead_withBothImprovements
          ),
          injectedUserId: mockAuth0UserInfo1.sub,
          cache,
        }
      );
      await waitOneTick();
    });

    test('should show increased item count', () => {
      expect(screen.getByText('Choose 5:')).toBeInTheDocument();
      expect(
        screen.getByText(INCREASED_BY_IMPROVEMENT_WITH_LIFE_SUPPORT_TEXT)
      ).toBeInTheDocument();
    });
  });
});
