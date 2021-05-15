import { Game } from '../../../src/@types/dataInterfaces';
import dave from '../users/dave';
import john from '../users/john';

export const MOCK_GAME_3_ID = 'mock-game-3-id';

// This fixture mimics the second Game created in the CreatingGame cypress test suite
const game5: Game = {
  id: 'mock-game-5-id',
  name: 'Mock Game 5',
  commsApp: 'Zoom',
  commsUrl: 'https://www.zoom.com/meeting-id',
  hasFinishedPreGame: false,
  showFirstSession: true,
  mc: { displayName: dave.username as string, id: dave.id as string },
  players: [],
  gameRoles: [],
  invitees: [john.email as string],
  gameMessages: [],
};

export default game5;
