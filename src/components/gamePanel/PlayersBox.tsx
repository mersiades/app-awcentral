import React, { FC } from 'react';
import { Box } from 'grommet';
import { Trash } from 'grommet-icons';

import CollapsiblePanelBox from '../CollapsiblePanelBox';
import { TextWS } from '../../config/grommetConfig';
import { useGame } from '../../contexts/gameContext';
import { useMutation } from '@apollo/client';
import REMOVE_PLAYER, { getRemovePlayerOR, RemovePlayerData, RemovePlayerVars } from '../../mutations/removePlayer';
import Spinner from '../Spinner';

const PlayersBox: FC = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game, allPlayerGameRoles } = useGame();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const [removePlayer, { loading: removingPlayer }] = useMutation<RemovePlayerData, RemovePlayerVars>(REMOVE_PLAYER);

  // ------------------------------------------------- Component functions -------------------------------------------------- //

  const handleRemovePlayer = async (playerId: string) => {
    if (!!game) {
      try {
        await removePlayer({
          variables: { gameId: game.id, playerId },
          optimisticResponse: getRemovePlayerOR(game, playerId),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderPlayers = () => {
    if (allPlayerGameRoles?.length === 0 || !allPlayerGameRoles) {
      return (
        <Box direction="row" align="center" alignContent="end" fill margin={{ vertical: 'small' }}>
          <Box align="start" fill>
            <TextWS>No players yet</TextWS>
          </Box>
        </Box>
      );
    } else {
      return game?.players.map((player) => {
        return (
          <Box
            key={player.displayName}
            direction="row"
            align="center"
            alignContent="end"
            fill
            margin={{ vertical: 'small' }}
          >
            <Box align="start" fill>
              <TextWS>{player.displayName}</TextWS>
            </Box>
            <Box align="end" fill>
              {!removingPlayer ? (
                <Trash color="accent-1" onClick={() => handleRemovePlayer(player.id)} cursor="grab" />
              ) : (
                <Spinner />
              )}
            </Box>
          </Box>
        );
      });
    }
  };

  return (
    <CollapsiblePanelBox open title="Players">
      <Box
        fill="horizontal"
        justify="between"
        align="start"
        gap="12px"
        animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      >
        {renderPlayers()}
      </Box>
    </CollapsiblePanelBox>
  );
};

export default PlayersBox;
