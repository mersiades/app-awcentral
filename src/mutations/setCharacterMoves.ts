import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';
import { MoveType, PlaybookType } from '../@types/enums';

export interface SetCharacterMovesData_CharacterMove {
  id: string;
  isSelected: boolean;
  name: string;
  kind: MoveType;
  description: string;
  playbook: PlaybookType;
  __typename?: 'CharacterMove';
}

export interface SetCharacterMovesData {
  setCharacterMoves: {
    id: string;
    playbook: PlaybookType;
    characterMoves: SetCharacterMovesData_CharacterMove[];
    __typename?: 'Character';
  };
}

export interface SetCharacterMovesVars {
  gameRoleId: string;
  characterId: string;
  moveNames: string[];
}

export const getSetCharacterMovesOR = (
  character: Character,
  moveNames: string[]
): SetCharacterMovesData => {
  const optimisticCharacterMoves: SetCharacterMovesData_CharacterMove[] = [];

  moveNames.forEach((newMoveName) => {
    let match = false;
    character.characterMoves.forEach((oldMove) => {
      if (oldMove.name === newMoveName) {
        const optimisticMove: SetCharacterMovesData_CharacterMove = {
          id: oldMove.id,
          name: oldMove.name,
          isSelected: true,
          kind: oldMove.kind,
          description: oldMove.description,
          playbook: oldMove.playbook || character.playbook,
          __typename: 'CharacterMove',
        };

        optimisticCharacterMoves.push(optimisticMove);
        match = true;
      }
    });

    if (!match) {
      const optimisticMove: SetCharacterMovesData_CharacterMove = {
        id: 'temp-id',
        name: newMoveName,
        isSelected: true,
        kind: MoveType.character,
        description: '',
        playbook: character.playbook,
        __typename: 'CharacterMove',
      };

      optimisticCharacterMoves.push(optimisticMove);
    }
  });

  return {
    setCharacterMoves: {
      id: character.id,
      playbook: character.playbook,
      characterMoves: optimisticCharacterMoves,
    },
  };
};

const SET_CHARACTER_MOVES = gql`
  mutation SetCharacterMoves(
    $gameRoleId: String!
    $characterId: String!
    $moveNames: [String]!
  ) {
    setCharacterMoves(
      gameRoleId: $gameRoleId
      characterId: $characterId
      moveNames: $moveNames
    ) {
      id
      playbook
      characterMoves {
        id
        isSelected
        name
        kind
        description
        playbook
      }
    }
  }
` as TypedDocumentNode<SetCharacterMovesData, SetCharacterMovesVars>;

export default SET_CHARACTER_MOVES;
