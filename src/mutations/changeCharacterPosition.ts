import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';
import { ThreatMapLocation } from '../@types/enums';

export interface ChangeCharacterPositionData {
  changeCharacterPosition: {
    id: string;
    gameRoles: {
      id: string;
      characters: {
        id: string;
        mapPosition: ThreatMapLocation;
        __typename: 'Character';
      };
      __typename: 'GameRole';
    };
    __typename: 'Game';
  };
}

export interface ChangeCharacterPositionVars {
  gameId: string;
  gameRoleId: string;
  characterId: string;
  newPosition: ThreatMapLocation;
}

export const changeCharacterPositionOR = (
  game: Game,
  characterId: string,
  newPosition: ThreatMapLocation
): ChangeCharacterPositionData => {
  const gameRoles = game.gameRoles.map((gameRole) => {
    const characters = gameRole.characters.map((character) => ({
      id: character.id,
      mapPosition:
        character.id === characterId ? newPosition : character.mapPosition,
      __typename: 'Character',
    }));

    return {
      id: gameRole.id,
      characters,
      __typename: 'GameRole',
    };
  });

  console.log(`gameRoles`, gameRoles);
  return {
    changeCharacterPosition: {
      id: game.id,
      // @ts-ignore
      gameRoles,
      __typename: 'Game',
    },
  };
};

const CHANGE_CHARACTER_POSITION = gql`
  mutation ChangeCharacterPosition(
    $gameId: String!
    $gameRoleId: String!
    $characterId: String!
    $newPosition: ThreatMapLocation!
  ) {
    changeCharacterPosition(
      gameId: $gameId
      gameRoleId: $gameRoleId
      characterId: $characterId
      newPosition: $newPosition
    ) {
      id
      gameRoles {
        id
        characters {
          id
          mapPosition
        }
      }
    }
  }
`;

export default CHANGE_CHARACTER_POSITION;
