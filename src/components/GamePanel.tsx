import React, { FC } from 'react';
import { Box, Button, Text, grommet, ThemeContext, Heading } from 'grommet';
import { Close, Edit, Trash } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import { accentColors } from '../config/grommetConfig';
import { Game } from '../@types';
import { Roles } from '../@types/enums';
import { useDiscordUser } from '../contexts/discordUserContext';

interface GamePanelProps {
  game: Game
  closePanel: (tab: number) => void;
  setShowDeleteGameDialog: (show: boolean) => void
}

const customDefaultButtonStyles = deepMerge(grommet, {
  button: {
    default: {},
    hover: {
      backgroundColor: `${accentColors[0]}`,
      extend: 'font-weight: 700; font-size: 40px;',
    },
    extend: `
    font-family: 'Vtks good luck for you', sans-serif;
    font-size: 36px;
    line-height: 36px;
    &:hover {
      background-color: ${accentColors[0]};
      color: #fff;
    };
    &:focus {
      outline: 0;
      box-shadow: none;
      background-color: ${accentColors[0]};
    }
    `,
  },
});


const GamePanel: FC<GamePanelProps> = ({ game, closePanel, setShowDeleteGameDialog }) => {
  const { username } = useDiscordUser()

  return (
      <Box fill justify="between">
        <div>
          <Box fill="horizontal" align="end" pad="small" animation="fadeIn">
            <Close color="accent-1" onClick={() => closePanel(3)} cursor="grab" />
          </Box>
          <Box direction="row" fill="horizontal" justify="between" align="center" pad="small" animation="fadeIn">
            <Heading level={3}>{game ? game.name : 'Game name'}</Heading>
            <Edit color="accent-1" onClick={() => console.log('clicked')} cursor="grab" />
          </Box>
          <Box fill="horizontal" pad="small" animation="fadeIn">
            <Heading level={3}>MC</Heading>
            <Text>{!!username ? username : "MC unknown"}</Text>
          </Box>
          <Box fill="horizontal" pad="small" animation="fadeIn">
            <Heading level={3}>Players</Heading>
            {
              game.gameRoles.filter((gameRole) => gameRole.role === Roles.player).length === 0 ? (
                <Box align="start" alignContent="center" margin={{ vertical: "small"}}><Text>No players yet</Text></Box>
              ) :
              game.gameRoles.filter((gameRole) => gameRole.role === Roles.player).map((gameRole) => gameRole.characters?.map((character) => (
                <Box key={character.name} direction="row" align="center" alignContent="end" fill margin={{ vertical: "small"}}>
                <Box align="start" fill>
                  <Text>{character.name}</Text>
                </Box>
                <Box align="end" fill>
                  <Trash color="accent-1" onClick={() => console.log('clicked')} cursor="grab" />
                </Box>
              </Box>
              )))
            }
            <Button label="INVITE PLAYER" primary size="large" alignSelf="center" fill="horizontal" onClick={() => console.log('clicked')} />
          </Box>
        </div>
        <div>
          <Box fill="horizontal" pad="small" animation="fadeIn" >
            <ThemeContext.Extend value={customDefaultButtonStyles}>
              <Button label="DELETE GAME" size="large" alignSelf="center" fill onClick={() => setShowDeleteGameDialog(true)} />
            </ThemeContext.Extend>
          </Box>
        </div>
      </Box>
  );
};

export default GamePanel;
