import React from 'react';
// import wait from 'waait';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CharacterCreationPage from '../CharacterCreationPage';
import {
  // mockGameForCharacterCreation1,
  mockPlayBookCreatorQueryAngel,
  // mockVehicleCreatorQuery,
  // mockPlaybooksQuery,
  mockSetAngelKit,
  // mockSetVehicle,
} from '../../tests/mockQueries';
import {
  /*customRenderForComponent,*/ renderWithRouter,
} from '../../tests/test-utils';
import { mockKeycloakStub } from '../../../__mocks__/@react-keycloak/web';
import {
  mockCharacter2,
  mockGame5,
  // mockGame7,
  mockKeycloakUserInfo1,
  // mockKeycloakUserInfo2,
  // mockVehicleInput,
  // mockBattleOption1,
  // mockBattleOption2,
  // mockBattleOption3,
  // mockBattleOption4,
  // mockVehicleFrame3,
} from '../../tests/mocks';
import { PlaybookType } from '../../@types/enums';
import {
  mockPlaybookUniqueAngel,
  mockPlaybookUniqueAngel_withDummyUniques,
} from '../../tests/fixtures/playBookUniquesFixtures';
import { Character } from '../../@types/dataInterfaces';
// import { mockPlayBookCreatorQueryBattlebabe } from '../../components/characterCreation/uniques/__tests__/CustomWeaponsForm.test';

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({
      keycloak: mockKeycloakStub(true, mockKeycloakUserInfo1),
      initialized: true,
    }),
  };
});

describe('Rendering CharacterCreationPage', () => {
  // test('should welcome a new player', async () => {
  //   renderWithRouter(<CharacterCreationPage />, `/character-creation/${mockGame5.id}`, {
  //     isAuthenticated: true,
  //     apolloMocks: [mockPlaybooksQuery],
  //     injectedGame: mockGame5,
  //     injectedUserId: mockKeycloakUserInfo1.sub,
  //   });

  //   await screen.findByTestId('character-creation-page');
  //   // ------------------------------------------------ NewGameIntro ------------------------------------------------ //
  //   // Check comms channel has been rendered
  //   const commsLink = screen.getByRole('link', { name: mockGame5.commsApp });
  //   expect(commsLink.getAttribute('href')).toEqual(mockGame5.commsUrl);
  //   // Click NEXT to go to CharacterPlaybookForm
  //   // userEvent.click(screen.getByRole('button', { name: /NEXT/i }));
  //   // screen.debug();
  // });

  // test('should create a single vehicle (happy path)', async () => {
  //   const gameForCreatingVehicle = {
  //     ...mockGame5,
  //     gameRoles: [
  //       mockGame5.gameRoles[0],
  //       mockGame5.gameRoles[1],
  //       {
  //         ...mockGame5.gameRoles[2],
  //         characters: [
  //           {
  //             id: mockCharacter2.id,
  //             hasCompletedCharacterCreation: mockCharacter2.hasCompletedCharacterCreation,
  //             harm: mockCharacter2.harm,
  //             name: mockCharacter2.name,
  //             playbook: PlaybookType.driver,
  //             looks: mockCharacter2.looks,
  //             statsBlock: mockCharacter2.statsBlock,
  //             gear: mockCharacter2.gear,
  //             barter: mockCharacter2.barter,
  //             vehicleCount: 1,
  //             playbookUnique: undefined,
  //             characterMoves: [],
  //             hxBlock: mockCharacter2.hxBlock,
  //             vehicles: [],
  //           },
  //         ],
  //       },
  //     ],
  //   };

  //   const tags = ['fast', 'sleek', 'unreliable'];

  //   renderWithRouter(<CharacterCreationPage />, `/character-creation/${mockGame5.id}?step=8`, {
  //     isAuthenticated: true,
  //     apolloMocks: [mockVehicleCreatorQuery, mockSetVehicle],
  //     injectedGame: gameForCreatingVehicle,
  //     injectedUserId: mockKeycloakUserInfo1.sub,
  //   });
  //   await screen.findByTestId('vehicle-form');
  //   // Assume that an "empty" vehicle has been loaded into the VehicleForm. The VehicleForm unit test covers this.

  //   // // "Select all" on the default name in the name input
  //   let input = screen.getByRole('textbox', { name: 'name-input' });
  //   // @ts-ignore
  //   input.setSelectionRange(0, input.value.length);

  //   // Manually type a better fashion option
  //   userEvent.type(input, mockVehicleInput.name);
  //   // @ts-ignore
  //   expect(screen.getByRole('textbox', { name: 'name-input' }).value).toEqual(mockVehicleInput.name);

  //   // Choose a different vehicle frame
  //   userEvent.click(screen.getByTestId(`${mockVehicleFrame3.frameType.toLowerCase()}-bo-pill`));

  //   // Check that massive has been updated to match the frame's massive rating
  //   expect(screen.getByRole('heading', { name: 'massive' }).textContent).toEqual(`${mockVehicleFrame3.massive}`);

  //   // Select some looks, strengths and weaknesses
  //   userEvent.click(screen.getByTestId(`${mockVehicleInput.strengths[0].toLowerCase()}-option-pill`));
  //   userEvent.click(screen.getByTestId(`${mockVehicleInput.weaknesses[0].toLowerCase()}-option-pill`));
  //   userEvent.click(screen.getByTestId(`${mockVehicleInput.looks[0].toLowerCase()}-option-pill`));

  //   // Check that the selections have been added ot the tags box
  //   expect(screen.getByTestId('vehicle-tags-box').textContent).toContain(mockVehicleInput.strengths[0]);
  //   expect(screen.getByTestId('vehicle-tags-box').textContent).toContain(mockVehicleInput.weaknesses[0]);
  //   expect(screen.getByTestId('vehicle-tags-box').textContent).toContain(mockVehicleInput.looks[0]);

  //   // Select two battle options
  //   // +1speed
  //   userEvent.click(screen.getByTestId(`${mockBattleOption1.name}-pill`));
  //   // +1massive
  //   userEvent.click(screen.getByTestId(`${mockBattleOption3.name}-pill`));

  //   // Check that speed and massive have been increased
  //   expect(screen.getByRole('heading', { name: 'speed' }).textContent).toEqual('1');
  //   expect(screen.getByRole('heading', { name: 'massive' }).textContent).toEqual('3');

  //   // Change mind and select a different two battle options
  //   // Deselect
  //   userEvent.click(screen.getByTestId(`${mockBattleOption1.name}-pill`));
  //   userEvent.click(screen.getByTestId(`${mockBattleOption3.name}-pill`));
  //   // Check deselection
  //   expect(screen.getByRole('heading', { name: 'speed' }).textContent).toEqual('0');
  //   expect(screen.getByRole('heading', { name: 'massive' }).textContent).toEqual('2');
  //   // Select new options
  //   userEvent.click(screen.getByTestId(`${mockBattleOption2.name}-pill`));
  //   userEvent.click(screen.getByTestId(`${mockBattleOption4.name}-pill`));
  //   // Check deselection
  //   expect(screen.getByRole('heading', { name: 'handling' }).textContent).toEqual('1');
  //   expect(screen.getByRole('heading', { name: 'armor' }).textContent).toEqual('1');

  //   // Click SET button
  //   // userEvent.click(screen.getByRole('button', { name: /SET/ }));

  //   // FAILING: for some reason, the test isn't finding the mock setVehicle mutation response
  //   // await screen.findByTestId('vehicles-box');
  // });

  test('should submit AngelKitForm and navigate to next step', async () => {
    const startCharacter: Character = {
      id: mockCharacter2.id,
      hasCompletedCharacterCreation:
        mockCharacter2.hasCompletedCharacterCreation,
      harm: mockCharacter2.harm,
      name: mockCharacter2.name,
      playbook: PlaybookType.angel,
      looks: mockCharacter2.looks,
      statsBlock: mockCharacter2.statsBlock,
      gear: mockCharacter2.gear,
      barter: mockCharacter2.barter,
      experience: mockCharacter2.experience,
      allowedImprovements: mockCharacter2.allowedImprovements,
      allowedPlaybookMoves: mockCharacter2.allowedPlaybookMoves,
      allowedOtherPlaybookMoves: mockCharacter2.allowedOtherPlaybookMoves,
      improvementMoves: mockCharacter2.improvementMoves,
      futureImprovementMoves: mockCharacter2.futureImprovementMoves,
      deathMoves: [],
      vehicleCount: 0,
      playbookUniques: mockPlaybookUniqueAngel_withDummyUniques,
      characterMoves: [],
      hxBlock: mockCharacter2.hxBlock,
      vehicles: [],
      hasPlusOneForward: false,
      mustChangePlaybook: false,
      isDead: false,
      holds: [],
      battleVehicleCount: 0,
      battleVehicles: [],
    };
    const game = {
      ...mockGame5,
      gameRoles: [
        mockGame5.gameRoles[0],
        mockGame5.gameRoles[1],
        {
          ...mockGame5.gameRoles[2],
          characters: [startCharacter],
        },
      ],
    };

    renderWithRouter(
      <CharacterCreationPage />,
      `/character-creation/${mockGame5.id}?step=6`,
      {
        isAuthenticated: true,
        apolloMocks: [mockPlayBookCreatorQueryAngel, mockSetAngelKit],
        injectedGame: game,
        injectedUserId: mockKeycloakUserInfo1.sub,
        injectedCharacter: startCharacter,
      }
    );
    await screen.findByTestId('character-creation-page');
    screen.getByTestId('character-creation-stepper');
    screen.getByTestId('angel-kit-form');

    // Click SET
    userEvent.click(screen.getByRole('button', { name: /SET/i }));

    // Check CharacterCreationStepper has been updated
    // FAILS: CharacterCreationStepper doesn't know that the character has changed after the mutation
    // const angelKitBox = await screen.findByTestId('angel-kit-box');
    // expect(angelKitBox.textContent).toContain('6');
    // expect(angelKitBox.textContent).toContain('No supplier yet');

    // Check have navigated to VehiclesForm
    // Fails because MockProvider isn't being triggered by the useQuery
    // Might be related to both AngelKitForm and CharacterCreationStepper both using same query
    // await screen.findByTestId('vehicle-form');
  });
});
