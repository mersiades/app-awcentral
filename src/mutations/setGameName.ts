import { gql, TypedDocumentNode } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface SetGameNameData {
  setGameName: Game;
}

export interface SetGameNameVars {
  gameId: string;
  name: string;
}

const SET_GAME_NAME = gql`
  mutation SetGameName($gameId: String!, $name: String!) {
    setGameName(gameId: $gameId, name: $name) {
      id
      name
      invitees
      mc {
        displayName
      }
      gameRoles {
        role
        npcs {
          id
        }
        threats {
          id
        }
        characters {
          id
          name
        }
      }
    }
  }
` as TypedDocumentNode<SetGameNameData, SetGameNameVars>;

export default SET_GAME_NAME;
