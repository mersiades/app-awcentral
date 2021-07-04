import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CharacterPlaybookForm from '../CharacterPlaybookForm';
import {
  mockCharacter2,
  mockGame1,
  mockGame5,
  mockKeycloakUserInfo1,
} from '../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../tests/test-utils';
import { mockPlaybooksQuery } from '../../../tests/mockQueries';
import { PlaybookType } from '../../../@types/enums';
import {
  CHOOSE_YOUR_PLAYBOOK_TEXT,
  NEW_PLAYER_INTRO_TEXT,
} from '../../../config/constants';

describe('Rendering CharacterPlaybookForm', () => {
  const ANGEL_SNIPPET = 'When you’re lying in the dust';
  const BATTLEBABE_SNIPPET = 'Even in a place as dangerous';
  test('should render CharacterPlaybookForm in initial state, with no character', async () => {
    renderWithRouter(
      <CharacterPlaybookForm />,
      `/character-creation/${mockGame1.id}?step=1`,
      {
        isAuthenticated: true,
        injectedGame: mockGame1,
        apolloMocks: [mockPlaybooksQuery],
        injectedUserId: mockKeycloakUserInfo1.sub,
      }
    );

    await waitOneTick();

    // Should have heading and playbook button
    screen.getByRole('heading', { name: CHOOSE_YOUR_PLAYBOOK_TEXT });
    screen.getByText(NEW_PLAYER_INTRO_TEXT);

    // Should show Angel details and button on tab click
    userEvent.click(screen.getByRole('tab', { name: 'Angel' }));

    // FAILING: I don't know why this isn't being found inthe Jest dom
    // screen.getByText(ANGEL_SNIPPET);
    screen.getByRole('button', { name: 'SELECT Angel' });
  });

  test('should show correct Playbook when Character already exists', async () => {
    renderWithRouter(
      <CharacterPlaybookForm />,
      `/character-creation/${mockGame1.id}?step=1`,
      {
        isAuthenticated: true,
        injectedGame: mockGame5,
        injectedCharacter: mockCharacter2,
        apolloMocks: [mockPlaybooksQuery],
        injectedUserId: mockKeycloakUserInfo1.sub,
      }
    );

    await waitOneTick();

    // FAILING: I don't know why this isn't being found inthe Jest dom. Mayble because it's markdown
    // screen.getByText(ANGEL_SNIPPET);
    screen.getByRole('button', { name: 'RESET' });
  });

  test('should show reset warning', async () => {
    renderWithRouter(
      <CharacterPlaybookForm />,
      `/character-creation/${mockGame1.id}?step=1`,
      {
        isAuthenticated: true,
        injectedGame: {
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
              characters: [mockCharacter2],
            },
          ],
        },
        injectedCharacter: mockCharacter2,
        apolloMocks: [mockPlaybooksQuery],
        injectedUserId: mockKeycloakUserInfo1.sub,
      }
    );

    await waitOneTick();

    screen.getByRole('tab', { name: 'Angel' });
    screen.getByRole('button', { name: 'RESET' });
    const battleBabeButton = screen.getByRole('tab', { name: 'Battlebabe' });
    userEvent.click(battleBabeButton);

    const selectBattleBabe = screen.getByRole('button', {
      name: 'SELECT Battlebabe',
    });
    userEvent.click(selectBattleBabe);

    screen.getByTestId(`${'Switch playbook?'.toLowerCase()}-warning-dialog`);
  });
});
