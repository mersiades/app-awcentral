import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

import IncreaseDecreaseButtons from '../IncreaseDecreaseButtons';
import { HeadingWS, RedBox } from '../../config/grommetConfig';
import { StyledMarkdown } from '../styledComponents';
import PLAYBOOK, { PlaybookData, PlaybookVars } from '../../queries/playbook';
import SET_CHARACTER_BARTER, {
  getSetCharacterBarterOR,
  SetCharacterBarterData,
  SetCharacterBarterVars,
} from '../../mutations/setCharacterBarter';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { PlaybookType } from '../../@types/enums';
import { BARTER_TEXT } from '../../config/constants';

const BarterBox: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showInstructions, setShowInstructions] = useState(false);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { userGameRole, character } = useGame();
  const barter = character?.barter;
  const { crustReady } = useFonts();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: playbook } = useQuery<PlaybookData, PlaybookVars>(PLAYBOOK, {
    // @ts-ignore
    variables: { playbookType: character.playbook },
    skip: !character,
  });
  const instructions = playbook?.playbook.barterInstructions;
  const [setCharacterBarter, { loading: settingBarter }] =
    useMutation<SetCharacterBarterData, SetCharacterBarterVars>(SET_CHARACTER_BARTER);

  // ------------------------------------------------- Component functions -------------------------------------------------- //

  const handleSetBarter = async (amount: number) => {
    if (!!userGameRole && !!character && !character.isDead) {
      try {
        await setCharacterBarter({
          variables: { gameRoleId: userGameRole.id, characterId: character.id, amount },
          optimisticResponse: getSetCharacterBarterOR(character.id, amount),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const increaseBarter = () => {
    !!barter && handleSetBarter(barter + 1);
  };

  const decreaseBarter = () => {
    !!barter && barter > 0 && handleSetBarter(barter - 1);
  };

  return (
    <Box
      data-testid="Barter-box"
      fill="horizontal"
      align="center"
      justify="start"
      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.25)' }}
    >
      <Box fill="horizontal" direction="row" justify="between" align="center" pad={{ vertical: '12px' }}>
        <Box direction="row" align="center" gap="12px" pad={{ vertical: '12px' }}>
          <HeadingWS crustReady={crustReady} level="3" margin="0px">
            {BARTER_TEXT}
          </HeadingWS>
        </Box>
        <Box direction="row" align="center" gap="12px">
          {showInstructions ? (
            <FormUp onClick={() => setShowInstructions(false)} />
          ) : (
            <FormDown onClick={() => setShowInstructions(true)} />
          )}
          {character?.playbook !== PlaybookType.hardholder && (
            <>
              <RedBox data-testid="barter-value-box" width="50px" align="center" margin={{ left: '12px' }}>
                <HeadingWS
                  crustReady={crustReady}
                  level="2"
                  margin={{ left: '9px', right: '9px', bottom: '3px', top: '9px' }}
                >
                  {barter}
                </HeadingWS>
              </RedBox>
              <IncreaseDecreaseButtons loading={settingBarter} onIncrease={increaseBarter} onDecrease={decreaseBarter} />
            </>
          )}
        </Box>
      </Box>
      {showInstructions && !!instructions && (
        <Box fill="horizontal" pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
          <StyledMarkdown>{instructions}</StyledMarkdown>
        </Box>
      )}
    </Box>
  );
};

export default BarterBox;
