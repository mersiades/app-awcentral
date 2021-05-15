import { Game } from '../../../src/@types/dataInterfaces';
import ahmadAsPlayer_2 from '../gameRoles/ahmadAsPlayer_2';
import caesarAsPlayer_2 from '../gameRoles/caesarAsPlayer_2';
import cristiAsPlayer_2 from '../gameRoles/cristiAsPlayer_2';
import daveAsMC_3 from '../gameRoles/daveAsMC_3';
import ivetteAsPlayer_2 from '../gameRoles/ivetteAsPlayer_2';
import johnAsPlayer_2 from '../gameRoles/johnAsPlayer_2';
import maramaAsPlayer_2 from '../gameRoles/maramaAsPlayer_2';
import mayaAsPlayer_2 from '../gameRoles/mayaAsPlayer_2';
import olayinkaAsPlayer_2 from '../gameRoles/olayinkaAsPlayer_2';
import saraAsPlayer_2 from '../gameRoles/saraAsPlayer_2';
import sergioAsPlayer_2 from '../gameRoles/sergioAsPlayer_2';
import takeshiAsPlayer_2 from '../gameRoles/takeshiAsPlayer_2';
import wilmerAsPlayer_2 from '../gameRoles/wilmerAsPlayer_2';
import ahmad from '../users/ahmad';
import caesar from '../users/caesar';
import cristi from '../users/cristi';
import dave from '../users/dave';
import ivette from '../users/ivette';
import john from '../users/john';
import marama from '../users/marama';
import maya from '../users/maya';
import olayinka from '../users/olayinka';
import sara from '../users/sara';
import sergio from '../users/sergio';
import takeshi from '../users/takeshi';
import wilmer from '../users/wilmer';

export const MOCK_GAME_6_ID = 'mock-game-6-id';
export const MOCK_GAME_6_NAME = 'Mock Game 6';

// This fixture mimics mockGame6 as it is created on the backend
const game6: Game = {
  id: MOCK_GAME_6_ID,
  name: MOCK_GAME_6_NAME,
  commsApp: '',
  commsUrl: '',
  hasFinishedPreGame: false,
  showFirstSession: true,
  mc: { displayName: dave.username as string, id: dave.id as string },
  players: [
    {
      id: sara.id as string,
      displayName: sara.username as string,
    },
    {
      id: john.id as string,
      displayName: john.username as string,
    },
    {
      id: maya.id as string,
      displayName: maya.username as string,
    },
    {
      id: ahmad.id as string,
      displayName: ahmad.username as string,
    },
    {
      id: takeshi.id as string,
      displayName: takeshi.username as string,
    },
    {
      id: marama.id as string,
      displayName: marama.username as string,
    },
    {
      id: olayinka.id as string,
      displayName: olayinka.username as string,
    },
    {
      id: wilmer.id as string,
      displayName: wilmer.username as string,
    },
    {
      id: ivette.id as string,
      displayName: ivette.username as string,
    },
    {
      id: sergio.id as string,
      displayName: sergio.username as string,
    },
    {
      id: caesar.id as string,
      displayName: caesar.username as string,
    },
    {
      id: cristi.id as string,
      displayName: cristi.username as string,
    },
  ],
  gameRoles: [
    ahmadAsPlayer_2,
    caesarAsPlayer_2,
    cristiAsPlayer_2,
    daveAsMC_3,
    ivetteAsPlayer_2,
    johnAsPlayer_2,
    maramaAsPlayer_2,
    mayaAsPlayer_2,
    olayinkaAsPlayer_2,
    saraAsPlayer_2,
    sergioAsPlayer_2,
    takeshiAsPlayer_2,
    wilmerAsPlayer_2,
  ],
  invitees: [],
  gameMessages: [],
};

export default game6;
