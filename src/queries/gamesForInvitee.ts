import { gql, TypedDocumentNode } from '@apollo/client';

export interface GameForInviteeGame {
  id: string;
  name: string;
  mc: { displayName: string };
  players: { displayName: string }[];
  __typename: 'Game';
}

export interface GamesForInviteeData {
  gamesForInvitee: GameForInviteeGame[];
}

export interface GamesForInviteeVars {
  email: string;
}

const GAMES_FOR_INVITEE = gql`
  query GamesForInvitee($email: String!) {
    gamesForInvitee(email: $email) {
      id
      name
      mc {
        displayName
      }
      players {
        displayName
      }
    }
  }
` as TypedDocumentNode<GamesForInviteeData, GamesForInviteeVars>;

export default GAMES_FOR_INVITEE;
