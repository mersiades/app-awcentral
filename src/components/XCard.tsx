import { Tip } from 'grommet';
import React, { FC } from 'react';

import xCard from '../assets/x-card.png';
import { StyledMarkdown } from './styledComponents';

const X_CARD_CONTENT =
  '_“I’d like your help. Your help to make this game fun for everyone. If anything makes anyone uncomfortable in any way, click on this X-Card icon. You don’t have to explain why. It doesn\'t matter why. When we see that the X-Card has been played, we simply edit out anything X-Carded. And if there is ever an issue, anyone can call for a break and we can talk privately. I know it sounds funny but it will help us play amazing games together and usually I’m the one who uses the X-Card to help take care of myself. Please help make this game fun for everyone. Thank you!"_\n' +
  '\n' +
  'The X-Card was created by **John Stavropoulos** and you can by right-clicking the icon.';

const MC_INTRO = 'This message is shown to your players, on your behalf: \n\n';

const PLAYER_INTRO = "Here's a message from your MC: \n\n";

interface XCardProps {
  isMC: boolean;
}

const XCard: FC<XCardProps> = ({ isMC }) => {
  const intro = isMC ? MC_INTRO : PLAYER_INTRO;
  const tipContent = <StyledMarkdown>{intro + X_CARD_CONTENT}</StyledMarkdown>;

  const handleRightClick = () => window.open('http://tinyurl.com/x-card-rpg');
  return (
    <Tip content={tipContent}>
      <img
        src={xCard}
        style={{ height: '64px', width: '64px', cursor: 'pointer' }}
        onClick={() => console.log('clicked')}
        onContextMenu={(e) => {
          e.preventDefault();
          handleRightClick();
          return false;
        }}
        alt="X-Card icon"
      />
    </Tip>
  );
};

export default XCard;
