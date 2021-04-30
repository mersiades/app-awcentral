import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { Box, CheckBox } from 'grommet';

import Spinner from '../Spinner';
import { StyledMarkdown } from '../styledComponents';
import DialogWrapper from '../DialogWrapper';
import { ButtonWS, HeadingWS, improvementDialogBackground } from '../../config/grommetConfig';
import PLAYBOOK_CREATOR, { PlaybookCreatorData, PlaybookCreatorVars } from '../../queries/playbookCreator';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';

interface CharacterImprovementDialogProps {
  handleClose: () => void;
}

const CharacterImprovementDialog: FC<CharacterImprovementDialogProps> = ({ handleClose }) => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { character } = useGame();
  const { crustReady } = useFonts();

  // ------------------------------------------------------ GraphQL -------------------------------------------------------- //
  const { data: pbCreatorData } = useQuery<PlaybookCreatorData, PlaybookCreatorVars>(PLAYBOOK_CREATOR, {
    // @ts-ignore
    variables: { playbookType: character?.playbook },
    skip: !character,
  });
  const improvementBlock = pbCreatorData?.playbookCreator.improvementBlock;
  console.log(`improvementBlock`, improvementBlock);

  if (!improvementBlock) {
    return null;
  }

  // ------------------------------------------------------- Render -------------------------------------------------------- //
  return (
    <DialogWrapper background={improvementDialogBackground} handleClose={handleClose}>
      <Box gap="12px" overflow="auto">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          Improvements
        </HeadingWS>
        <StyledMarkdown>
          {!!improvementBlock?.improvementInstructions ? improvementBlock?.improvementInstructions : '...'}
        </StyledMarkdown>
        <Box direction="row" justify="between" align="center">
          <HeadingWS crustReady={crustReady} level={5} alignSelf="start" margin={{ vertical: '12px' }}>
            {`You can select ${character?.allowedImprovements} ${
              character?.allowedImprovements === 1 ? 'improvement' : 'improvements'
            }`}
          </HeadingWS>
          <ButtonWS
            label={true ? <Spinner fillColor="#FFF" width="37px" height="36px" /> : 'SET'}
            primary
            onClick={() => console.log('clicked')}
          />
        </Box>
        <Box direction="row" justify="between" align="start" flex="grow" gap="24px">
          <Box gap="12px" width="100%">
            {improvementBlock?.improvementMoves.length > 0 ? (
              improvementBlock?.improvementMoves.map((move) => (
                <CheckBox
                  key={move.id}
                  label={
                    <div>
                      <StyledMarkdown>{move.description}</StyledMarkdown>
                    </div>
                  }
                />
              ))
            ) : (
              <Spinner fillColor="#FFF" width="100%" />
            )}
          </Box>
          <Box gap="12px" width="100%">
            {improvementBlock?.futureImprovementMoves.length > 0 ? (
              improvementBlock?.futureImprovementMoves.map((move) => (
                <CheckBox
                  key={move.id}
                  label={
                    <div>
                      <StyledMarkdown>{move.description}</StyledMarkdown>
                    </div>
                  }
                  disabled={!!character && character.improvementMoves.length <= 5}
                />
              ))
            ) : (
              <Spinner fillColor="#FFF" width="100%" />
            )}
          </Box>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default CharacterImprovementDialog;
