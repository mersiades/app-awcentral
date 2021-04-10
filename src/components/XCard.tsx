import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Tip } from 'grommet';

import { StyledMarkdown } from './styledComponents';
import PLAY_X_CARD, { PlayXCardData, PlayXCardVars } from '../mutations/playXCard';
import { useGame } from '../contexts/gameContext';
import xCard from '../assets/x-card.png';
import Spinner from './Spinner';

export const X_CARD_CONTENT =
  '_“I’d like your help. Your help to make this game fun for everyone. If anything makes anyone uncomfortable in any way, click on this X-Card icon. You don’t have to explain why. It doesn\'t matter why. When we see that the X-Card has been played, we simply edit out anything X-Carded. And if there is ever an issue, anyone can call for a break and we can talk privately. I know it sounds funny but it will help us play amazing games together and usually I’m the one who uses the X-Card to help take care of myself. Please help make this game fun for everyone. Thank you!"_\n' +
  '\n' +
  'The X-Card was created by **John Stavropoulos** and you can by right-clicking the icon.';

const MC_INTRO = 'This message is shown to your players, on your behalf: \n\n';

const PLAYER_INTRO = "Here's a message from your MC: \n\n";

interface XCardProps {
  isMC: boolean;
}

const XCard: FC<XCardProps> = ({ isMC }) => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game } = useGame();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const [playXCard, { loading: playingXCard }] = useMutation<PlayXCardData, PlayXCardVars>(PLAY_X_CARD);

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  const intro = isMC ? MC_INTRO : PLAYER_INTRO;

  const handleRightClick = () => window.open('http://tinyurl.com/x-card-rpg');

  const handleClick = async () => {
    if (!!game) {
      try {
        await playXCard({ variables: { gameId: game.id } });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // -------------------------------------------------- Render component  ---------------------------------------------------- //
  const tipContent = <StyledMarkdown>{intro + X_CARD_CONTENT}</StyledMarkdown>;

  return (
    <Tip content={tipContent}>
      <Box height="64px" width="64px" align="center" justify="center">
        {!playingXCard ? (
          <img
            src={xCard}
            style={{ height: '64px', width: '64px', cursor: 'pointer' }}
            onClick={() => handleClick()}
            onContextMenu={(e) => {
              e.preventDefault();
              handleRightClick();
              return false;
            }}
            alt="X-Card icon"
          />
        ) : (
          <Spinner />
        )}
      </Box>
    </Tip>
  );
};

export default XCard;
