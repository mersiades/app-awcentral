import React, { FC } from 'react';
import { Heading } from 'grommet';

import { accentColors, RedBox } from '../config/grommetConfig';
import { CharacterStat } from '../@types/dataInterfaces';

interface StatBoxProps {
  stat: CharacterStat;
  handleClick?: () => void;
}

const StatBox: FC<StatBoxProps> = ({ stat, handleClick }) => {
  const statBoxStyle = (isHighlighted: boolean) => ({
    backgroundColor: isHighlighted ? accentColors[2] : '#000',
    cursor: !handleClick ? 'default' : 'pointer',
  });

  return (
    <RedBox
      data-testid={`${stat.stat}-stat-box`}
      align="center"
      width="76px"
      style={statBoxStyle(stat.isHighlighted)}
      onClick={handleClick}
    >
      <Heading
        aria-label={`${stat.stat.toLowerCase()}-value`}
        level="2"
        margin={{ left: '6px', right: '6px', bottom: '3px', top: '9px' }}
      >
        {stat.value}
      </Heading>
      <Heading
        level="3"
        margin={{ left: '6px', right: '6px', bottom: '3px', top: '3px' }}
      >
        {stat.stat}
      </Heading>
    </RedBox>
  );
};

export default StatBox;
