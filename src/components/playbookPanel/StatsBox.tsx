import React, { FC } from 'react';
import { Box } from 'grommet';

import { StatType } from '../../@types/enums';
import CollapsiblePanelBox from '../CollapsiblePanelBox';
import StatBox from '../StatBox';
import { useGame } from '../../contexts/gameContext';
import { useMutation } from '@apollo/client';
import TOGGLE_STAT_HIGHLIGHT, {
  ToggleStatHighlightData,
  ToggleStatHighlightVars,
  getToggleStatHighlightOR,
} from '../../mutations/toggleStatHighlight';
import Spinner from '../Spinner';
import { STATS_TITLE } from '../../config/constants';

interface StatsBoxProps {
  navigateToCharacterCreation?: (step: string) => void;
}

const StatsBox: FC<StatsBoxProps> = ({ navigateToCharacterCreation }) => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { userGameRole, character } = useGame();
  const stats = character?.statsBlock?.stats;

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const [toggleStatHighlight, { loading: togglingHighlight }] =
    useMutation<ToggleStatHighlightData, ToggleStatHighlightVars>(TOGGLE_STAT_HIGHLIGHT);

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  const handleToggleHighlight = async (stat: StatType) => {
    if (!!userGameRole && !!character && !character.isDead) {
      try {
        await toggleStatHighlight({
          variables: { gameRoleId: userGameRole.id, characterId: character.id, stat },
          optimisticResponse: getToggleStatHighlightOR(character, stat),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <CollapsiblePanelBox
      open
      title={STATS_TITLE}
      navigateToCharacterCreation={navigateToCharacterCreation}
      targetCreationStep="4"
    >
      <Box
        fill="horizontal"
        direction="row"
        align="center"
        justify="around"
        pad="12px"
        gap="12px"
        wrap
        animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      >
        {!!stats ? (
          stats.map((stat) => {
            return (
              <StatBox
                key={stat.id}
                stat={stat}
                handleClick={() => !togglingHighlight && handleToggleHighlight(stat.stat)}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </Box>
    </CollapsiblePanelBox>
  );
};

export default StatsBox;
