import { gql } from '@apollo/client';
import { Game, GameRole } from '../@types/dataInterfaces';
import { ThreatMapLocation } from '../@types/enums';

interface ChangeCharacterPositionCharacter {
  id: string;
  mapPosition: ThreatMapLocation;
  __typename: 'Character';
}

interface ChangeCharacterPositionGameRole {
  id: string;
  characters: ChangeCharacterPositionCharacter[];
  __typename: 'GameRole';
}

export interface ChangeCharacterPositionData {
  changeCharacterPosition: {
    id: string;
    gameRoles: ChangeCharacterPositionGameRole[];
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
  const getCharacters = (gameRole: GameRole) => {
    return gameRole.characters.map((character) => ({
      id: character.id,
      mapPosition:
        character.id === characterId ? newPosition : character.mapPosition,
      __typename: 'Character' as const,
    }));
  };

  const gameRoles = game.gameRoles.map((gameRole) => {
    return {
      id: gameRole.id,
      characters: getCharacters(gameRole),
      __typename: 'GameRole' as const,
    };
  });

  return {
    changeCharacterPosition: {
      id: game.id,
      gameRoles,
      __typename: 'Game' as const,
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
