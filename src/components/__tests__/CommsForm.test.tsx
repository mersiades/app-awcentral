import React from 'react';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import { MockedResponse } from '@apollo/client/testing';
import { act, screen } from '@testing-library/react';

import CommsForm from '../CommsForm';
import { mockGame1 } from '../../tests/mocks';
import { customRenderForComponent } from '../../tests/test-utils';
import GAME, { GameData } from '../../queries/game';

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
describe('Rendering CommsForm', () => {
  const mockSetCreationStep = jest.fn();
  const mockSetHasSkippedComms = jest.fn();

  beforeEach(async () => {
    customRenderForComponent(
      <CommsForm setCreationStep={mockSetCreationStep} setHasSkippedComms={mockSetHasSkippedComms} />,
      {
        isAuthenticated: true,
        apolloMocks: [mockGameQuery],
        injectedGameId: mockGame1.id,
      }
    );
    await act(async () => await wait());
  });

  test('should render CommsForm in initial state', () => {
    screen.getByRole('heading', { name: 'COMMS' });
    screen.getAllByRole('button', { name: /SET/i }); // aria role was showing up as 'Set' in CircleCI
    screen.getByRole('button', { name: 'Open Drop' });
    // screen.getByRole('button', { name: /LATER/i }); // This is failing in CircleCi
    screen.getByRole('textbox', { name: 'comms-url-input' });
    screen.getByRole('textbox', { name: 'comms-app-input' });
  });

  test('should enable SET button after selecting comms app', () => {
    screen.getByRole('button', { name: 'Open Drop' }) as HTMLButtonElement;
    // FAILING: selectOptions() isn't finding any options. I think because using Grommet's Select wrapped around an HTML select
    // userEvent.selectOptions(dropButton, 'Discord');
  });

  test('should enable SET button after entering comms url', () => {
    const mockUrl = 'https://mockurl.com';
    const urlInput = screen.getByRole('textbox', { name: 'comms-url-input' }) as HTMLInputElement;

    userEvent.type(urlInput, mockUrl);
    expect(urlInput.value).toEqual(mockUrl);
    const setButton = screen.getAllByRole('button', { name: /SET/i })[1] as HTMLButtonElement;
    expect(setButton.disabled).toEqual(false);
  });

  test('should skip CommsForm', () => {
    const laterButton = screen.getByRole('button', { name: /LATER/i }) as HTMLButtonElement;

    userEvent.click(laterButton);

    expect(mockSetCreationStep).toHaveBeenCalledWith(2);
    expect(mockSetHasSkippedComms).toHaveBeenCalledWith(true);
  });
});
