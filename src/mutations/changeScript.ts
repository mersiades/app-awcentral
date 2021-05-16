import { gql } from '@apollo/client';
import { MessageType, ScriptChangeType } from '../@types/enums';

export interface ChangeScriptData {
  changeScript: {
    id: string;
    gameMessages: {
      id: string;
      gameId: string;
      messageType: MessageType;
      title: string;
      content: string;
      sentOn: string;
      __typename: 'GameMessage';
    }[];
    __typename?: 'Game';
  };
}

export interface ChangeScriptVars {
  gameId: string;
  scriptChangeType: ScriptChangeType;
  comment?: string;
}

const CHANGE_SCRIPT = gql`
  mutation ChangeScript($gameId: String!, $scriptChangeType: ScriptChangeType!, $comment: String) {
    changeScript(gameId: $gameId, scriptChangeType: $scriptChangeType, comment: $comment) {
      id
      gameMessages {
        id
        gameId
        messageType
        title
        content
        sentOn
      }
    }
  }
`;

export default CHANGE_SCRIPT;
