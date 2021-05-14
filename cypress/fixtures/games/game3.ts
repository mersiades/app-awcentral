import { Game } from '../../../src/@types/dataInterfaces';
import ahmad from '../users/ahmad';
import dave from '../users/dave';
import john from '../users/john';
import maya from '../users/maya';

export const MOCK_GAME_3_ID = 'mock-game-3-id';

// A new game, created by dave, with invitations for john, maya and ahmad
const game3: Game = {
  id: MOCK_GAME_3_ID,
  name: 'Mock Game 3',
  commsApp: 'Zoom',
  commsUrl: 'https://www.zoom.com/meeting-id',
  hasFinishedPreGame: false,
  showFirstSession: true,
  mc: { displayName: dave.username as string, id: dave.id as string },
  players: [],
  gameRoles: [],
  invitees: [john.email as string, maya.email as string, ahmad.email as string],
  gameMessages: [],
};

export default game3;
