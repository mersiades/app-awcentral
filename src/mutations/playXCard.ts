import { gql } from '@apollo/client';
import { MessageType } from '../@types/enums';

export interface PlayXCardData {
  playXCard: {
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

export interface PlayXCardVars {
  gameId: string;
}

const PLAY_X_CARD = gql`
  mutation PlayXCard($gameId: String!) {
    playXCard(gameId: $gameId) {
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

export default PLAY_X_CARD;
