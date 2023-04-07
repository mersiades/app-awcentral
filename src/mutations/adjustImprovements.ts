import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';
import { PlaybookType } from '../@types/enums';

export interface AdjustImprovementsData {
  adjustImprovements: {
    id: string;
    name: string;
    playbook: PlaybookType;
    allowedImprovements: number;
    allowedOtherPlaybookMoves: number;
    characterMoves: {
      id: string;
      name: string;
      __typename: 'CharacterMove';
    }[];
    improvementMoves: {
      id: string;
      name: string;
      __typename: 'CharacterMove';
    }[];
    futureImprovementMoves: {
      id: string;
      name: string;
      __typename: 'CharacterMove';
    }[];
    __typename: 'Character';
  };
}

export interface AdjustImprovementsVars {
  gameRoleId: string;
  characterId: string;
  improvementIds: string[];
  futureImprovementIds: string[];
}

export const adjustImprovementsOR = (
  character: Character
): AdjustImprovementsData => ({
  adjustImprovements: {
    id: character.id,
    name: character.name || 'temp-name',
    playbook: character.playbook,
    allowedImprovements: character.allowedImprovements,
    allowedOtherPlaybookMoves: character.allowedOtherPlaybookMoves,
    characterMoves: character.characterMoves.map((move) => ({
      id: move.id,
      name: move.name,
      __typename: 'CharacterMove',
    })),
    improvementMoves: character.improvementMoves.map((move) => ({
      id: move.id,
      name: move.name,
      __typename: 'CharacterMove',
    })),
    futureImprovementMoves: character.futureImprovementMoves.map((move) => ({
      id: move.id,
      name: move.name,
      __typename: 'CharacterMove',
    })),
    __typename: 'Character',
  },
});

const ADJUST_IMPROVEMENTS = gql`
  mutation AdjustImprovements(
    $gameRoleId: String!
    $characterId: String!
    $improvementIds: [String]!
    $futureImprovementIds: [String]
  ) {
    adjustImprovements(
      gameRoleId: $gameRoleId
      characterId: $characterId
      improvementIds: $improvementIds
      futureImprovementIds: $futureImprovementIds
    ) {
      id
      name
      playbook
      allowedImprovements
      allowedOtherPlaybookMoves
      characterMoves {
        id
        name
      }
      improvementMoves {
        id
        name
      }
      futureImprovementMoves {
        id
        name
      }
    }
  }
` as TypedDocumentNode<AdjustImprovementsData, AdjustImprovementsVars>;

export default ADJUST_IMPROVEMENTS;
