import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { List } from 'grommet';

import { RoleType } from '../@types/enums';
import { GameRolesByUserIdGameRoles } from '../queries/gameRolesByUserId';

interface GamesListProps {
  gameRoles: GameRolesByUserIdGameRoles[];
}

interface GameInList {
  name: string;
  role: RoleType;
  gameId: string;
  numberOfCharacters: number;
}

const GamesList: FC<GamesListProps> = ({ gameRoles }) => {
  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //
  const history = useHistory();

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  // Transforms gameRoles to fit nicely with Grommet's List requirements
  const transformGames = () => {
    const games: GameInList[] = [];
    gameRoles.forEach((gameRole) => {
      if (!!gameRole.gameName && !!gameRole.role && gameRole.gameId) {
        const datum = {
          name: gameRole.gameName,
          role: gameRole.role,
          gameId: gameRole.gameId,
          numberOfCharacters: gameRole.characters ? gameRole.characters.length : 0,
        };
        games.push(datum);
      }
    });

    return games;
  };

  // ------------------------------------------------------ Render -------------------------------------------------------- //
  return (
    <List
      primaryKey="name"
      secondaryKey="role"
      data={transformGames()}
      onClickItem={async (e: any) => {
        if (e.item.role === RoleType.player && e.item.numberOfCharacters === 0) {
          history.push(`/character-creation/${e.item.gameId}?step=0`);
        } else if (e.item.role === RoleType.player) {
          history.push(`/player-game/${e.item.gameId}`);
        } else {
          history.push(`/mc-game/${e.item.gameId}`);
        }
      }}
    />
  );
};

export default GamesList;
