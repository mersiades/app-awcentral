import { Game } from '../../../src/@types/dataInterfaces';
import ahmad from '../users/ahmad';
import dave from '../users/dave';
import john from '../users/john';
import maya from '../users/maya';
import sara from '../users/sara';
import takeshi from '../users/takeshi';

export const MOCK_GAME_1_ID = 'mock-game-1-id';
export const MOCK_GAME_1_NAME = 'Mock Game 1';

// A game ready to finish pre-game. Five players with freshly-created characters.
const game1: Game = {
  id: MOCK_GAME_1_ID,
  name: MOCK_GAME_1_NAME,
  commsApp: 'Zoom',
  commsUrl: 'https://www.zoom.com/meeting-id',
  hasFinishedPreGame: false,
  showFirstSession: true,
  mc: { displayName: dave.username as string, id: dave.id as string },
  players: [
    {
      id: sara.id as string,
      displayName: sara.username as string,
      email: sara.email as string,
    },
    {
      id: john.id as string,
      displayName: john.username as string,
      email: john.email as string,
    },
    {
      id: maya.id as string,
      displayName: maya.username as string,
      email: maya.email as string,
    },
    {
      id: ahmad.id as string,
      displayName: ahmad.username as string,
      email: ahmad.email as string,
    },
    {
      id: takeshi.id as string,
      displayName: takeshi.username as string,
      email: takeshi.email as string,
    },
  ],
  gameRoles: [],
  invitees: [],
  gameMessages: [],
};

export default game1;
