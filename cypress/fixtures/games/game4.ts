import { Game } from '../../../src/@types/dataInterfaces';
import ahmad from '../users/ahmad';
import dave from '../users/dave';
import john from '../users/john';
import maya from '../users/maya';

export const MOCK_GAME_3_ID = 'mock-game-3-id';

// This fixture mimics the first Game created in the CreatingGame cypress test suite
const game4: Game = {
  id: 'mock-game-4-id',
  name: 'Mock Game 4',
  commsApp: '', // Should these be null or undefined?
  commsUrl: '', // Should these be null or undefined?
  hasFinishedPreGame: false,
  showFirstSession: true,
  mc: { displayName: dave.username as string, id: dave.id as string },
  players: [],
  gameRoles: [],
  invitees: [john.email as string, maya.email as string, ahmad.email as string],
  gameMessages: [],
};

export default game4;
