import React from 'react';
import wait from 'waait';
import { MockedResponse } from '@apollo/client/testing';
import { act, screen } from '@testing-library/react';

import GameCreationStepper from '../GameCreationStepper';
import GAME, { GameData } from '../../queries/game';
import { mockGame1 } from '../../tests/mocks';
import { customRenderForComponent } from '../../tests/test-utils';

const mockGameQuery: MockedResponse<GameData> = {
  request: {
    query: GAME,
    variables: { gameId: mockGame1.id },
  },
  result: {
    data: {
      game: { ...mockGame1, commsApp: '', commsUrl: '' },
    },
  },
};
describe('Rendering GameCreationStepper', () => {
  const mockSetCreationStep = jest.fn();
  const mockSetHasSkippedComms = jest.fn();

  beforeEach(async () => {
    customRenderForComponent(
      <GameCreationStepper
        currentStep={0}
        setCreationStep={mockSetCreationStep}
        setHasSkippedComms={mockSetHasSkippedComms}
      />,
      {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery],
        injectedGameId: mockGame1.id,
      }
    );

    await act(async () => await wait());
  });

  test('should render GameCreationStepper in initial state', () => {
    const nameBox = screen.getByTestId('name-box');
    expect(nameBox.textContent).toContain(mockGame1.name);
    const channelBox = screen.getByTestId('channel-box');
    expect(channelBox.textContent).toContain('...');
    const invitationsBox = screen.getByTestId('invitations-box');
    expect(invitationsBox.textContent).toContain('...');
  });
});
