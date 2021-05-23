import React, { FC, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Box, Image, Grid } from 'grommet';

import CreateGameForm from '../components/CreateGameForm';
import GamesList from '../components/GamesList';
import Spinner from '../components/Spinner';
import { useKeycloakUser } from '../contexts/keycloakUserContext';
import GAMEROLES_BY_USER_ID, { GameRolesByUserIdData, GameRolesByUserIdVars } from '../queries/gameRolesByUserId';
import { background, ButtonWS, HeadingWS, StyledClose } from '../config/grommetConfig';
import '../assets/styles/transitions.css';
import { useFonts } from '../contexts/fontContext';
import { useGame } from '../contexts/gameContext';
import { RETURN_TO_GAME_TEXT, JOIN_GAME_TEXT, CREATE_GAME_TEXT, YOUR_GAMES_TITLE } from '../config/constants';
import { logAmpEvent } from '../config/amplitudeConfig';

const MenuPage: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [buttonsContainer, setButtonsContainer] = useState(0);

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //
  const { keycloak } = useKeycloak();
  const history = useHistory();

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { username, id: keycloakId } = useKeycloakUser();
  const { clearGameContext } = useGame();
  const { vtksReady } = useFonts();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data } = useQuery<GameRolesByUserIdData, GameRolesByUserIdVars>(GAMEROLES_BY_USER_ID, {
    // @ts-ignore
    variables: { id: keycloakId },
    skip: !keycloakId,
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000 * 60 * 60, // Once an hour
  });
  const gameRoles = data?.gameRolesByUserId;

  // ------------------------------------------------------- Effects -------------------------------------------------------- //

  useEffect(() => {
    !!clearGameContext && clearGameContext();
  }, [clearGameContext]);

  // ------------------------------------------------------ Render -------------------------------------------------------- //

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
              onClick={() => history.push('/join-game')}
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
            <ButtonWS label="LOG OUT" size="large" alignSelf="center" fill onClick={() => keycloak.logout()} />
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box data-testid="menu-page" fill background={background}>
      {!gameRoles && (
        <div style={{ position: 'absolute', top: 'calc(50vh - 12px)', left: 'calc(50vw - 12px)' }}>
          <Spinner />
        </div>
      )}
      <Grid
        rows={['49%', '49%', '2%']}
        columns={['18%', 'auto', '18%']}
        gap={{ column: 'xsmall', row: 'none' }}
        fill
        responsive
        areas={[
          { name: 'leftMargin', start: [0, 0], end: [0, 2] },
          { name: 'centerTop', start: [1, 0], end: [1, 0] },
          { name: 'centerBottom', start: [1, 1], end: [1, 1] },
          { name: 'centerFooter', start: [1, 2], end: [1, 2] },
          { name: 'rightMargin', start: [2, 0], end: [2, 2] },
        ]}
      >
        <Box gridArea="leftMargin" />
        <Box gridArea="centerTop">
          <HeadingWS level="4">{username && `Welcome, ${username}`}</HeadingWS>
        </Box>
        <Box gridArea="centerBottom">
          <Grid
            rows={['full']}
            columns={[
              ['250px', '450px'],
              ['5%', 'auto'],
              ['250px', '450px'],
            ]}
            fill
            justifyContent="between"
            areas={[
              { name: 'buttonsContainer', start: [0, 0], end: [0, 0] },
              { name: 'spacer', start: [1, 0], end: [1, 0] },
              { name: 'titleContainer', start: [2, 0], end: [2, 0] },
            ]}
          >
            <Box gridArea="buttonsContainer" alignSelf="end">
              {buttonsContainer === 0 && renderMenuButtons()}
              {buttonsContainer === 1 && (
                <Box animation={{ type: 'slideUp', size: 'large', duration: 750 }} style={{ minHeight: '300px' }}>
                  <Box direction="row" align="center" justify="between">
                    <Box align="start" alignContent="center">
                      <StyledClose color="accent-1" onClick={() => setButtonsContainer(0)} />
                    </Box>
                    <HeadingWS vtksReady={vtksReady} level={1} margin={{ vertical: 'small' }} size="small" textAlign="end">
                      {YOUR_GAMES_TITLE}
                    </HeadingWS>
                  </Box>
                  {!!gameRoles && <GamesList gameRoles={gameRoles} />}
                </Box>
              )}
              {buttonsContainer === 2 && (
                <Box animation={{ type: 'slideUp', size: 'large', duration: 750 }} style={{ minHeight: '300px' }}>
                  <Box direction="row" align="center" justify="between">
                    <Box align="start" alignContent="center">
                      <StyledClose
                        data-testid="create-game-close-icon"
                        color="accent-1"
                        onClick={() => setButtonsContainer(0)}
                        cursor="pointer"
                      />
                    </Box>
                    <HeadingWS vtksReady={vtksReady} level={1} margin={{ vertical: 'small' }} size="small" textAlign="end">
                      {CREATE_GAME_TEXT}
                    </HeadingWS>
                  </Box>
                  <CreateGameForm />
                </Box>
              )}
            </Box>
            <Box gridArea="spacer" alignSelf="end" />
            <Box gridArea="titleContainer" alignSelf="end">
              <Box>
                <Image
                  fit="contain"
                  fill={true}
                  src="images/cover-title.png"
                  alt="D. Vincent Baker & Meguey Baker Apocalypse World"
                />
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box gridArea="rightMargin" />
      </Grid>
    </Box>
  );
};

export default MenuPage;
