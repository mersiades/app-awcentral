import React from 'react';
// import wait from 'waait';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { customRenderForComponent } from '../../../tests/test-utils';
import { mockGame7 } from '../../../tests/mocks';
import GamePanel from '../GamePanel';

describe('Rendering GamePanel', () => {
  test('should render GameBox with complete comms info', async () => {
    const mockHandleShowGameForm = jest.fn();
    const mockSetShowDeleteGameDialog = jest.fn();
    customRenderForComponent(
      <GamePanel
        setShowDeleteGameDialog={mockSetShowDeleteGameDialog}
        handleShowGameForm={mockHandleShowGameForm}
        handleShowInvitationForm={jest.fn()}
        handleRemoveInvitee={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [],
        injectedGame: mockGame7,
      }
    );

    screen.getByRole('heading', { name: mockGame7.name });
    const downChevron = screen.getByTestId(
      `${mockGame7.name.toLowerCase()}-down-chevron`
    );
    const editIcon = screen.getByTestId(
      `${mockGame7.name.toLowerCase()}-edit-link`
    );

    // Check edit link
    await userEvent.click(editIcon);
    expect(mockHandleShowGameForm).toHaveBeenCalledWith({ type: 'GAME_FORM' });
    mockHandleShowGameForm.mockClear();

    // Check can open GameBox
    await userEvent.click(downChevron);
    expect(screen.getByTestId('game-box').textContent).toContain(
      mockGame7.commsApp
    );
    expect(screen.getByTestId('game-box').textContent).toContain(
      mockGame7.commsUrl
    );

    // Check DELETE GAME button
    await userEvent.click(screen.getByRole('button', { name: /DELETE GAME/ }));
    expect(mockSetShowDeleteGameDialog).toHaveBeenCalledWith(true);

    // Check can close GameBox
    await userEvent.click(
      screen.getByTestId(`${mockGame7.name.toLowerCase()}-up-chevron`)
    );
  });

  test('should render GameBox with comms url only', async () => {
    customRenderForComponent(
      <GamePanel
        setShowDeleteGameDialog={jest.fn()}
        handleShowGameForm={jest.fn()}
        handleShowInvitationForm={jest.fn()}
        handleRemoveInvitee={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [],
        injectedGame: { ...mockGame7, commsApp: '' },
      }
    );

    // Check comms Url only
    await userEvent.click(
      screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`)
    );
    expect(screen.getByTestId('game-box').textContent).not.toContain(
      mockGame7.commsApp
    );
    expect(screen.getByTestId('game-box').textContent).toContain(
      mockGame7.commsUrl
    );
  });

  test('should render GameBox with comms app only', async () => {
    customRenderForComponent(
      <GamePanel
        setShowDeleteGameDialog={jest.fn()}
        handleShowGameForm={jest.fn()}
        handleShowInvitationForm={jest.fn()}
        handleRemoveInvitee={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [],
        injectedGame: { ...mockGame7, commsUrl: '' },
      }
    );
    // Check comms app only
    await userEvent.click(
      screen.getByTestId(`${mockGame7.name.toLowerCase()}-down-chevron`)
    );
    expect(screen.getByTestId('game-box').textContent).toContain(
      mockGame7.commsApp
    );
    expect(screen.getByTestId('game-box').textContent).not.toContain(
      mockGame7.commsUrl
    );
  });

  test('should render InvitationsBox with no invitations', async () => {
    const mockhandleShowInvitationForm = jest.fn();
    customRenderForComponent(
      <GamePanel
        setShowDeleteGameDialog={jest.fn()}
        handleShowGameForm={jest.fn()}
        handleShowInvitationForm={mockhandleShowInvitationForm}
        handleRemoveInvitee={jest.fn()}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [],
        injectedGame: mockGame7,
      }
    );

    screen.getByRole('heading', { name: /Invitations/ });

    expect(screen.getByTestId('invitations-box').textContent).toContain(
      'No pending invitations'
    );

    // Check INVITE PLAYER button
    await userEvent.click(screen.getByRole('button', { name: /INVITE PLAYER/ }));
    expect(mockhandleShowInvitationForm).toHaveBeenCalledWith({
      type: 'INVITATION_FORM',
      existingEmail: '',
      showMessageOnly: false,
    });
    mockhandleShowInvitationForm.mockClear();
  });

  test('should render InvitationsBox with 2 invitations', async () => {
    const mockhandleShowInvitationForm = jest.fn();
    const mockHandleRemoveInvitee = jest.fn();
    customRenderForComponent(
      <GamePanel
        setShowDeleteGameDialog={jest.fn()}
        handleShowGameForm={jest.fn()}
        handleShowInvitationForm={mockhandleShowInvitationForm}
        handleRemoveInvitee={mockHandleRemoveInvitee}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [],
        injectedGame: {
          ...mockGame7,
          invitees: ['john@email.com', 'maya@email.com'],
        },
      }
    );

    screen.getByRole('heading', { name: /Invitations/ });

    expect(screen.getByTestId('invitations-box').textContent).toContain(
      'john@email.com'
    );
    expect(screen.getByTestId('invitations-box').textContent).toContain(
      'maya@email.com'
    );

    // Check show invitation when click on invitee
    await userEvent.click(screen.getByTestId('john@email.com-list-item'));
    expect(mockhandleShowInvitationForm).toHaveBeenCalledWith({
      type: 'INVITATION_FORM',
      existingEmail: 'john@email.com',
      showMessageOnly: true,
    });

    // Check delete invitation
    await userEvent.click(screen.getByTestId('john@email.com-trash-icon'));
    expect(mockHandleRemoveInvitee).toHaveBeenCalledWith('john@email.com');
  });
});
