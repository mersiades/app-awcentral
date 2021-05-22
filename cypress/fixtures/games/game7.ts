import { Game } from '../../../src/@types/dataInterfaces';
import ahmad from '../users/ahmad';
import dave from '../users/dave';
import john from '../users/john';
import maya from '../users/maya';
import sara from '../users/sara';
import takeshi from '../users/takeshi';

export const MOCK_GAME_7_ID = 'mock-game-7-id';
export const MOCK_GAME_7_NAME = 'Mock Game 7';

// A new game with pre-game completed. Five players with freshly-created characters.
const game7: Game = {
  id: MOCK_GAME_7_ID,
  name: MOCK_GAME_7_NAME,
  commsApp: 'Zoom',
  commsUrl: 'https://www.zoom.com/meeting-id',
  hasFinishedPreGame: true,
  showFirstSession: false,
  mc: { displayName: dave.username as string, id: dave.id as string },
  players: [
    { id: sara.id as string, displayName: sara.username as string },
    { id: john.id as string, displayName: john.username as string },
    { id: maya.id as string, displayName: maya.username as string },
    { id: ahmad.id as string, displayName: ahmad.username as string },
    { id: takeshi.id as string, displayName: takeshi.username as string },
  ],
  gameRoles: [],
  invitees: [],
  gameMessages: [],
};

export default game7;
