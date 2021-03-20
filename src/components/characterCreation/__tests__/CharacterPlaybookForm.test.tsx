import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CharacterPlaybookForm from '../CharacterPlaybookForm';
import { mockCharacter2, mockGame1, mockGame5, mockKeycloakUserInfo1 } from '../../../tests/mocks';
import { renderWithRouter } from '../../../tests/test-utils';
import { mockPlaybooksQuery } from '../../../tests/mockQueries';
import { PlaybookType } from '../../../@types/enums';

jest.setTimeout(10000);

describe('Rendering CharacterPlaybookForm', () => {
  // test('should render CharacterPlaybookForm in initial state, with no character', async () => {
  //   renderWithRouter(<CharacterPlaybookForm />, `/character-creation/${mockGame1.id}?step=1`, {
  //     isAuthenticated: true,
  //     injectedGame: mockGame1,
  //     apolloMocks: [mockPlaybooksQuery],
  //     injectedUserId: mockKeycloakUserInfo1.sub,
  //   });

  //   // Should have heading and playbook button
  //   await screen.findByRole('heading', { name: 'Choose your playbook' });
  //   const angelButton = await screen.findByTestId(`${PlaybookType.angel.toLowerCase()}-button`);

  //   // Should show Angel details and button on button click
  //   userEvent.click(angelButton);
  //   await act(async () => await wait(0));
  //   await screen.findByRole('heading', { name: 'Angel' });
  //   screen.getByRole('button', { name: 'SELECT Angel' });
  // });

  // test('should show correct Playbook when Character already exists', async () => {
  //   renderWithRouter(<CharacterPlaybookForm />, `/character-creation/${mockGame1.id}?step=1`, {
  //     isAuthenticated: true,
  //     injectedGame: mockGame5,
  //     injectedCharacter: mockCharacter2,
  //     apolloMocks: [mockPlaybooksQuery],
  //     injectedUserId: mockKeycloakUserInfo1.sub,
  //   });

  //   await screen.findByRole('heading', { name: 'Angel' });
  //   screen.getByRole('button', { name: 'SELECT Angel' });
  // });

  test('should show reset warning', async () => {
    renderWithRouter(<CharacterPlaybookForm />, `/character-creation/${mockGame1.id}?step=1`, {
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
            npcs: mockGame5.gameRoles[2].npcs,
            threats: mockGame5.gameRoles[2].threats,
            characters: [mockCharacter2],
          },
        ],
      },
      injectedCharacter: mockCharacter2,
      apolloMocks: [mockPlaybooksQuery],
      injectedUserId: mockKeycloakUserInfo1.sub,
    });

    await screen.findByRole('heading', { name: 'Angel' });
    screen.getByRole('button', { name: 'RESET' });
    const battleBabeButton = screen.getByTestId(`${PlaybookType.battlebabe.toLowerCase()}-button`);
    userEvent.click(battleBabeButton);

    await screen.findByRole('heading', { name: 'Battlebabe' });
    const selectBattleBabe = screen.getByRole('button', { name: 'SELECT Battlebabe' });
    userEvent.click(selectBattleBabe);

    screen.getByTestId(`${'Switch playbook?'.toLowerCase()}-warning-dialog`);
  });
});
