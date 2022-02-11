import { GameForInviteeGame } from '../../../../src/queries/gamesForInvitee';
import {
  MOCK_GAME_2_ID,
  MOCK_GAME_2_NAME,
  MOCK_USER_1_NAME,
} from '../../constants';

const gamesForInvitee_1Invite1: GameForInviteeGame[] = [
  {
    id: MOCK_GAME_2_ID,
    name: MOCK_GAME_2_NAME,
    mc: { displayName: 'mock-mc-displayname' },
    players: [{ displayName: MOCK_USER_1_NAME }],
    __typename: 'Game',
  },
];

export default gamesForInvitee_1Invite1;
