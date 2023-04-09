import React from 'react';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { screen } from '@testing-library/react';

import BattleVehicleForm from '../BattleVehicleForm';
import {
  blankCharacter,
  mockBattleVehicleCreator,
  mockCarCreator,
  mockCharacter2,
  mockGame5,
  mockAuth0UserInfo1,
  mockVehicleCreator,
} from '../../../tests/mocks';
import { renderWithRouter } from '../../../tests/test-utils';
import { mockMcContentQuery, mockVehicleCreatorQuery } from '../../../tests/mockQueries';
import { VehicleFrameType } from '../../../@types/enums';
import { DEFAULT_VEHICLE_NAME } from '../../../config/constants';

describe('Rendering BattleVehicleForm', () => {
  let cache = new InMemoryCache();

  const mockNavigationOnSet = jest.fn();

  const mockGame = {
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
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    cache = new InMemoryCache();
  });

  test('should render BattleVehicleForm with blank vehicle', async () => {
    renderWithRouter(
      <BattleVehicleForm
        existingVehicle={undefined}
        navigateOnSet={mockNavigationOnSet}
      />,
      `/character-creation/${mockGame5.id}?step=9`,
      {
        isAuthenticated: true,
        injectedGame: mockGame,
        apolloMocks: [mockVehicleCreatorQuery, mockMcContentQuery],
        injectedUserId: mockAuth0UserInfo1.sub,
        cache,
      }
    );

    await screen.findByTestId('battle-vehicle-form');
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
    expect(screen.getAllByRole('checkbox').length).toEqual(
      mockVehicleCreator.battleVehicleCreator.battleVehicleOptions.length
    );
  });

  test('should enable SET button once form is filled in', async () => {
    const vehicleName = 'my-battle-vehicle';
    renderWithRouter(
      <BattleVehicleForm
        existingVehicle={undefined}
        navigateOnSet={mockNavigationOnSet}
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

    await screen.findByTestId('battle-vehicle-form');

    // Enter name for battle vehicle
    const nameInput = screen.getByRole('textbox', {
      name: 'name-input',
    }) as HTMLInputElement;

    await userEvent.clear(nameInput)
    expect(nameInput.value).toEqual("");
    await userEvent.type(nameInput, vehicleName);
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

    // Select two battle vehicle options
    const handlingOption = screen.getByRole('checkbox', {
      name: mockBattleVehicleCreator.battleVehicleOptions[1].name,
    });
    await userEvent.click(handlingOption);
    const handling = screen.getByRole('heading', {
      name: 'handling-value',
    }) as HTMLHeadingElement;
    expect(handling.textContent).toEqual('1');
    const machineGunsOption = screen.getByRole('checkbox', {
      name: mockBattleVehicleCreator.battleVehicleOptions[4].name,
    });
    await userEvent.click(machineGunsOption);

    // Check SET enabled
    const setButton = screen.getByRole('button', {
      name: 'SET',
    }) as HTMLButtonElement;
    expect(setButton.disabled).toEqual(false);
  });
});
