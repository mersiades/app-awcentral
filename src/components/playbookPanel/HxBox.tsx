import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { omit } from 'lodash';
import { Box } from 'grommet';

import CollapsiblePanelBox from '../CollapsiblePanelBox';
import SingleRedBox from '../SingleRedBox';
import Spinner from '../Spinner';
import ADJUST_CHARACTER_HX, {
  AdjustCharacterHxData,
  AdjustCharacterHxVars,
  getAdjustCharacterHxOR,
} from '../../mutations/adjustCharacterHx';
import { useGame } from '../../contexts/gameContext';
import { HxInput } from '../../@types';

interface HxBoxProps {
  navigateToCharacterCreation?: (step: string) => void;
}

const HxBox: FC<HxBoxProps> = ({ navigateToCharacterCreation }) => {
  const [hxMessage, setHxMessage] = useState('');
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { userGameRole, character } = useGame();
  const hxStats = character?.hxBlock;

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const [adjustCharacterHx, { loading: adjustingHx }] = useMutation<AdjustCharacterHxData, AdjustCharacterHxVars>(
    ADJUST_CHARACTER_HX
  );

  // ------------------------------------------------- Component functions -------------------------------------------------- //

  const handleAdjustHx = async (hxInput: HxInput) => {
    if (!!userGameRole && !!character) {
      try {
        await adjustCharacterHx({
          variables: { gameRoleId: userGameRole.id, characterId: character.id, hxStat: hxInput },
          optimisticResponse: getAdjustCharacterHxOR(character, hxInput),
        });
        if (hxInput.hxValue >= 4 || hxInput.hxValue <= -3) {
          setHxMessage('Hx reset, experience added');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const increaseHx = (hxStat: HxInput) => {
    handleAdjustHx({ ...hxStat, hxValue: hxStat.hxValue + 1 });
  };

  const decreaseHx = (hxStat: HxInput) => {
    handleAdjustHx({ ...hxStat, hxValue: hxStat.hxValue - 1 });
  };

  // Remove hxMessage after 10 seconds
  useEffect(() => {
    !!hxMessage && setTimeout(() => setHxMessage(''), 10000);
  }, [hxMessage]);

  return (
    <CollapsiblePanelBox
      open
      title="Hx"
      navigateToCharacterCreation={navigateToCharacterCreation}
      targetCreationStep="10"
      message={hxMessage}
    >
      <Box
        data-testid="hx-box"
        fill="horizontal"
        direction="row"
        justify="around"
        animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      >
        {!!hxStats && hxStats.length > 0 ? (
          hxStats.map((stat) => (
            <SingleRedBox
              key={stat.characterId}
              value={stat.hxValue.toString()}
              label={stat.characterName}
              loading={adjustingHx}
              onIncrease={() => increaseHx(omit(stat, ['__typename']) as HxInput)}
              onDecrease={() => decreaseHx(omit(stat, ['__typename']) as HxInput)}
            />
          ))
        ) : (
          <Spinner />
        )}
      </Box>
    </CollapsiblePanelBox>
  );
};
export default HxBox;
