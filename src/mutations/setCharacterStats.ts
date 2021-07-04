import { gql } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';

export interface SetCharacterStatsData {
  setCharacterStats: Character;
  __typename?: 'Mutation';
}

export interface SetCharacterStatsVars {
  gameRoleId: string;
  characterId: string;
  statsOptionId: string;
}

const SET_CHARACTER_STATS = gql`
  mutation SetCharacterStats(
    $gameRoleId: String!
    $characterId: String!
    $statsOptionId: String!
  ) {
    setCharacterStats(
      gameRoleId: $gameRoleId
      characterId: $characterId
      statsOptionId: $statsOptionId
    ) {
      id
      name
      playbook
      statsBlock {
        id
        stats {
          id
          stat
          value
          isHighlighted
        }
      }
    }
  }
`;

export default SET_CHARACTER_STATS;
