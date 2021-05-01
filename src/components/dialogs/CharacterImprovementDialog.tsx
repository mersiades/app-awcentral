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
        history.push(`/character-creation/${game.id}?step=6`);
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
