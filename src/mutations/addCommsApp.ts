import { gql, TypedDocumentNode } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface AddCommsAppData {
  addCommsApp: {
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

export interface AddCommsAppVars {
  gameId: string;
  app: string;
}

export const getAddCommsAppOR = (game: Game, app: string): AddCommsAppData => ({
  addCommsApp: {
    id: game.id,
    name: game.name,
    invitees: game.invitees,
    commsApp: app,
    commsUrl: game.commsUrl,
    mc: {
      id: game.mc.id,
      displayName: game.mc.displayName,
      __typename: 'User',
    },
    __typename: 'Game',
  },
});

const ADD_COMMS_APP = gql`
  mutation AddCommsApp($gameId: String!, $app: String!) {
    addCommsApp(gameId: $gameId, app: $app) {
      id
      name
      invitees
      commsApp
      commsUrl
      mc {
        id
        displayName
      }
    }
  }
` as TypedDocumentNode<AddCommsAppData, AddCommsAppVars>;

export default ADD_COMMS_APP;
