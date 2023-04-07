import React, { FC, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Box } from 'grommet';
import { useAuth0 } from '@auth0/auth0-react';

import LandingPageLayout from '../components/LandingPageLayout';
import CreateGameForm from '../components/CreateGameForm';
import GamesList from '../components/GamesList';
import { ButtonWS, HeadingWS, StyledClose } from '../config/grommetConfig';
import GAMEROLES_BY_USER_ID, {
  GameRolesByUserIdData,
  GameRolesByUserIdVars,
} from '../queries/gameRolesByUserId';
import { useFonts } from '../contexts/fontContext';
import { useGame } from '../contexts/gameContext';
import { useUser } from '../contexts/userContext';
import { logAmpEvent } from '../config/amplitudeConfig';
import {
  RETURN_TO_GAME_TEXT,
  JOIN_GAME_TEXT,
  CREATE_GAME_TEXT,
  YOUR_GAMES_TITLE,
} from '../config/constants';

import '../assets/styles/transitions.css';

const MenuPage: FC = () => {
  // ----------------------------- Component state -------------------------- //
  const [buttonsContainer, setButtonsContainer] = useState(0);

  // ----------------------------- 3rd party hooks -------------------------- //
  const navigate = useNavigate();
  const { logout } = useAuth0();

  // ----------------------------- Hooks ------------------------------------ //
  const { userId, displayName } = useUser();
  const { clearGameContext } = useGame();
  const { vtksReady } = useFonts();

  // ----------------------------- GraphQL ---------------------------------- //
  const { data } = useQuery<GameRolesByUserIdData, GameRolesByUserIdVars>(
    GAMEROLES_BY_USER_ID,
    {
      // @ts-ignore
      variables: { id: userId },
      skip: !userId,
      fetchPolicy: 'cache-and-network',
      pollInterval: 1000 * 60 * 60, // Once an hour
    }
  );
  const gameRoles = data?.gameRolesByUserId;

  // ----------------------------- Effects ---------------------------------- //

  useEffect(() => {
    !!clearGameContext && clearGameContext();
  }, [clearGameContext]);

  // ----------------------------- Render ----------------------------------- //

  const renderMenuButtons = () => {
    if (!gameRoles) {
      return null;
    } else {
      return (
        <Box animation={{ type: 'slideUp', size: 'large', duration: 750 }}>
          <Box gap="small">
            {gameRoles.length > 0 && (
              <ButtonWS
                label={RETURN_TO_GAME_TEXT}
                primary
                size="large"
                alignSelf="center"
                fill
                onClick={() => setButtonsContainer(1)}
              />
            )}
            <ButtonWS
              label={JOIN_GAME_TEXT}
              secondary
              size="large"
              alignSelf="center"
              fill
              onClick={() => {
                logAmpEvent('click join game');
                navigate('/join-game');
              }}
            />
            <ButtonWS
              label={CREATE_GAME_TEXT}
              secondary
              size="large"
              alignSelf="center"
              fill
              onClick={() => {
                logAmpEvent('click create game');
                setButtonsContainer(2);
              }}
            />
            <ButtonWS
              label="LOG OUT"
              size="large"
              alignSelf="center"
              fill
              onClick={() => logout()}
            />
          </Box>
        </Box>
      );
    }
  };

  return (
    <LandingPageLayout
      isLoading={!gameRoles}
      welcomeMessage={!!displayName ? `Welcome, ${displayName}` : 'Welcome'}
    >
      <>
        {buttonsContainer === 0 && renderMenuButtons()}
        {buttonsContainer === 1 && (
          <Box
            animation={{ type: 'slideUp', size: 'large', duration: 750 }}
            style={{ minHeight: '300px' }}
          >
            <Box direction="row" align="center" justify="between">
              <Box align="start" alignContent="center">
                <StyledClose
                  color="accent-1"
                  onClick={() => setButtonsContainer(0)}
                />
              </Box>
              <HeadingWS
                vtksReady={vtksReady}
                level={1}
                margin={{ vertical: 'small' }}
                size="small"
                textAlign="end"
              >
                {YOUR_GAMES_TITLE}
              </HeadingWS>
            </Box>
            {!!gameRoles && <GamesList gameRoles={gameRoles} />}
          </Box>
        )}
        {buttonsContainer === 2 && (
          <Box
            animation={{ type: 'slideUp', size: 'large', duration: 750 }}
            style={{ minHeight: '300px' }}
          >
            <Box direction="row" align="center" justify="between">
              <Box align="start" alignContent="center">
                <StyledClose
                  data-testid="create-game-close-icon"
                  color="accent-1"
                  onClick={() => setButtonsContainer(0)}
                  cursor="pointer"
                />
              </Box>
              <HeadingWS
                vtksReady={vtksReady}
                level={1}
                margin={{ vertical: 'small' }}
                size="small"
                textAlign="end"
              >
                {CREATE_GAME_TEXT}
              </HeadingWS>
            </Box>
            <CreateGameForm />
          </Box>
        )}
      </>
    </LandingPageLayout>
  );
};

export default MenuPage;
