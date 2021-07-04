import React from 'react';
import { Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LandingPage from '../pages/LandingPage';
import MenuPage from '../pages/MenuPage';
import JoinGamePage from '../pages/JoinGamePage';
import CharacterCreationPage from '../pages/CharacterCreationPage';
import PlayerPage from '../pages/PlayerPage';
import MCPage from '../pages/MCPage';
import CreateGamePage from '../pages/CreateGamePage';
import PreGamePage from '../pages/PreGamePage';
import { ThreatMapProvider } from '../contexts/threatMapContext';
import ThreatMapPage from '../pages/ThreatMapPage';

const AppRouter = () => {
  return (
    <Switch>
      <PublicRoute exact path="/" component={LandingPage} />
      <PrivateRoute path="/menu" component={MenuPage} />
      <PrivateRoute path="/join-game" component={JoinGamePage} />
      <PrivateRoute path="/create-game/:gameId" component={CreateGamePage} />
      <PrivateRoute path="/pre-game/:gameId" component={PreGamePage} />
      <PrivateRoute path="/player-game/:gameId" component={PlayerPage} />
      <PrivateRoute path="/mc-game/:gameId" component={MCPage} />
      <PrivateRoute
        path="/threat-map/:gameId"
        component={() => (
          <DndProvider backend={HTML5Backend}>
            <ThreatMapProvider>
              <ThreatMapPage />
            </ThreatMapProvider>
          </DndProvider>
        )}
      />
      <PrivateRoute
        path="/character-creation/:gameId"
        component={CharacterCreationPage}
      />
    </Switch>
  );
};

export default AppRouter;
