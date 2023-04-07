// import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
import ThreatMapPage from '../pages/ThreatMapPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute/>}>
        <Route path="/" element={<LandingPage/>}/>
      </Route>
      <Route path="/" element={<PrivateRoute/>}>
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/join-game" element={<JoinGamePage/>} />
        <Route path="/create-game/:gameId" element={<CreateGamePage/>} />
        <Route path="/pre-game/:gameId" element={<PreGamePage/>} />
        <Route path="/player-game/:gameId" element={<PlayerPage/>} />
        <Route path="/mc-game/:gameId" element={<MCPage/>} />
        <Route path="/threat-map/:gameId" element={<ThreatMapPage/>} />
        <Route
          path="/character-creation/:gameId"
          element={<CharacterCreationPage/>}
        />
      </Route>
      {/*<PublicRoute exact path="/" component={LandingPage} />*/}
      {/*<PrivateRoute path="/menu" component={MenuPage} />*/}
      {/*<PrivateRoute path="/join-game" component={JoinGamePage} />*/}
      {/*<PrivateRoute path="/create-game/:gameId" component={CreateGamePage} />*/}
      {/*<PrivateRoute path="/pre-game/:gameId" component={PreGamePage} />*/}
      {/*<PrivateRoute path="/player-game/:gameId" component={PlayerPage} />*/}
      {/*<PrivateRoute path="/mc-game/:gameId" component={MCPage} />*/}
      {/*<PrivateRoute path="/threat-map/:gameId" component={ThreatMapPage} />*/}
      {/*<PrivateRoute*/}
      {/*  path="/character-creation/:gameId"*/}
      {/*  component={CharacterCreationPage}*/}
      {/*/>*/}
    </Routes>
  );
};

export default AppRouter;
