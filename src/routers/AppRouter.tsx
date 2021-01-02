import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import { Box } from 'grommet';
import PrivateRoute from './PrivateRoute';
import MenuPage from '../components/MenuPage';
import PublicRoute from './PublicRoute';
import CharacterCreator from '../components/CharacterCreator';
import { KeycloakUserContext } from '../contexts/keycloakUserContext';
import { KeycloakUser, KeycloakUserInfo } from '../@types';
import PlayerPage from '../components/PlayerPage';
import MCPage from '../components/MCPage';
import JoinGamePage from '../components/JoinGamePage';
import CreateGamePage from '../components/CreateGamePage';
import { TextWS } from '../config/grommetConfig';

const AppRouter = () => {
  const [user, setUser] = useState<KeycloakUser | undefined>();
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    const getUser = async () => {
      if (initialized && !!keycloak && keycloak.authenticated) {
        const { sub, email, preferred_username } = (await keycloak.loadUserInfo()) as KeycloakUserInfo;
        setUser({ id: sub, email, username: preferred_username });
      }
    };

    getUser();
  }, [keycloak, initialized]);

  if (!initialized) {
    return (
      <Box fill background="black" justify="center" align="center">
        <TextWS>initializing...</TextWS>
      </Box>
    );
  }

  return (
    <Box fill>
      <KeycloakUserContext.Provider value={{ ...user }}>
        <Switch>
          <PublicRoute exact path="/" component={LandingPage} />
          <PrivateRoute path="/menu" component={MenuPage} />
          <PrivateRoute path="/join-game" component={JoinGamePage} />
          <PrivateRoute path="/create-game/:gameId" component={CreateGamePage} />
          <PrivateRoute path="/player-game/:gameId" component={PlayerPage} />
          <PrivateRoute path="/mc-game/:gameId" component={MCPage} />
          <PrivateRoute path="/new-game/:gameId" component={CharacterCreator} />
        </Switch>
      </KeycloakUserContext.Provider>
    </Box>
  );
};

export default AppRouter;
