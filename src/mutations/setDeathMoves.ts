import { gql } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';
import { MoveType, PlaybookType } from '../@types/enums';

export interface SetDeathMovesData_CharacterMove {
  id: string;
  isSelected: boolean;
  name: string;
  kind: MoveType;
  description: string;
  playbook: PlaybookType;
  __typename?: 'CharacterMove';
}

export interface SetDeathMovesData {
  setDeathMoves: {
    id: string;
    playbook: PlaybookType;
    deathMoves: SetDeathMovesData_CharacterMove[];
    __typename?: 'Character';
  };
}

export interface SetDeathMovesVars {
  gameRoleId: string;
  characterId: string;
  moveNames: string[];
}

export const getSetDeathMovesOR = (character: Character, moveNames: string[]): SetDeathMovesData => {
  const optimisticDeathMoves: SetDeathMovesData_CharacterMove[] = [];

  moveNames.forEach((newMoveName) => {
    let match = false;
    character.deathMoves.forEach((oldMove) => {
      if (oldMove.name === newMoveName) {
        const optimisticMove: SetDeathMovesData_CharacterMove = {
          id: oldMove.id,
          name: oldMove.name,
          isSelected: true,
          kind: oldMove.kind,
          description: oldMove.description,
          playbook: oldMove.playbook || character.playbook,
          __typename: 'CharacterMove',
        };

        optimisticDeathMoves.push(optimisticMove);
        match = true;
      }
    });

    if (!match) {
      const optimisticMove: SetDeathMovesData_CharacterMove = {
        id: 'temp-id',
        name: newMoveName,
        isSelected: true,
        kind: MoveType.character,
        description: '',
        playbook: character.playbook,
        __typename: 'CharacterMove',
      };

      optimisticDeathMoves.push(optimisticMove);
    }
  });

  return {
    setDeathMoves: {
      id: character.id,
      playbook: character.playbook,
      deathMoves: optimisticDeathMoves,
    },
  };
};

const SET_DEATH_MOVES = gql`
  mutation SetDeathMoves($gameRoleId: String!, $characterId: String!, $moveNames: [String]!) {
    setDeathMoves(gameRoleId: $gameRoleId, characterId: $characterId, moveNames: $moveNames) {
      id
      playbook
      deathMoves {
        id
        isSelected
        name
        kind
        description
        playbook
      }
    }
  }
`;

export default SET_DEATH_MOVES;
