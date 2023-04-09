import { useCallback } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';

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
import { LS_PATHNAME } from '../config/constants';

// @ts-ignore istanbul ignore else
const isCypress = !!window.Cypress;

const AppRouter = () => {

  let location = useLocation();

  const handleUnload = useCallback(() => {
    localStorage.setItem(LS_PATHNAME, location.pathname)
  }, [location])

  useBeforeunload(() => !isCypress && handleUnload())
  
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
    </Routes>
  );
};

export default AppRouter;
