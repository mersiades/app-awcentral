import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import DEATH_MOVES, { DeathMovesData } from '../../queries/deathMoves';
import { Box, CheckBox } from 'grommet';

import Spinner from '../Spinner';
import { TextWS } from '../../config/grommetConfig';
import { Move } from '../../@types/staticDataInterfaces';
import { useGame } from '../../contexts/gameContext';
import { difference, pullAll } from 'lodash';
import DeathDialog from '../dialogs/DeathDialog';
import SET_DEATH_MOVES, { SetDeathMovesData, SetDeathMovesVars } from '../../mutations/setDeathMoves';

export const LIFE_UNTENABLE_INSTRUCTIONS = 'When life becomes untenable:';

const DeathMovesBox = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [selectedMoves, setSelectedMoves] = useState<string[]>([]);
  const [addedMoves, setAddedMoves] = useState<string[]>([]);
  const [removedMoves, setRemovedMoves] = useState<string[]>([]);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { userGameRole, character } = useGame();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: deathMovesData } = useQuery<DeathMovesData>(DEATH_MOVES);
  const deathMoves = deathMovesData?.deathMoves;

  const [setDeathMoves, { loading: settingDeathMoves }] = useMutation<SetDeathMovesData, SetDeathMovesVars>(SET_DEATH_MOVES);

  // ------------------------------------------------ Component functions -------------------------------------------------- //

  const handleSelectMove = (move: Move) => {
    if (selectedMoves.some((moveName) => moveName === move.name)) {
      setSelectedMoves(selectedMoves.filter((moveName) => moveName !== move.name));
    } else {
      setSelectedMoves([...selectedMoves, move.name]);
    }
  };

  const closeDeathDialog = () => {
    // Closes dialog by resetting checkboxes to Character's current death moves
    !!character && setSelectedMoves(character.deathMoves.map((mv) => mv.name));
  };

  const handleConfirm = async () => {
    if (!!userGameRole && !!character) {
      try {
        await setDeathMoves({
          variables: { gameRoleId: userGameRole.id, characterId: character.id, moveNames: selectedMoves },
        });
        setSelectedMoves([]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ------------------------------------------------------ Effects -------------------------------------------------------- //

  // Whenever selectedMoves changes, finds which moves are different
  useEffect(() => {
    if (!!character) {
      const removedMoves = pullAll(
        character.deathMoves.map((m) => m.name),
        selectedMoves
      );
      setRemovedMoves(removedMoves);

      const addedMoves = difference(
        selectedMoves,
        character.deathMoves.map((m) => m.name)
      );
      setAddedMoves(addedMoves);
    }
  }, [selectedMoves, character]);

  // Loads existing death moves
  useEffect(() => {
    !!character && setSelectedMoves(character.deathMoves.map((mv) => mv.name));
  }, [character]);

  // ------------------------------------------------------- Render -------------------------------------------------------- //

  console.log(`selectedMoves`, selectedMoves);
  console.log(`addedMoves`, addedMoves);
  console.log(`removedMoves`, removedMoves);
  return (
    <Box fill gap="6px">
      {(addedMoves.length > 0 || removedMoves.length > 0) && (
        <DeathDialog
          addedMoves={addedMoves}
          removedMoves={removedMoves}
          settingDeathMoves={settingDeathMoves}
          handleClose={closeDeathDialog}
          handleConfirm={handleConfirm}
        />
      )}
      <strong>
        <em>
          <TextWS>{LIFE_UNTENABLE_INSTRUCTIONS}</TextWS>
        </em>
      </strong>
      {!!deathMoves ? (
        deathMoves.map((move) => (
          <CheckBox
            key={move.id}
            label={move.description}
            checked={selectedMoves.some((moveName) => moveName === move.name)}
            onClick={() => handleSelectMove(move)}
          />
        ))
      ) : (
        <Spinner width="100%" height="100%" />
      )}
    </Box>
  );
};

export default DeathMovesBox;
