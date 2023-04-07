import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NewGameIntro from '../NewGameIntro';
import { mockGame1, mockGame5, mockAuth0UserInfo1 } from '../../../tests/mocks';
import { renderWithRouter } from '../../../tests/test-utils';
import { mockCreateCharacter } from '../../../tests/mockQueries';

describe('Rendering NewGameIntro', () => {
  test('should render NewGameIntro with commsApp and commsUrl', async () => {
    renderWithRouter(
      <NewGameIntro />,
      `/character-creation/${mockGame5.id}?step=0`,
      {
        isAuthenticated: true,
        injectedGame: mockGame5,
        apolloMocks: [mockCreateCharacter],
        injectedUserId: mockAuth0UserInfo1.sub,
      }
    );
    await screen.findByRole('heading', { name: 'NEW GAME' });
    let nextButton = screen.getByRole('button', {
      name: 'NEXT',
    }) as HTMLButtonElement;
    const link = screen.getByRole('link', {
      name: mockGame5.commsApp,
    }) as HTMLAnchorElement;
    expect(link.href).toEqual(mockGame5.commsUrl);

    await userEvent.click(nextButton);
    expect(nextButton.disabled).toEqual(false);
  });

  test('should render NewGameIntro with commsApp only', async () => {
    renderWithRouter(
      <NewGameIntro />,
      `/character-creation/${mockGame1.id}?step=0`,
      {
        isAuthenticated: true,
        injectedGame: { ...mockGame1, commsUrl: '' },
        injectedUserId: mockAuth0UserInfo1.sub,
      }
    );
    await screen.findByRole('heading', { name: 'NEW GAME' });
    screen.getByRole('button', { name: 'NEXT' });
  });

  test('should render NewGameIntro with commsUrl only', async () => {
    renderWithRouter(
      <NewGameIntro />,
      `/character-creation/${mockGame1.id}?step=0`,
      {
        isAuthenticated: true,
        injectedGame: { ...mockGame1, commsApp: '' },
        injectedUserId: mockAuth0UserInfo1.sub,
      }
    );
    await screen.findByRole('heading', { name: 'NEW GAME' });
    screen.getByRole('button', { name: 'NEXT' });
    const link = screen.getByRole('link', {
      name: 'here',
    }) as HTMLAnchorElement;
    expect(link.href).toEqual(mockGame1.commsUrl);
  });
});
