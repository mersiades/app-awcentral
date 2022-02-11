import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Box } from 'grommet';

import Spinner from './Spinner';
import { brandColor, ButtonWS, TextWS } from '../config/grommetConfig';
import { GameForInviteeGame } from '../queries/gamesForInvitee';
import ADD_USER_TO_GAME, {
  AddUserToGameData,
  AddUserToGameVars,
} from '../mutations/addUserToGame';
import { RoleType } from '../@types/enums';
import { useKeycloakUser } from '../contexts/keycloakUserContext';
import { JOIN_TEXT, NO_INVITATIONS_TEXT } from '../config/constants';
import { logAmpEvent } from '../config/amplitudeConfig';

interface InvitationsListProps {
  games: GameForInviteeGame[];
}

const InvitationsList: FC<InvitationsListProps> = ({ games }) => {
  const history = useHistory();
  const { id: userId, username: displayName, email } = useKeycloakUser();
  const [addUserToGame, { loading }] = useMutation<
    AddUserToGameData,
    AddUserToGameVars
  >(ADD_USER_TO_GAME);

  const handleJoinGame = async (gameId: string) => {
    await addUserToGame({
      // @ts-ignore
      variables: { userId, displayName, email, gameId },
      skip: !userId,
    });
    logAmpEvent('join game');
    history.push(`/character-creation/${gameId}`, { role: RoleType.player });
  };

  const getPlayersString = (game: GameForInviteeGame) => {
    let string = 'with ';
    if (game.players.length === 0) {
      string += `${game.mc.displayName}`;
    }
    if (game.players.length === 1) {
      string += `${game.mc.displayName} `;
    } else if (game.players.length > 1) {
      string += `${game.mc.displayName}, `;
    }

    game.players.forEach((player, index) => {
      if (game.players.length === index + 1) {
        string += `and ${player.displayName}`;
      } else {
        string += `${player.displayName}, `;
      }
    });
    return string;
  };

  if (games.length === 0) {
    return (
      <Box>
        <Box direction="row" justify="between" align="center">
          <Box direction="column" fill="horizontal">
            <TextWS weight="bold" size="xlarge" truncate>
              {NO_INVITATIONS_TEXT}
            </TextWS>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {games.map((game) => {
        return (
          <Box
            data-testid="invitation-list-item"
            key={game.id}
            direction="row"
            justify="between"
            align="center"
          >
            <Box direction="column" fill="horizontal">
              <TextWS weight="bold" size="xlarge" truncate>
                {game.name}
              </TextWS>
              <TextWS size="small" truncate>
                {getPlayersString(game)}
              </TextWS>
            </Box>
            <ButtonWS
              secondary
              onClick={() => handleJoinGame(game.id)}
              disabled={loading}
              focusIndicator={false}
              label={loading ? <Spinner fillColor={brandColor} /> : JOIN_TEXT}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default InvitationsList;
