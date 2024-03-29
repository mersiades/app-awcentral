import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Tip, Button, Header } from 'grommet';
import { useAuth0 } from '@auth0/auth0-react';

import CharacterPreview from './CharacterPreview';
import UnderConstructionDialog from '../components/dialogs/UnderConstructionDialog';
import { ThemeContext } from 'styled-components';
import { Character, GameRole } from '../@types/dataInterfaces';
import {
  accentColors,
  customDefaultButtonStyles,
} from '../config/grommetConfig';
import { useGame } from '../contexts/gameContext';
import { GAME_PAGE_TOP_NAVBAR_HEIGHT } from '../config/constants';

interface GameNavbarProps {
  isMc: boolean;
}

const GameNavbar: FC<GameNavbarProps> = ({ isMc }) => {
  // ----------------------------- Component state ------------------------------ //
  const [showConstructionDialog, setShowConstructionDialog] = useState(false);
  // ----------------------------- 3rd party hooks ------------------------------- //
  const navigate = useNavigate();
  const { logout } = useAuth0();

  // ----------------------------- Hooks ---------------------------------------- //
  const { game, otherPlayerGameRoles, allPlayerGameRoles } = useGame();

  // ----------------------------- Render ---------------------------------------- //
  const renderCharacterPreviews = (gameRoles: GameRole[]) => {
    return gameRoles.map((gameRole: GameRole) =>
      gameRole.characters?.map((character: Character) => (
        <Tip
          key={character.id}
          content={<CharacterPreview character={character} isMc={isMc} />}
        >
          <Button
            label={
              character.isDead ? `${character.name} [RIP]` : character.name
            }
            style={{
              backgroundColor: 'transparent',
              height: '4vh',
              lineHeight: '16px',
            }}
            name={`${character.name?.toLowerCase()}-preview-button`}
          />
        </Tip>
      ))
    );
  };

  return (
    <Header
      background={{ color: 'rgba(76, 104, 76, 0.5)' }}
      style={{ borderBottom: `1px solid ${accentColors[0]}` }}
      height={`${GAME_PAGE_TOP_NAVBAR_HEIGHT}px`}
    >
      {showConstructionDialog && (
        <UnderConstructionDialog
          handleClose={() => setShowConstructionDialog(false)}
        />
      )}
      {/*
        // @ts-ignore */}
      <ThemeContext.Extend value={customDefaultButtonStyles}>
        <Menu
          plain
          style={{ backgroundColor: 'transparent' }}
          dropBackground={{ color: 'rgba(76, 104, 76, 0.5)' }}
          dropAlign={ { top: 'bottom',}}
          label="AW Central"
          items={[
            { label: 'Main menu', onClick: () => navigate('/menu') },
            {
              label: 'Log out',
              onClick: () => logout(),
            },
          ]}
        />
        {isMc
          ? allPlayerGameRoles && renderCharacterPreviews(allPlayerGameRoles)
          : otherPlayerGameRoles &&
            renderCharacterPreviews(otherPlayerGameRoles)}
        {isMc && (
          <Button
            label="Threat map"
            style={{
              backgroundColor: 'transparent',
              height: '4vh',
              lineHeight: '16px',
            }}
            onClick={() => setShowConstructionDialog(true)}
          />
        )}
        {!!game && !game?.hasFinishedPreGame && (
          <Button
            label="Pre-game"
            onClick={() => navigate(`/pre-game/${game.id}`)}
            style={{
              backgroundColor: 'transparent',
              height: '4vh',
              lineHeight: '16px',
            }}
          />
        )}
        {/*
        // @ts-ignore */}
      </ThemeContext.Extend>
    </Header>
  );
};

export default GameNavbar;
