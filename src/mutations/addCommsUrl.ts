import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface AddCommsUrlData {
  addCommsUrl: {
    id: string;
    name: string;
    invitees: string[];
    commsApp: string;
    commsUrl: string;
    mc: {
      id: string;
      displayName: string;
      __typename?: 'User';
    };
    __typename?: 'Game';
  };
}

export interface AddCommsUrlVars {
  gameId: string;
  url: string;
}

export const getAddCommsUrlOR = (game: Game, url: string): AddCommsUrlData => ({
  addCommsUrl: {
    id: game.id,
    name: game.name,
    invitees: game.invitees,
    commsApp: game.commsApp,
    commsUrl: url,
    mc: {
      id: game.mc.id,
      displayName: game.mc.displayName,
      __typename: 'User',
    },
    __typename: 'Game',
  },
});

const ADD_COMMS_URL = gql`
  mutation AddCommsUrl($gameId: String!, $url: String!) {
    addCommsUrl(gameId: $gameId, url: $url) {
      id
      name
      invitees
      commsApp
      commsUrl
      mc {
        displayName
        id
      }
    }
  }
`;

export default ADD_COMMS_URL;
