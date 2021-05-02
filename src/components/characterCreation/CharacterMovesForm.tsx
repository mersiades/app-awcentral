import React, { FC, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Box, CheckBox, Text } from 'grommet';

import Spinner from '../Spinner';
import { accentColors, ButtonWS, HeadingWS, TextWS } from '../../config/grommetConfig';
import SET_CHARACTER_MOVES, { SetCharacterMovesData, SetCharacterMovesVars } from '../../mutations/setCharacterMoves';
import PLAYBOOK_CREATOR, { PlaybookCreatorData, PlaybookCreatorVars } from '../../queries/playbookCreator';
import { CharacterCreationSteps } from '../../@types/enums';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';

const StyledMarkdown = styled(ReactMarkdown)`
  & p {
    margin: unset;
    text-shadow: 0 0 1px #000, 0 0 3px #000;
  }
`;

export const INCREASED_BY_IMPROVEMENT_TEXT = '(increased by improvement)';

const CharacterMovesForm: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [selectedMoves, setSelectedMoves] = useState<{ id: string; name: string }[]>([]);
  let hasInitialised = useRef(false);
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();

  const allowedPlaybookMoves = character?.allowedPlaybookMoves;
  // const allowedOtherPlaybookMoves = character?.allowedOtherPlaybookMoves;

  // --------------------------------------------------3rd party hooks ----------------------------------------------------- //
  const history = useHistory();

  // --------------------------------------------------- Graphql hooks ----------------------------------------------------- //
  const { data: pbCreatorData } = useQuery<PlaybookCreatorData, PlaybookCreatorVars>(
    PLAYBOOK_CREATOR,
    // @ts-ignore
    { variables: { playbookType: character?.playbook }, skip: !character?.playbook }
  );

  const optionalMoves = pbCreatorData?.playbookCreator.optionalMoves;
  const defaultMoves = pbCreatorData?.playbookCreator.defaultMoves;
  const moveChoiceCount = pbCreatorData?.playbookCreator.moveChoiceCount;
  const defaultMoveIds = defaultMoves?.map((move) => move.id) as string[]; // This will never be undefined; playbooks have at least one default move
  const [setCharacterMoves, { loading: settingMoves }] = useMutation<SetCharacterMovesData, SetCharacterMovesVars>(
    SET_CHARACTER_MOVES
  );

  // ------------------------------------------ Component functions and variables ------------------------------------------ //
  const handleSelectMove = (move: Move) => {
    if (selectedMoves.some((item) => item.name === move.name)) {
      setSelectedMoves(selectedMoves.filter((item) => item.name !== move.name));
    } else {
      if (!!allowedPlaybookMoves && !!defaultMoves) {
        selectedMoves.length < allowedPlaybookMoves + defaultMoves.length &&
          setSelectedMoves([...selectedMoves, { id: move.id, name: move.name }]);
      }
    }
  };

  const handleSubmitCharacterMoves = async (moveIds: string[]) => {
    if (!!userGameRole && !!character && !!game) {
      try {
        await setCharacterMoves({
          variables: { gameRoleId: userGameRole.id, characterId: character.id, moveIds },
        });
        if (!character.hasCompletedCharacterCreation) {
          history.push(`/character-creation/${game.id}?step=${CharacterCreationSteps.setVehicle}`);
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ------------------------------------------------------ Effects -------------------------------------------------------- //

  // load in existing moves, but prevent duplicates
  useEffect(() => {
    if (!!character && !hasInitialised.current && !!optionalMoves && !!defaultMoves) {
      character.characterMoves.forEach((characterMove: CharacterMove) => {
        // The CharacterMoves have a different id, so need the original Move equivalent to the CharacterMove
        const originalMoves: Move[] = optionalMoves.concat(defaultMoves);
        const matchingMove: Move | undefined = originalMoves.find((om) => om.name === characterMove.name);
        !!matchingMove && setSelectedMoves((prevState) => [...prevState, { id: matchingMove.id, name: matchingMove.name }]);
      });
      hasInitialised.current = true;
    }
  }, [character, optionalMoves, defaultMoves]);

  if (!allowedPlaybookMoves || !defaultMoves) {
    return <Spinner />;
  }

  // -------------------------------------------------- Render component  ---------------------------------------------------- //
  return (
    <Box
      data-testid="character-moves-form"
      fill
      align="center"
      justify="start"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <Box width="85vw" align="start" style={{ maxWidth: '763px' }} margin={{ bottom: '24px' }}>
        <Box direction="row" fill="horizontal" justify="between" align="center">
          <HeadingWS
            level={2}
            crustReady={crustReady}
            textAlign="center"
            style={{ maxWidth: 'unset', height: '34px', lineHeight: '44px' }}
          >{`WHAT ARE ${!!character?.name ? character.name.toUpperCase() : '...'}'S MOVES?`}</HeadingWS>
          <ButtonWS
            primary
            label={settingMoves ? <Spinner fillColor="#FFF" width="37px" height="36px" /> : 'SET'}
            disabled={selectedMoves.length !== allowedPlaybookMoves + defaultMoves.length}
            onClick={() =>
              !settingMoves && handleSubmitCharacterMoves([...selectedMoves.map((mv) => mv.id), ...defaultMoveIds])
            }
          />
        </Box>

        <StyledMarkdown>
          {pbCreatorData?.playbookCreator.movesInstructions ? pbCreatorData.playbookCreator.movesInstructions : '...'}
        </StyledMarkdown>

        <Text size="large" weight="bold" margin={{ vertical: '12px' }}>
          Default moves
        </Text>
        {!!defaultMoves &&
          defaultMoves.map((move) => (
            <CheckBox key={move.id} checked label={<StyledMarkdown>{move.description}</StyledMarkdown>} />
          ))}
        {!!moveChoiceCount && !!allowedPlaybookMoves && moveChoiceCount > 0 && (
          <Box direction="row" align="center" gap="12px">
            <Text size="large" weight="bold" margin={{ vertical: '12px' }}>
              {`Select ${moveChoiceCount < allowedPlaybookMoves ? allowedPlaybookMoves : moveChoiceCount}`}
            </Text>
            {moveChoiceCount < allowedPlaybookMoves && (
              <TextWS color={accentColors[0]}>{INCREASED_BY_IMPROVEMENT_TEXT}</TextWS>
            )}
          </Box>
        )}
        <Box align="start" gap="12px">
          {!!optionalMoves &&
            optionalMoves.map((move) => {
              return (
                <CheckBox
                  key={move.id}
                  label={
                    <div>
                      <StyledMarkdown>{move.description}</StyledMarkdown>
                    </div>
                  }
                  checked={selectedMoves.some((mv) => mv.name === move.name)}
                  onChange={() => handleSelectMove(move)}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default CharacterMovesForm;
