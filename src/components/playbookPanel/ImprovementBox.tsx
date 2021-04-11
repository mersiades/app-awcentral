import React, { FC } from 'react';
import { Box } from 'grommet';

import CollapsiblePanelBox from '../CollapsiblePanelBox';
import { useGame } from '../../contexts/gameContext';
import { brandColor, ButtonWS, HeadingWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import styled from 'styled-components';

interface ImprovementBoxProps {}

const FilledExperience = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: ${brandColor};
  box-shadow: 0 0 5px 1px #000;
  cursor: default;
`;

const UnfilledExperience = styled.div`
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border-color: ${brandColor};
  border-width: 2px;
  border-style: solid;
  box-shadow: 0 0 5px 1px #000;
  cursor: default;
`;

const OverflowPill = styled.div`
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 25px;
  border-radius: 15px;
  border-color: ${brandColor};
  border-width: 2px;
  border-style: solid;
  box-shadow: 0 0 5px 1px #000;
  cursor: default;
`;

const ImprovementBox: FC<ImprovementBoxProps> = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { character } = useGame();
  const experience = character?.experience;
  // console.log(`character`, character);

  const { crustReady } = useFonts();

  let experiences: { filled: boolean }[] = [];
  let overflow: number | undefined;
  if (experience !== undefined) {
    if (experience > 5) {
      overflow = experience - 5;
    }

    let countdown = experience;
    for (let i = 0; i < 5; i++) {
      experiences.push({ filled: countdown > 0 });
      countdown--;
    }
  }

  return (
    <CollapsiblePanelBox open title="Improvement">
      <Box fill="horizontal" align="start" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
        <Box fill="horizontal" pad="12px">
          {experience !== undefined && (
            <Box fill="horizontal" direction="row" align="center" justify="between">
              <HeadingWS level={4} crustReady={crustReady}>
                Experience
              </HeadingWS>
              <Box direction="row" align="center" gap="6px" margin={{ horizontal: '6px' }}>
                {experiences?.map((ex, index) =>
                  ex.filled ? (
                    <FilledExperience key={index} data-testid="filled-circle" />
                  ) : (
                    <UnfilledExperience key={index} data-testid="unfilled-circle" />
                  )
                )}
                {!!overflow && <OverflowPill>{`+ ${overflow}`}</OverflowPill>}
              </Box>
              <ButtonWS label="IMPROVE" primary disabled={experience < 5} />
            </Box>
          )}
        </Box>
      </Box>
    </CollapsiblePanelBox>
  );
};

export default ImprovementBox;
