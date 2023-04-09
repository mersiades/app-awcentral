import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
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
  // ----------------------------- 3rd party hooks -------------------------- //
  const navigate = useNavigate();

  // ----------------------------- Component functions ---------------------- //
  // Transforms gameRoles to fit nicely with Grommet's List requirements
  const transformGames = () => {
    const games: GameInList[] = [];
    gameRoles.forEach((gameRole) => {
      if (!!gameRole.gameName && !!gameRole.role && gameRole.gameId) {
        const datum = {
          name: gameRole.gameName,
          role: gameRole.role,
          gameId: gameRole.gameId,
          numberOfCharacters: gameRole.characters
            ? gameRole.characters.length
            : 0,
        };
        games.push(datum);
      }
    });

    return games;
  };

  // ----------------------------- Render ----------------------------------- //
  return (
    <List
      primaryKey="name"
      secondaryKey="role"
      data={transformGames()}
      onClickItem={async (e: any) => {
        if (
          e.item.role === RoleType.player &&
          e.item.numberOfCharacters === 0
        ) {
          navigate(`/character-creation/${e.item.gameId}?step=0`);
        } else if (e.item.role === RoleType.player) {
          navigate(`/player-game/${e.item.gameId}`);
        } else {
          navigate(`/mc-game/${e.item.gameId}`);
        }
      }}
    />
  );
};

export default GamesList;
