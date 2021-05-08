import React, { FC, useState } from 'react';
import { Box, CheckBox } from 'grommet';

import CollapsiblePanelBox from '../CollapsiblePanelBox';
import { useGame } from '../../contexts/gameContext';
import { brandColor, ButtonWS, HeadingWS, TextWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import styled from 'styled-components';
import CharacterImprovementDialog from '../dialogs/CharacterImprovementDialog';
import { useMutation } from '@apollo/client';
import SPEND_EXPERIENCE, {
  SpendExperienceData,
  spendExperienceOR,
  SpendExperienceVars,
} from '../../mutations/spendExperience';
import { StyledMarkdown } from '../styledComponents';

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

export const IMPROVEMENT_INSTRUCTIONS =
  'Whenever you roll a highlighted stat, and whenever you reset your Hx with someone, an experience circle will be marked. When the 5th is marked, you can make an improvement.';

const ImprovementBox: FC<ImprovementBoxProps> = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showDialog, setShowDialog] = useState(false);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { character, userGameRole } = useGame();
  const experience = character?.experience;
  const allowedImprovements = character?.allowedImprovements;
  const { crustReady } = useFonts();

  // ------------------------------------------------------ GraphQL -------------------------------------------------------- //
  const [spendExperience, { loading: spendingExperience }] = useMutation<SpendExperienceData, SpendExperienceVars>(
    SPEND_EXPERIENCE
  );

  // ------------------------------------------------ Component functions -------------------------------------------------- //
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

  let unAllocatedImprovements: number | undefined;
  if (allowedImprovements !== undefined && !!character) {
    unAllocatedImprovements =
      allowedImprovements - (character.improvementMoves.length + character.futureImprovementMoves.length);
  }

  const handleClickImprove = async () => {
    // spend experience if necessary
    if (!!userGameRole && !!character && experience !== undefined && experience >= 5) {
      try {
        await spendExperience({
          variables: { gameRoleId: userGameRole.id, characterId: character.id },
          optimisticResponse: spendExperienceOR(character),
        });
        setShowDialog(true);
      } catch (error) {
        console.log(`error`, error);
      }
    } else {
      setShowDialog(true);
    }
  };

  return (
    <CollapsiblePanelBox open title="Improvement">
      <Box fill="horizontal" align="start" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
        {showDialog && <CharacterImprovementDialog handleClose={() => setShowDialog(false)} />}
        <Box fill="horizontal" pad="12px">
          <TextWS>{IMPROVEMENT_INSTRUCTIONS}</TextWS>
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
              <ButtonWS
                label="IMPROVE"
                primary
                disabled={experience < 5 && unAllocatedImprovements === 0}
                onClick={() => !spendingExperience && handleClickImprove()}
              />
            </Box>
          )}
          {character?.improvementMoves.map((move) => (
            <CheckBox key={move.id} label={<StyledMarkdown>{move.description}</StyledMarkdown>} checked disabled />
          ))}
        </Box>
      </Box>
    </CollapsiblePanelBox>
  );
};

export default ImprovementBox;
