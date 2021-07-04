import { gql } from '@apollo/client';
import { Character, CharacterStat, StatsBlock } from '../@types/dataInterfaces';
import { MoveType, PlaybookType, StatType } from '../@types/enums';
import {
  DEATH_CHANGE_PLAYBOOK_NAME,
  DEATH_WEIRD_MAX_3_NAME,
  DIE_NAME,
  HARD_MINUS_1_NAME,
} from '../config/constants';

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
    isDead: boolean;
    mustChangePlaybook: boolean;
    deathMoves: SetDeathMovesData_CharacterMove[];
    statsBlock: StatsBlock;
    __typename?: 'Character';
  };
}

export interface SetDeathMovesVars {
  gameRoleId: string;
  characterId: string;
  moveNames: string[];
}

export const getSetDeathMovesOR = (
  character: Character,
  moveNames: string[],
  removedMoves: string[],
  addedMoves: string[]
): SetDeathMovesData => {
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

  const generateOptimisticStats = (): CharacterStat[] => {
    let stats: CharacterStat[] = [];
    character.statsBlock?.stats.forEach((stat) => {
      const getStatValue = () => {
        switch (stat.stat) {
          case StatType.cool:
          // Deliberately falls through
          case StatType.hot:
          // Deliberately falls through
          case StatType.sharp:
            return stat.value;
          case StatType.hard:
            if (addedMoves.includes(HARD_MINUS_1_NAME)) {
              return stat.value - 1;
            } else if (removedMoves.includes(HARD_MINUS_1_NAME)) {
              return stat.value + 1;
            } else {
              return stat.value;
            }
          case StatType.weird:
            if (addedMoves.includes(DEATH_WEIRD_MAX_3_NAME)) {
              return stat.value + 1;
            } else if (removedMoves.includes(DEATH_WEIRD_MAX_3_NAME)) {
              return stat.value - 1;
            } else {
              return stat.value;
            }
          default:
            return stat.value;
        }
      };

      stats.push({
        ...stat,
        value: getStatValue(),
        __typename: 'CharacterStat',
      });
    });
    return stats;
  };

  const optimisticStatsBlock: StatsBlock = {
    id: character.statsBlock?.id || 'temp-stats-block-id',
    statsOptionId:
      character.statsBlock?.statsOptionId || 'temp-stats-block-statsOptionId',
    stats: generateOptimisticStats(),
    __typename: 'StatsBlock',
  };

  return {
    setDeathMoves: {
      id: character.id,
      isDead: addedMoves.includes(DIE_NAME),
      mustChangePlaybook: addedMoves.includes(DEATH_CHANGE_PLAYBOOK_NAME),
      playbook: character.playbook,
      deathMoves: optimisticDeathMoves,
      statsBlock: optimisticStatsBlock,
    },
  };
};

const SET_DEATH_MOVES = gql`
  mutation SetDeathMoves(
    $gameRoleId: String!
    $characterId: String!
    $moveNames: [String]!
  ) {
    setDeathMoves(
      gameRoleId: $gameRoleId
      characterId: $characterId
      moveNames: $moveNames
    ) {
      id
      playbook
      isDead
      mustChangePlaybook
      deathMoves {
        id
        isSelected
        name
        kind
        description
        playbook
      }
      statsBlock {
        id
        statsOptionId
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

export default SET_DEATH_MOVES;
