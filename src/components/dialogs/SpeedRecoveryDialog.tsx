import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Box, RadioButtonGroup } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  speedRecoveryBackground,
} from '../../config/grommetConfig';
import PERFORM_STOCK_MOVE, {
  PerformStockMoveData,
  PerformStockMoveVars,
} from '../../mutations/performStockMove';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { StyledMarkdown } from '../styledComponents';
import { logAmpEvent } from '../../config/amplitudeConfig';
import {
  CANCEL_TEXT,
  SPEED_RECOVERY_TEXT,
  USE_STOCK_TEXT,
} from '../../config/constants';

interface SpeedRecoveryDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const SpeedRecoveryDialog: FC<SpeedRecoveryDialogProps> = ({
  move,
  handleClose,
}) => {
  // ----------------------------- Component state ------------------------------ //
  const [option, setOption] = useState<'Yes' | 'No'>('Yes');
  // ----------------------------- 3rd party hooks ------------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ---------------------------------------- //
  const { crustReady } = useFonts();
  const { userGameRole, character } = useGame();

  // ----------------------------- GraphQL -------------------------------------- //
  const [performStockMove, { loading: performingStockMove }] = useMutation<
    PerformStockMoveData,
    PerformStockMoveVars
  >(PERFORM_STOCK_MOVE);

  // ----------------------------- Component functions ------------------------- //
  const currentStock = character?.playbookUniques?.angelKit?.stock || 0;

  const handleStockMove = async () => {
    const stockSpent = option === 'Yes' ? 1 : 0;
    if (currentStock - stockSpent < 0) {
      console.warn("You don't have enough stock");
      return;
    }
    if (
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !performingStockMove
    ) {
      try {
        await performStockMove({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            moveName: move.name,
            stockSpent,
          },
        });
        logAmpEvent('make move', { move: move.name });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ----------------------------- Render ---------------------------------------- //

  return (
    <DialogWrapper
      background={speedRecoveryBackground}
      handleClose={handleClose}
    >
      <Box gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <Box
          direction="column"
          align="center"
          justify="start"
          gap="12px"
          margin={{ bottom: '12px' }}
        >
          <Box align="start">
            <ParagraphWS>{USE_STOCK_TEXT}</ParagraphWS>
            <RadioButtonGroup
              name="use-stock"
              options={['Yes', 'No']}
              value={option}
              onChange={(e: any) => setOption(e.target.value)}
              alignSelf="start"
            />
          </Box>
        </Box>
        <Box fill="horizontal" direction="row" justify="end" gap="small">
          <ButtonWS
            label={CANCEL_TEXT}
            style={{
              background: 'transparent',
              textShadow:
                '0 0 1px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000',
            }}
            onClick={handleClose}
          />
          <ButtonWS
            label={SPEED_RECOVERY_TEXT}
            primary
            onClick={() => !performingStockMove && handleStockMove()}
            disabled={performingStockMove}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default SpeedRecoveryDialog;
