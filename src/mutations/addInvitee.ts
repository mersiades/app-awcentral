import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface AddInviteeData {
  addInvitee: {
    id: string;
    name: string;
    invitees: string[];
    mc: {
      id: string;
      displayName: string;
      __typename?: 'User';
    };
    __typename?: 'Game';
  };
}

export interface AddInviteeVars {
  gameId: string;
  email: string;
}

export const getAddInviteeOR = (game: Game, email: string): AddInviteeData => ({
  addInvitee: {
    id: game.id,
    name: game.name,
    invitees: [...game.invitees, email],
    mc: {
      id: game.mc.id,
      displayName: game.mc.displayName,
      __typename: 'User',
    },
    __typename: 'Game',
  },
});

const ADD_INVITEE = gql`
  mutation AddInvitee($gameId: String!, $email: String!) {
    addInvitee(gameId: $gameId, email: $email) {
      id
      name
      invitees
      mc {
        id
        displayName
      }
    }
  }
`;

export default ADD_INVITEE;
