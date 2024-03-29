import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';

import VehicleForm from '../VehicleForm';
import {
  blankCharacter,
  mockCarCreator,
  mockCharacter2,
  mockGame5,
  mockAuth0UserInfo1,
} from '../../../tests/mocks';
import { renderWithRouter, waitOneTick } from '../../../tests/test-utils';
import { VehicleFrameType } from '../../../@types/enums';
import { mockVehicleCreatorQuery } from '../../../tests/mockQueries';
import { DEFAULT_VEHICLE_NAME } from '../../../config/constants';
import { Game } from '../../../@types/dataInterfaces';

describe('Rendering VehicleForm', () => {
  let cache = new InMemoryCache();

  const mockNavigationOnSet = jest.fn();

  const mockGame: Game = {
    ...mockGame5,
    gameRoles: [
      mockGame5.gameRoles[0],
      mockGame5.gameRoles[1],
      {
        id: mockGame5.gameRoles[2].id,
        role: mockGame5.gameRoles[2].role,
        userId: mockGame5.gameRoles[2].userId,
        npcs: mockGame5.gameRoles[2].npcs,
        gameName: mockGame5.gameRoles[2].gameName,
        gameId: mockGame5.gameRoles[2].gameId,
        threats: mockGame5.gameRoles[2].threats,
        characters: [
          {
            ...blankCharacter,
            id: mockCharacter2.id,
            playbook: mockCharacter2.playbook,
            name: mockCharacter2.name,
            looks: mockCharacter2.looks,
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  test('should render VehicleForm with blank vehicle', async () => {
    renderWithRouter(
      <VehicleForm
        existingVehicle={undefined}
        navigateOnSet={mockNavigationOnSet}
        activeTab={0}
      />,
      `/character-creation/${mockGame5.id}?step=8`,
      {
        isAuthenticated: true,
        apolloMocks: [mockVehicleCreatorQuery],
        injectedGame: mockGame,
        injectedUserId: mockAuth0UserInfo1.sub,
        cache,
      }
    );

    await screen.findByTestId('vehicle-form');
    const setButton = screen.getByRole('button', {
      name: 'SET',
    }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(true);
    const nameInput = screen.getByRole('textbox', {
      name: 'name-input',
    }) as HTMLInputElement;
    expect(nameInput.value).toEqual(DEFAULT_VEHICLE_NAME);
    const frame = screen.getByRole('heading', {
      name: 'frame-value',
    }) as HTMLHeadingElement;
    expect(frame.textContent).toEqual(VehicleFrameType.medium);
    const speed = screen.getByRole('heading', {
      name: 'speed-value',
    }) as HTMLHeadingElement;
    expect(speed.textContent).toEqual('0');
    const handling = screen.getByRole('heading', {
      name: 'handling-value',
    }) as HTMLHeadingElement;
    expect(handling.textContent).toEqual('0');
    const armor = screen.getByRole('heading', {
      name: 'armor-value',
    }) as HTMLHeadingElement;
    expect(armor.textContent).toEqual('0');
    const massive = screen.getByRole('heading', {
      name: 'massive-value',
    }) as HTMLHeadingElement;
    expect(massive.textContent).toEqual('2');
  });

  test.skip('should enable SET button once form is filled in', async () => {
    const vehicleName = 'my-vehicle';
    renderWithRouter(
      <VehicleForm
        existingVehicle={undefined}
        navigateOnSet={mockNavigationOnSet}
        activeTab={0}
      />,
      `/character-creation/${mockGame5.id}?step=9`,
      {
        isAuthenticated: true,
        injectedGame: mockGame,
        apolloMocks: [mockVehicleCreatorQuery],
        injectedUserId: mockAuth0UserInfo1.sub,
        cache,
      }
    );

    await screen.findByTestId('vehicle-form');

    // Enter name for battle vehicle
    const nameInput = screen.getByRole('textbox', {
      name: 'name-input',
    }) as HTMLInputElement;
    nameInput.setSelectionRange(0, DEFAULT_VEHICLE_NAME.length);
    userEvent.type(nameInput, vehicleName);
    expect(nameInput.value).toEqual(vehicleName);

    // Choose vehicle frame
    const largeFramePill = screen.getByTestId(
      `${VehicleFrameType.large.toLowerCase()}-bo-pill`
    );
    await userEvent.click(largeFramePill);
    const frame = screen.getByRole('heading', {
      name: 'frame-value',
    }) as HTMLHeadingElement;
    expect(frame.textContent).toEqual(VehicleFrameType.large);

    // Select a strength
    const strengthPill = screen.getByTestId(
      `${mockCarCreator.strengths[0]}-option-pill`
    );
    await userEvent.click(strengthPill);

    // Select a weakness
    const weaknessPill = screen.getByTestId(
      `${mockCarCreator.weaknesses[0]}-option-pill`
    );
    await userEvent.click(weaknessPill);

    // Select a look
    const lookPill = screen.getByTestId(
      `${mockCarCreator.looks[0]}-option-pill`
    );
    await userEvent.click(lookPill);

    // Select two battle options
    const speedOption = screen.getByTestId(
      `${mockCarCreator.battleOptions[0].name}-pill`
    );
    await userEvent.click(speedOption);
    const speed = screen.getByRole('heading', {
      name: 'speed-value',
    }) as HTMLHeadingElement;
    expect(speed.textContent).toEqual('1');
    const armorOption = screen.getByTestId(
      `${mockCarCreator.battleOptions[3].name}-pill`
    );
    await userEvent.click(armorOption);
    const armor = screen.getByRole('heading', {
      name: 'armor-value',
    }) as HTMLHeadingElement;
    expect(armor.textContent).toEqual('1');

    // Check SET enabled
    const setButton = screen.getByRole('button', {
      name: 'SET',
    }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(false);
  });
});
