import { MockedResponse } from '@apollo/client/testing';
import { GameRole } from '../@types/dataInterfaces';
import { PlaybookType, RoleType, StatType } from '../@types/enums';
import ADD_COMMS_APP, { AddCommsAppData } from '../mutations/addCommsApp';
import ADD_COMMS_URL, { AddCommsUrlData } from '../mutations/addCommsUrl';
import ADD_INVITEE, { AddInviteeData } from '../mutations/addInvitee';
import ADD_USER_TO_GAME from '../mutations/addUserToGame';
import ADJUST_CHARACTER_HX, {
  getAdjustCharacterHxOR,
} from '../mutations/adjustCharacterHx';
import CREATE_CHARACTER from '../mutations/createCharacter';
import CREATE_GAME, { CreateGameData } from '../mutations/createGame';
import DELETE_GAME from '../mutations/deleteGame';
import FINISH_CHARACTER_CREATION from '../mutations/finishCharacterCreation';
import FINISH_PRE_GAME from '../mutations/finishPreGame';
import REMOVE_INVITEE from '../mutations/removeInvitee';
import SET_ANGEL_KIT from '../mutations/setAngelKit';
import SET_BATTLE_VEHICLE_COUNT from '../mutations/setBattleVehicleCount';
import SET_CHARACTER_BARTER from '../mutations/setCharacterBarter';
import SET_CHARACTER_GEAR from '../mutations/setCharacterGear';
import SET_CHARACTER_HX from '../mutations/setCharacterHx';
import SET_CHARACTER_LOOK from '../mutations/setCharacterLook';
import SET_CHARACTER_MOVES from '../mutations/setCharacterMoves';
import SET_CHARACTER_NAME from '../mutations/setCharacterName';
import SET_CHARACTER_PLAYBOOK from '../mutations/setCharacterPlaybook';
import SET_CHARACTER_STATS from '../mutations/setCharacterStats';
import SET_GAME_NAME from '../mutations/setGameName';
import SET_VEHICLE from '../mutations/setVehicle';
import SET_VEHICLE_COUNT from '../mutations/setVehicleCount';
import TOGGLE_STAT_HIGHLIGHT from '../mutations/toggleStatHighlight';
import ALL_MOVES from '../queries/allMoves';
import GAME, { GameData } from '../queries/game';
import GAMEROLES_BY_USER_ID, {
  GameRolesByUserIdData,
} from '../queries/gameRolesByUserId';
import GAMES_FOR_INVITEE from '../queries/gamesForInvitee';
import MC_CONTENT from '../queries/mcContent';
import PLAYBOOK from '../queries/playbook';
import PLAYBOOK_CREATOR, {
  PlaybookCreatorData,
} from '../queries/playbookCreator';
import PLAYBOOKS from '../queries/playbooks';
import VEHICLE_CREATOR from '../queries/vehicleCreator';
import { dummyAngelKitMove } from './fixtures/dummyData';
import {
  mockPlaybookCreatorBrainer,
  mockPlaybookCreatorMaestroD,
  mockPlaybookCreatorHocus,
  mockPlaybookCreatorChopper,
  mockPlaybookCreatorHardHolder,
  mockPlaybookCreatorSkinner,
  mockPlaybookCreatorGunlugger,
  mockPlaybookCreatorSavvyhead,
} from './fixtures/playbookCreatorFixtures';
import { mockStatsBlockWithHighlight } from './fixtures/statsBlockFixtures';
import {
  mockAllMovesArray,
  mockCharacter2,
  mockGame1,
  mockGame2,
  mockGame3,
  mockGame4,
  mockGame5,
  mockGame6,
  mockGame7,
  mockGameRole1,
  mockGameRole2,
  mockHxInput,
  mockKeycloakUser1,
  mockKeycloakUser2,
  mockNewGameName,
  mockVehicleInput,
  mockPlaybookAngel,
  mockPlaybookCreatorAngel,
  mockPlaybooks,
  mockVehicleCreator,
  mockMcContent,
} from './mocks';

export const mockGameRolesByUserId: MockedResponse<GameRolesByUserIdData> = {
  request: {
    query: GAMEROLES_BY_USER_ID,
    variables: { id: mockKeycloakUser1.id },
  },
  result: {
    data: {
      gameRolesByUserId: [
        {
          id: mockGameRole1.id,
          role: mockGameRole1.role,
          gameId: mockGame1.id,
          gameName: mockGame1.name,
          characters: [],
          __typename: 'GameRole',
        },
        {
          id: mockGameRole2.id,
          role: mockGameRole2.role,
          gameId: mockGame1.id,
          gameName: mockGame1.name,
          characters: [],
          __typename: 'GameRole',
        },
      ],
    },
  },
};

export const mockCreateGame: MockedResponse<CreateGameData> = {
  request: {
    query: CREATE_GAME,
    variables: {
      userId: mockKeycloakUser1.id,
      name: mockNewGameName,
      displayName: mockKeycloakUser1.username,
      email: mockKeycloakUser1.email,
    },
  },
  result: {
    data: {
      createGame: {
        id: mockGame3.id,
        name: mockGame3.name,
        mc: mockGame3.mc,
        players: mockGame3.players,
        gameRoles: [
          {
            id: mockGame3.gameRoles[0].id,
            role: mockGame3.gameRoles[0].role,
            __typename: 'GameRole',
          },
        ],
        __typename: 'Game',
      },
    },
  },
};

export const mockGameForCharacterCreation1: MockedResponse = {
  request: {
    query: GAME,
    variables: { gameId: mockGame5.id },
  },
  result: () => {
    // console.log('mockGameForCharacterCreation1');
    return {
      data: {
        game: {
          id: mockGame5.id,
          name: mockGame5.name,
          invitees: [],
          commsApp: mockGame5.commsApp,
          commsUrl: mockGame5.commsUrl,
          hasFinishedPreGame: mockGame5.hasFinishedPreGame,
          mc: mockGame5.mc,
          players: mockGame5.players,
          gameRoles: mockGame5.gameRoles,
        },
      },
    };
  },
};

export const mockPlaybooksQuery: MockedResponse = {
  request: {
    query: PLAYBOOKS,
  },
  result: () => {
    // console.log('mockPlaybooksQuery');
    return {
      data: {
        playbooks: mockPlaybooks,
      },
    };
  },
};

export const mockCreateCharacter: MockedResponse = {
  request: {
    query: CREATE_CHARACTER,
    variables: { gameRoleId: mockGame5.gameRoles[2].id },
  },
  result: () => {
    // console.log('mockCreateCharacter');
    return {
      data: {
        createCharacter: {
          id: mockCharacter2.id,
        },
      },
    };
  },
};

export const mockPlaybookCreator: MockedResponse<PlaybookCreatorData> = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.angel },
  },
  result: () => {
    // console.log('mockPlaybookCreator');
    return {
      data: {
        __typename: 'PlaybookCreator',
        playbookCreator: mockPlaybookCreatorAngel,
      },
    };
  },
};

// ----------------------------- CharacterLooksForm -------------------------------- //

export const mockSetCharacterLook1: MockedResponse = {
  request: {
    query: SET_CHARACTER_LOOK,
    variables: {
      gameRoleId: mockGame5.gameRoles[2].id,
      characterId: mockCharacter2.id,
      look: {
        id: 'mock-angel-look-id-1',
        look: 'man',
        category: 'GENDER',
        playbookType: 'ANGEL',
      },
    },
  },
  result: () => {
    // console.log('mockSetCharacterLook1');
    return {
      data: {
        setCharacterLook: {
          id: mockCharacter2.id,
          playbook: mockCharacter2.playbook,
          name: mockCharacter2.name,
          looks: [mockCharacter2.looks[0]],
        },
      },
    };
  },
};

export const mockSetCharacterLook2: MockedResponse = {
  request: {
    query: SET_CHARACTER_LOOK,
    variables: {
      gameRoleId: mockGame5.gameRoles[2].id,
      characterId: mockCharacter2.id,
      look: {
        id: 'mock-angel-look-id-3',
        look: 'utility wear',
        category: 'CLOTHES',
        playbookType: 'ANGEL',
      },
    },
  },
  result: () => {
    // console.log('mockSetCharacterLook2');
    return {
      data: {
        setCharacterLook: {
          id: mockCharacter2.id,
          playbook: mockCharacter2.playbook,
          name: mockCharacter2.name,
          looks: [mockCharacter2.looks[0], mockCharacter2.looks[1]],
        },
      },
    };
  },
};

export const mockSetCharacterLook3: MockedResponse = {
  request: {
    query: SET_CHARACTER_LOOK,
    variables: {
      gameRoleId: mockGame5.gameRoles[2].id,
      characterId: mockCharacter2.id,
      look: {
        id: 'mock-angel-look-id-5',
        look: 'kind face',
        category: 'FACE',
        playbookType: 'ANGEL',
      },
    },
  },
  result: () => {
    // console.log('mockSetCharacterLook3');
    return {
      data: {
        setCharacterLook: {
          id: mockCharacter2.id,
          playbook: mockCharacter2.playbook,
          name: mockCharacter2.name,
          looks: [
            mockCharacter2.looks[0],
            mockCharacter2.looks[1],
            mockCharacter2.looks[2],
          ],
        },
      },
    };
  },
};

export const mockSetCharacterLook4: MockedResponse = {
  request: {
    query: SET_CHARACTER_LOOK,
    variables: {
      gameRoleId: mockGame5.gameRoles[2].id,
      characterId: mockCharacter2.id,
      look: {
        id: 'mock-angel-look-id-7',
        look: 'hard eyes',
        category: 'EYES',
        playbookType: 'ANGEL',
      },
    },
  },
  result: () => {
    // console.log('mockSetCharacterLook4');
    return {
      data: {
        setCharacterLook: {
          id: mockCharacter2.id,
          playbook: mockCharacter2.playbook,
          name: mockCharacter2.name,
          looks: [
            mockCharacter2.looks[0],
            mockCharacter2.looks[1],
            mockCharacter2.looks[2],
            mockCharacter2.looks[3],
          ],
        },
      },
    };
  },
};

export const mockSetCharacterLook5: MockedResponse = {
  request: {
    query: SET_CHARACTER_LOOK,
    variables: {
      gameRoleId: mockGame5.gameRoles[2].id,
      characterId: mockCharacter2.id,
      look: {
        id: 'mock-angel-look-id-9',
        look: 'compact body',
        category: 'BODY',
        playbookType: 'ANGEL',
      },
    },
  },
  result: () => {
    // console.log('mockSetCharacterLook5');
    return {
      data: {
        setCharacterLook: {
          id: mockCharacter2.id,
          playbook: mockCharacter2.playbook,
          name: mockCharacter2.name,
          looks: [
            mockCharacter2.looks[0],
            mockCharacter2.looks[1],
            mockCharacter2.looks[2],
            mockCharacter2.looks[3],
            mockCharacter2.looks[4],
          ],
        },
      },
    };
  },
};

export const mockSetCharacterLook6: MockedResponse = {
  request: {
    query: SET_CHARACTER_LOOK,
    variables: {
      gameRoleId: mockGame5.gameRoles[2].id,
      characterId: mockCharacter2.id,
      look: {
        // No id for a custom Look
        look: 'man',
        category: 'GENDER',
        playbookType: 'ANGEL',
      },
    },
  },
  result: () => {
    // console.log('mockSetCharacterLook6');
    return {
      data: {
        setCharacterLook: {
          id: mockCharacter2.id,
          playbook: mockCharacter2.playbook,
          name: mockCharacter2.name,
          looks: [mockCharacter2.looks[0]],
        },
      },
    };
  },
};

export const mockSetAngelKit: MockedResponse = {
  request: {
    query: SET_ANGEL_KIT,
    variables: {
      gameRoleId: mockGame5.gameRoles[2].id,
      characterId: mockCharacter2.id,
      stock:
        mockPlaybookCreatorAngel.playbookUniqueCreator?.angelKitCreator
          ?.startingStock,
      hasSupplier: false,
    },
  },
  result: () => {
    console.log('mockSetAngelKit');
    return {
      data: {
        setAngelKit: {
          id: mockCharacter2.id,
          name: mockCharacter2.name,
          playbook: mockCharacter2.playbook,
          playbookUnique: mockCharacter2.playbookUniques,
        },
      },
    };
  },
};

export const mockToggleStatHighlight: MockedResponse = {
  request: {
    query: TOGGLE_STAT_HIGHLIGHT,
    variables: {
      gameRoleId: mockGame5.gameRoles[2].id,
      characterId: mockCharacter2.id,
      stat: StatType.cool,
    },
  },
  result: () => {
    // console.log('mockToggleStatHighlight');
    return {
      data: {
        toggleStatHighlight: {
          id: mockCharacter2.id,
          name: mockCharacter2.name,
          playbook: mockCharacter2.playbook,
          statsBlock: mockStatsBlockWithHighlight,
        },
      },
    };
  },
};

export const mockAllMoves: MockedResponse = {
  request: {
    query: ALL_MOVES,
  },
  result: () => {
    // console.log('mockAllMoves');
    return {
      data: {
        allMoves: mockAllMovesArray,
      },
    };
  },
};

export const mockGameForPreGame1: MockedResponse = {
  request: {
    query: GAME,
    variables: { gameId: mockGame5.id },
  },
  result: () => {
    // console.log('mockGameForPreGame1');
    return {
      data: {
        game: {
          ...mockGame5,
          __typename: 'Game',
        },
      },
    };
  },
};

export const mockGameForPreGame3: MockedResponse = {
  request: {
    query: GAME,
    variables: { gameId: mockGame6.id },
  },
  result: () => {
    // console.log('mockGameForPreGame3');
    return {
      data: {
        game: mockGame6,
      },
    };
  },
};

export const mockFinishPreGame: MockedResponse = {
  request: {
    query: FINISH_PRE_GAME,
    variables: {
      gameId: mockGame6.id,
    },
  },
  result: () => {
    // console.log('mockFinishPreGame');
    return {
      data: {
        finishPreGame: {
          id: mockGame6.id,
        },
      },
    };
  },
};

export const mockPlaybook: MockedResponse = {
  request: {
    query: PLAYBOOK,
    variables: { playbookType: mockCharacter2.playbook },
  },
  result: () => {
    // console.log('mockPlaybook');
    return {
      data: {
        playbook: mockPlaybookAngel,
      },
    };
  },
};

export const mockSetVehicle: MockedResponse = {
  request: {
    query: SET_VEHICLE,
    variables: {
      gameRoleId: 'mock-gameRole-id-8',
      characterId: mockCharacter2.id,
      vehicleInput: mockVehicleInput,
    },
  },
  result: () => {
    // console.log('mockSetVehicle');
    return {
      data: {
        setVehicle: {
          id: mockCharacter2.id,
          // name: mockCharacter2.name,
          // playbook: mockCharacter2.playbook,
          // playbookUnique: mockPlaybookUniqueDriver,
        },
      },
    };
  },
};

export const mockPlayBookCreatorQueryAngel: MockedResponse<PlaybookCreatorData> =
  {
    request: {
      query: PLAYBOOK_CREATOR,
      variables: { playbookType: PlaybookType.angel },
    },
    result: () => {
      // console.log('mockPlayBookCreatorQueryAngel');
      return {
        data: {
          playbookCreator: mockPlaybookCreatorAngel,
        },
      };
    },
  };

export const mockPlayBookCreatorQueryBrainer: MockedResponse<PlaybookCreatorData> =
  {
    request: {
      query: PLAYBOOK_CREATOR,
      variables: { playbookType: PlaybookType.brainer },
    },
    result: () => {
      // console.log('mockPlayBookCreatorQueryBrainer');
      return {
        data: {
          playbookCreator: mockPlaybookCreatorBrainer,
        },
      };
    },
  };

export const mockVehicleCreatorQuery: MockedResponse = {
  request: {
    query: VEHICLE_CREATOR,
  },
  result: () => {
    // console.log('mockVehicleCreator');
    return {
      data: {
        __typename: 'Query',
        vehicleCreator: { ...mockVehicleCreator, __typename: 'VehicleCreator' },
      },
    };
  },
};

export const mockSetVehicleCount: MockedResponse = {
  request: {
    query: SET_VEHICLE_COUNT,
    variables: {
      gameRoleId: 'mock-gameRole-id-8',
      characterId: 'mock-character-id-2',
      vehicleCount: 1,
    },
  },
  result: () => {
    // console.log('mockSetVehicleCount');
    return {
      data: {
        __typename: 'Mutation',
        setVehicleCount: {
          id: mockCharacter2.id,
          vehicleCount: 1,
          __typename: 'Character',
        },
      },
    };
  },
};

export const mockSetBattleVehicleCount: MockedResponse = {
  request: {
    query: SET_BATTLE_VEHICLE_COUNT,
    variables: {
      gameRoleId: 'mock-gameRole-id-8',
      characterId: 'mock-character-id-2',
      battleVehicleCount: 1,
    },
  },
  result: () => {
    // console.log('mockSetBattleVehicleCount');
    return {
      data: {
        __typename: 'Mutation',
        setVehicleCount: {
          id: mockCharacter2.id,
          battleVehicleCount: 1,
          __typename: 'Character',
        },
      },
    };
  },
};

export const mockAdjustCharacterHx: MockedResponse = {
  request: {
    query: ADJUST_CHARACTER_HX,
    variables: {
      gameRoleId: 'mock-gameRole-id-8',
      characterId: 'mock-character-id-2',
      hxStat: {
        characterId: 'mock-character-id-1',
        characterName: 'Mock Character 1',
        hxValue: 1,
      },
    },
  },
  result: () => {
    // console.log('mockAdjustCharacterHx');
    return {
      data: {
        __typename: 'Mutation',
        adjustCharacterHx: getAdjustCharacterHxOR(mockCharacter2, {
          characterId: 'mock-character-id-1',
          characterName: 'Mock Character 1',
          hxValue: 1,
        }),
      },
    };
  },
};

export const mockPlayBookCreatorQueryMaestroD: MockedResponse<PlaybookCreatorData> =
  {
    request: {
      query: PLAYBOOK_CREATOR,
      variables: { playbookType: PlaybookType.maestroD },
    },
    result: () => {
      // console.log('mockPlayBookCreatorQueryMaestroD');
      return {
        data: {
          __typename: 'Mutation',
          playbookCreator: mockPlaybookCreatorMaestroD,
        },
      };
    },
  };

export const mockPlayBookCreatorQueryHocus: MockedResponse = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.hocus },
  },
  result: () => {
    // console.log('mockPlayBookCreatorQueryHocus');
    return {
      data: {
        __typename: 'Mutation',
        playbookCreator: mockPlaybookCreatorHocus,
      },
    };
  },
};

export const mockPlayBookCreatorQueryChopper: MockedResponse = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.chopper },
  },
  result: () => {
    // console.log('mockPlayBookCreatorQueryChopper');
    return {
      data: {
        __typename: 'Mutation',
        playbookCreator: mockPlaybookCreatorChopper,
      },
    };
  },
};

export const mockPlayBookCreatorQueryHardHolder: MockedResponse = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.hardholder },
  },
  result: () => {
    // console.log('mockPlayBookCreatorQueryHardHolder');
    return {
      data: {
        __typename: 'Mutation',
        playbookCreator: mockPlaybookCreatorHardHolder,
      },
    };
  },
};

export const mockPlayBookCreatorQuerySkinner: MockedResponse = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.skinner },
  },
  result: () => {
    // console.log('mockPlayBookCreatorQuerySkinner');
    return {
      data: {
        __typename: 'Mutation',
        playbookCreator: mockPlaybookCreatorSkinner,
      },
    };
  },
};

export const mockPlayBookCreatorQueryGunlugger: MockedResponse = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.gunlugger },
  },
  result: () => {
    // console.log('mockPlayBookCreatorQueryGunlugger');
    return {
      data: {
        __typename: 'Mutation',
        playbookCreator: mockPlaybookCreatorGunlugger,
      },
    };
  },
};

export const mockPlayBookCreatorQuerySavvyhead: MockedResponse = {
  request: {
    query: PLAYBOOK_CREATOR,
    variables: { playbookType: PlaybookType.savvyhead },
  },
  result: () => {
    // console.log('mockPlayBookCreatorQuerySavvyhead');
    return {
      data: {
        __typename: 'Mutation',
        playbookCreator: mockPlaybookCreatorSavvyhead,
      },
    };
  },
};

export const mockMcContentQuery: MockedResponse = {
  request: {
    query: MC_CONTENT,
  },
  result: () => {
    // console.log('mockMcContentQuery');
    return {
      data: {
        __typename: 'Query',
        mcContent: mockMcContent,
      },
    };
  },
};
