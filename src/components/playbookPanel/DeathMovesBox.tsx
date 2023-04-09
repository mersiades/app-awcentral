import React, { useEffect, useState } from 'react';
import { difference, pullAll } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CheckBox } from 'grommet';

import Spinner from '../Spinner';
import DeathDialog from '../dialogs/DeathDialog';
import { TextWS } from '../../config/grommetConfig';
import DEATH_MOVES, { DeathMovesData } from '../../queries/deathMoves';
import SET_DEATH_MOVES, {
  getSetDeathMovesOR,
  SetDeathMovesData,
  SetDeathMovesVars,
} from '../../mutations/setDeathMoves';
import { useGame } from '../../contexts/gameContext';
import { Move } from '../../@types/staticDataInterfaces';
import {
  DEATH_CHANGE_PLAYBOOK_NAME,
  LIFE_UNTENABLE_INSTRUCTIONS,
} from '../../config/constants';

const DeathMovesBox = () => {
  // ----------------------------- Component state -------------------------- //
  const [selectedMoves, setSelectedMoves] = useState<string[]>([]);
  const [addedMoves, setAddedMoves] = useState<string[]>([]);
  const [removedMoves, setRemovedMoves] = useState<string[]>([]);

  // ----------------------------- Hooks ------------------------------------ //
  const { userGameRole, character } = useGame();

  // ----------------------------- 3rd party hooks -------------------------- //
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- GraphQL ---------------------------------- //
  const { data: deathMovesData } = useQuery<DeathMovesData>(DEATH_MOVES);
  const deathMoves = deathMovesData?.deathMoves;

  const [setDeathMoves, { loading: settingDeathMoves }] = useMutation<
    SetDeathMovesData,
    SetDeathMovesVars
  >(SET_DEATH_MOVES);

  // ----------------------------- Component functions ---------------------- //

  const handleSelectMove = (move: Move) => {
    if (selectedMoves.some((moveName) => moveName === move.name)) {
      setSelectedMoves(
        selectedMoves.filter((moveName) => moveName !== move.name)
      );
    } else {
      setSelectedMoves([...selectedMoves, move.name]);
    }
  };

  const closeDeathDialog = () => {
    // Closes dialog by resetting checkboxes to Character's current death moves
    !!character && setSelectedMoves(character.deathMoves.map((mv) => mv.name));
  };

  const redirectAfterSet = () => {
    if (addedMoves.includes(DEATH_CHANGE_PLAYBOOK_NAME)) {
      navigate(`/character-creation/${gameId}?step=1`);
    } else {
      setAddedMoves([]);
      setRemovedMoves([]);
    }
  };

  const handleConfirm = async () => {
    if (!!userGameRole && !!character) {
      try {
        await setDeathMoves({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            moveNames: selectedMoves,
          },
          optimisticResponse: getSetDeathMovesOR(
            character,
            selectedMoves,
            removedMoves,
            addedMoves
          ),
        });
        redirectAfterSet();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ----------------------------- Effects ---------------------------------- //

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

  // ----------------------------- Render ----------------------------------- //

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
            aria-label={`${move.description.trimEnd()} checkbox`}
            label={move.description}
            checked={selectedMoves.some((moveName) => moveName === move.name)}
            onClick={() => handleSelectMove(move)}
            disabled={settingDeathMoves}
          />
        ))
      ) : (
        <Spinner width="100%" height="100%" />
      )}
    </Box>
  );
};

export default DeathMovesBox;
