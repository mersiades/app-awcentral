import React, { FC, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Box } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

import CollapsiblePanelBox from '../CollapsiblePanelBox';
import {
  RedBox,
  HeadingWS,
  brandColor,
  TextWS
} from '../../config/grommetConfig';
import ALL_MOVES, { AllMovesData } from '../../queries/allMoves';
import { MoveActionType, MoveType, RollType } from '../../@types/enums';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { decapitalize } from '../../helpers/decapitalize';
import {
  ARMOR_TEXT,
  GANG_MOVES,
  GO_AGGRO_NAME,
  HARM_TEXT,
  SIZE_TEXT,
  SUCKER_SOMEONE_NAME,
  TAGS_TEXT
} from '../../config/constants';
import { useMoves } from '../../contexts/movesContext';

interface GangBoxProps {
  navigateToCharacterCreation: (step: string) => void;
  openDialog: (move: Move | CharacterMove) => void;
}

const GangBox: FC<GangBoxProps> = ({ navigateToCharacterCreation }) => {
  // ----------------------------- Component state -------------------------- //
  const [showMoves, setShowMoves] = useState(false);
  const [gangMoves, setGangMoves] = useState<Move[]>([]);

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { character, userGameRole } = useGame();
  const {
    makePrintMove,
    makeStatsRollMove,
    rollingMove
  } = useMoves();

  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- GraphQL ---------------------------------- //
  const { data: allMovesData } = useQuery<AllMovesData>(ALL_MOVES);

  // ----------------------------- Component functions ---------------------- //
  const moveStyle = {
    cursor: 'pointer',
    '&:hover': {
      color: brandColor
    }
  };

  const handleStatRollMove = (move: Move | CharacterMove) => {
    if (
      gameId &&
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      userGameRole.characters.length === 1 &&
      !rollingMove
    ) {
      try {
        makeStatsRollMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            moveId: move.id,
            isGangMove: true
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRollClick = (move: Move | CharacterMove) => {
    switch (move.moveAction?.rollType) {
      case RollType.stat:
        handleStatRollMove(move);
        break;
      default:
    }
  };

  const handlePrintMove = (move: Move | CharacterMove) => {
    if (
      gameId &&
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove
    ) {
      try {
        makePrintMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            moveId: move.id,
            isGangMove: true
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleMoveClick = (move: Move | CharacterMove) => {
    switch (move.moveAction?.actionType) {
      case MoveActionType.roll:
        handleRollClick(move);
        break;
      case MoveActionType.print:
      // Deliberately falls through
      default:
        handlePrintMove(move);
    }
  };

  useEffect(() => {
    if (!!allMovesData) {
      const gangMoves = allMovesData?.allMoves.filter(
        (move) => move.kind === MoveType.battle
      ) as Move[];
      gangMoves.push(
        allMovesData?.allMoves.find(
          (move) => move.name === GO_AGGRO_NAME
        ) as Move
      );
      gangMoves.push(
        allMovesData?.allMoves.find(
          (move) => move.name === SUCKER_SOMEONE_NAME
        ) as Move
      );
      setGangMoves(gangMoves);
    }
  }, [allMovesData]);

  return (
    <CollapsiblePanelBox
      open
      title='Gang'
      navigateToCharacterCreation={navigateToCharacterCreation}
      targetCreationStep='6'
    >
      <Box
        fill='horizontal'
        align='start'
        animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      >
        <Box
          fill='horizontal'
          direction='row'
          align='center'
          justify='start'
          wrap
          gap='12px'
          pad='12px'
        >
          <Box
            data-testid='gang-size-box'
            align='center'
            justify='between'
            height='90px'
            gap='6px'
            margin={{ bottom: '6px' }}
          >
            <RedBox pad='12px' align='center' fill justify='center'>
              <HeadingWS
                crustReady={crustReady}
                level={3}
                margin={{ horizontal: '9px', bottom: '-3px', top: '3px' }}
              >
                {character?.playbookUniques?.gang?.size}
              </HeadingWS>
            </RedBox>
            <TextWS style={{ fontWeight: 600 }}>{SIZE_TEXT}</TextWS>
          </Box>
          <Box
            data-testid='gang-harm-box'
            align='center'
            justify='between'
            height='90px'
            gap='6px'
            margin={{ bottom: '6px' }}
          >
            <RedBox
              align='center'
              width='50px'
              fill='vertical'
              justify='center'
            >
              <HeadingWS
                crustReady={crustReady}
                level='2'
                margin={{
                  left: '9px',
                  right: '9px',
                  bottom: '3px',
                  top: '9px'
                }}
              >
                {character?.playbookUniques?.gang?.harm}
              </HeadingWS>
            </RedBox>
            <TextWS style={{ fontWeight: 600 }}>{HARM_TEXT}</TextWS>
          </Box>
          <Box
            data-testid='gang-armor-box'
            align='center'
            justify='between'
            height='90px'
            gap='6px'
            margin={{ bottom: '6px' }}
          >
            <RedBox
              align='center'
              width='50px'
              fill='vertical'
              justify='center'
            >
              <HeadingWS
                crustReady={crustReady}
                level='2'
                margin={{
                  left: '9px',
                  right: '9px',
                  bottom: '3px',
                  top: '9px'
                }}
              >
                {character?.playbookUniques?.gang?.armor}
              </HeadingWS>
            </RedBox>
            <TextWS style={{ fontWeight: 600 }}>{ARMOR_TEXT}</TextWS>
          </Box>
          <Box
            data-testid='gang-tags-box'
            align='center'
            justify='between'
            height='90px'
            gap='6px'
            margin={{ bottom: '6px' }}
          >
            <RedBox pad='12px' fill justify='center'>
              <TextWS>
                {character?.playbookUniques?.gang?.tags.join(', ')}
              </TextWS>
            </RedBox>
            <TextWS style={{ fontWeight: 600 }}>{TAGS_TEXT}</TextWS>
          </Box>
        </Box>
        <Box
          direction='row'
          justify='between'
          fill='horizontal'
          align='center'
          pad='12px'
        >
          <HeadingWS
            level='4'
            margin={{ vertical: '3px' }}
            onClick={() => setShowMoves(!showMoves)}
            style={{ cursor: 'pointer' }}
          >
            {GANG_MOVES}
          </HeadingWS>
          {showMoves ? (
            <FormUp
              data-testid='hide-gang-moves-icon'
              onClick={() => setShowMoves(false)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <FormDown
              data-testid='show-gang-moves-icon'
              onClick={() => setShowMoves(true)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </Box>
        {showMoves && (
          <Box pad='12px'>
            <Box
              fill='horizontal'
              align='start'
              animation={{
                type: 'fadeIn',
                delay: 0,
                duration: 500,
                size: 'xsmall'
              }}
            >
              {gangMoves.map((move) => {
                return (
                  <HeadingWS
                    key={move.id}
                    crustReady={crustReady}
                    level='3'
                    margin={{ top: '3px', bottom: '3px' }}
                    onClick={() => handleMoveClick(move)}
                    onMouseOver={(e: React.MouseEvent<HTMLHeadingElement>) =>
                      // @ts-ignore
                      (e.target.style.color = '#CD3F3E')
                    }
                    onMouseOut={(e: React.MouseEvent<HTMLHeadingElement>) =>
                      // @ts-ignore
                      (e.target.style.color = '#FFF')
                    }
                    style={moveStyle}
                  >
                    {decapitalize(move.name)}
                  </HeadingWS>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </CollapsiblePanelBox>
  );
};

export default GangBox;
