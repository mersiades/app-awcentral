import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import DEATH_MOVES, { DeathMovesData } from '../../queries/deathMoves';
import { Box, CheckBox } from 'grommet';

import Spinner from '../Spinner';
import { accentColors, TextWS } from '../../config/grommetConfig';
import { Checkbox } from 'grommet-icons';
import { Move } from '../../@types/staticDataInterfaces';

export const LIFE_UNTENABLE_INSTRUCTIONS = 'When life becomes untenable:';

const DeathMovesBox = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [selectedMoves, setSelectedMoves] = useState<string[]>([]);

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: deathMovesData } = useQuery<DeathMovesData>(DEATH_MOVES);
  const deathMoves = deathMovesData?.deathMoves;

  // ------------------------------------------------ Component functions -------------------------------------------------- //

  const handleSelectMove = (move: Move) => {
    if (selectedMoves.some((moveName) => moveName === move.name)) {
      setSelectedMoves(selectedMoves.filter((moveName) => moveName !== move.name));
    } else {
      setSelectedMoves([...selectedMoves, move.name]);
    }
  };

  return (
    <Box fill gap="6px">
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

/**
 * <TextWS>When life becomes untenable:</TextWS>
                <CheckBox
                  label="Come back with -1hard"
                  checked={harm.hasComeBackHard}
                  onClick={() => !settingHarm && handleSetHarm({ ...harm, hasComeBackHard: !harm.hasComeBackHard })}
                />
                <CheckBox
                  label="Come back with +1weird (max+3)"
                  checked={harm.hasComeBackWeird}
                  onClick={() => !settingHarm && handleSetHarm({ ...harm, hasComeBackWeird: !harm.hasComeBackWeird })}
                />
                <CheckBox
                  label="Change to a new playbook"
                  checked={harm.hasChangedPlaybook}
                  onClick={() => !settingHarm && handleSetHarm({ ...harm, hasChangedPlaybook: !harm.hasChangedPlaybook })}
                />
                <CheckBox
                  label="Die"
                  checked={harm.hasDied}
                  onClick={() => !settingHarm && handleSetHarm({ ...harm, hasDied: !harm.hasDied })}
                />
 */
