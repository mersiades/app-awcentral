import React from 'react';
import { useQuery } from '@apollo/client';
import DEATH_MOVES, { DeathMovesData } from '../../queries/deathMoves';
import { Box } from 'grommet';

import Spinner from '../Spinner';
import { accentColors, TextWS } from '../../config/grommetConfig';

export const LIFE_UNTENABLE_INSTRUCTIONS = 'When life becomes untenable:';

const DeathMovesBox = () => {
  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: deathMovesData } = useQuery<DeathMovesData>(DEATH_MOVES);
  const deathMoves = deathMovesData?.deathMoves;

  return (
    <Box fill border>
      <strong>
        <em>
          <TextWS>{LIFE_UNTENABLE_INSTRUCTIONS}</TextWS>
        </em>
      </strong>
      {!!deathMoves ? <p>hello</p> : <Spinner width="100%" height="100%" />}
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
