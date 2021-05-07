import React, { FC, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Box, CheckBox } from 'grommet';

import Spinner from '../Spinner';
import { StyledMarkdown } from '../styledComponents';
import DialogWrapper from '../DialogWrapper';
import { ButtonWS, HeadingWS, improvementDialogBackground } from '../../config/grommetConfig';
import PLAYBOOK_CREATOR, { PlaybookCreatorData, PlaybookCreatorVars } from '../../queries/playbookCreator';
import ADJUST_IMPROVEMENTS, {
  AdjustImprovementsData,
  adjustImprovementsOR,
  AdjustImprovementsVars,
} from '../../mutations/adjustImprovements';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { Move } from '../../@types/staticDataInterfaces';
import {
  ADD_OTHER_PB_MOVE_IMPROVEMENT_NAMES,
  ADD_PLAYBOOK_MOVE_IMPROVEMENT_NAMES,
  ADD_UNIQUE_IMPROVEMENT_NAMES,
  ADD_VEHICLE_NAME,
  ADJUST_UNIQUE_IMPROVEMENT_NAMES,
  IMPROVE_STAT_IMPROVEMENT_NAMES,
} from '../../config/constants';

const getNavDestinationForNewImprovement = (
  oldImprovementNames: string[],
  newImprovementNames: string[],
  gameId: string
): string | undefined => {
  // Get the name of the newly-chosen improvement
  const newImprovement = newImprovementNames.filter((imp) => oldImprovementNames.indexOf(imp) === -1)[0];

  // If it's an IMPROVE_STAT improvement, navigate nowhere
  if (IMPROVE_STAT_IMPROVEMENT_NAMES.includes(newImprovement)) {
    return undefined;
  }

  // If it's an ADD_CHARACTER_MOVE or ADD_OTHER_PB_MOVE improvement, navigate to the Moves page
  if (
    ADD_PLAYBOOK_MOVE_IMPROVEMENT_NAMES.includes(newImprovement) ||
    ADD_OTHER_PB_MOVE_IMPROVEMENT_NAMES.includes(newImprovement)
  ) {
    return `/character-creation/${gameId}?step=7`;
  }

  // If it's ADJUST_UNIQUE or ADD_UNIQUE improvement, navigate to the character's Unique page
  if (ADJUST_UNIQUE_IMPROVEMENT_NAMES.includes(newImprovement) || ADD_UNIQUE_IMPROVEMENT_NAMES.includes(newImprovement)) {
    return `/character-creation/${gameId}?step=6`;
  }

  if (newImprovement === ADD_VEHICLE_NAME) {
    return `/character-creation/${gameId}?step=8`;
  }

  // TODO: handle GENERIC_INCREASE_STAT improvements
  // TODO: handle RETIRE improvements
  // TODO: handle ADD_SECOND_CHARACTER improvements
  // TODO: handle CHANGE_PLAYBOOK improvements
  // TODO: handle IMPROVE_BASIC_MOVES improvements
};

interface CharacterImprovementDialogProps {
  handleClose: () => void;
}

const CharacterImprovementDialog: FC<CharacterImprovementDialogProps> = ({ handleClose }) => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [selectedImprovements, setSelectedImprovements] = useState<{ id: string; name: string }[]>([]);
  const [selectedFutureImprovements, setSelectedFutureImprovements] = useState<{ id: string; name: string }[]>([]);

  let hasInitialised = useRef(false);

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //
  const history = useHistory();

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();

  // --------------------------------------------------- Graphql hooks ----------------------------------------------------- //
  const { data: pbCreatorData } = useQuery<PlaybookCreatorData, PlaybookCreatorVars>(PLAYBOOK_CREATOR, {
    // @ts-ignore
    variables: { playbookType: character?.playbook },
    skip: !character,
  });

  const improvementBlock = pbCreatorData?.playbookCreator.improvementBlock;
  const [adjustImprovements, { loading: adjustingImprovements }] = useMutation<
    AdjustImprovementsData,
    AdjustImprovementsVars
  >(ADJUST_IMPROVEMENTS);

  // ------------------------------------------------ Component functions -------------------------------------------------- //
  const handleSelectImprovement = (move: Move) => {
    if (selectedImprovements.some((item) => item.name === move.name)) {
      setSelectedImprovements(selectedImprovements.filter((item) => item.name !== move.name));
    } else {
      if (!!character) {
        selectedImprovements.length < character?.allowedImprovements &&
          setSelectedImprovements([...selectedImprovements, { id: move.id, name: move.name }]);
      }
    }
  };

  const handleSelectFutureImprovement = (move: Move) => {
    if (selectedFutureImprovements.some((item) => item.name === move.name)) {
      setSelectedFutureImprovements(selectedFutureImprovements.filter((item) => item.name !== move.name));
    } else {
      if (!!character) {
        selectedFutureImprovements.length < character?.allowedImprovements - 5 &&
          setSelectedFutureImprovements([...selectedFutureImprovements, { id: move.id, name: move.name }]);
      }
    }
  };

  const handleSetImprovements = async () => {
    if (!!character && !!userGameRole && !!game) {
      const to = getNavDestinationForNewImprovement(
        character?.improvementMoves.map((imp) => imp.name),
        selectedImprovements.map((imp) => imp.name),
        game.id
      );

      try {
        await adjustImprovements({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            improvementIds: selectedImprovements.map((item) => item.id),
            futureImprovementIds: selectedFutureImprovements.map((item) => item.id),
          },
          optimisticResponse: adjustImprovementsOR(character),
        });
        if (!!to) {
          history.push(to);
        } else {
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ------------------------------------------------------ Effects -------------------------------------------------------- //
  // load in existing improvement moves, but prevent duplicates
  useEffect(() => {
    if (!!character && !hasInitialised.current) {
      character.improvementMoves.forEach((move) => {
        setSelectedImprovements((prevState) => [...prevState, { id: move.id, name: move.name }]);
      });
      character.futureImprovementMoves.forEach((move) => {
        setSelectedFutureImprovements((prevState) => [...prevState, { id: move.id, name: move.name }]);
      });
      hasInitialised.current = true;
    }
  }, [character]);

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
        <Box direction="row" justify="between" align="center" flex="grow">
          <HeadingWS crustReady={crustReady} level={5} alignSelf="start" margin={{ vertical: '12px' }}>
            {`You can select ${character?.allowedImprovements} ${
              character?.allowedImprovements === 1 ? 'improvement' : 'improvements'
            }`}
          </HeadingWS>
          <ButtonWS
            label={adjustingImprovements ? <Spinner fillColor="#FFF" width="37px" height="36px" /> : 'SET'}
            primary
            onClick={handleSetImprovements}
            disabled={selectedImprovements.length + selectedFutureImprovements.length !== character?.allowedImprovements}
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
                  checked={selectedImprovements.map((item) => item.name).includes(move.name)}
                  onClick={() => handleSelectImprovement(move)}
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
                  disabled={selectedImprovements.length < 5}
                  checked={selectedFutureImprovements.map((item) => item.name).includes(move.name)}
                  onClick={() => handleSelectFutureImprovement(move)}
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
