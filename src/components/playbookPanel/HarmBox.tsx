import React, { FC } from 'react';
import { Box, CheckBox } from 'grommet';

import CollapsiblePanelBox from '../CollapsiblePanelBox';
import Spinner from '../Spinner';
import { getCircle, getSector, oclock12, oclock3, oclock6, oclock9 } from '../HarmClock';
import { TextWS } from '../../config/grommetConfig';
import { HarmInput } from '../../@types';
import { useGame } from '../../contexts/gameContext';
import { useMutation } from '@apollo/client';
import SET_CHARACTER_HARM, {
  getSetCharacterHarmOR,
  SetCharacterHarmData,
  SetCharacterHarmVars,
} from '../../mutations/setCharacterHarm';
import DeathMovesBox from './DeathMovesBox';

const HarmBox: FC = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { userGameRole, character } = useGame();
  const harm = character?.harm;

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const [setCharacterHarm, { loading: settingHarm }] = useMutation<SetCharacterHarmData, SetCharacterHarmVars>(
    SET_CHARACTER_HARM
  );

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  const circle = getCircle(200);

  const handleSetHarm = async (harmInput: HarmInput) => {
    if (!!userGameRole && !!character) {
      try {
        // @ts-ignore
        delete harmInput.__typename;

        await setCharacterHarm({
          variables: { gameRoleId: userGameRole.id, characterId: character.id, harm: harmInput },
          optimisticResponse: getSetCharacterHarmOR(character, harmInput),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setHarmValue = (sector: number) => {
    if (!!harm) {
      let newValue = harm.value;
      if (harm.value > sector) {
        newValue = sector;
      } else {
        newValue = sector + 1;
      }

      handleSetHarm({ ...harm, value: newValue });
    }
  };

  // ------------------------------------------------------- Render -------------------------------------------------------- //
  return (
    <CollapsiblePanelBox open title="Harm">
      <Box
        fill="horizontal"
        direction="row"
        justify="around"
        animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      >
        <Box
          data-testid="harm-clock"
          align="center"
          justify="center"
          style={{ position: 'relative', width: '250px', height: '250px' }}
        >
          <Box style={oclock12} align="center" justify="center">
            <TextWS style={{ textAlign: 'center' }}>12</TextWS>
          </Box>
          <Box style={oclock3} align="center" justify="center">
            <TextWS>3</TextWS>
          </Box>
          <Box style={oclock6} align="center" justify="center">
            <TextWS>6</TextWS>
          </Box>
          <Box style={oclock9} align="center" justify="center">
            <TextWS>9</TextWS>
          </Box>

          {!!harm ? (
            <div style={circle}>
              <div
                data-testid="harm-sector-0"
                style={getSector(harm.value, 0, 0, 0, harm.isStabilized)}
                onClick={() => !settingHarm && setHarmValue(0)}
              />
              <div
                data-testid="harm-sector-1"
                style={getSector(harm.value, 1, 90, 0, harm.isStabilized)}
                onClick={() => !settingHarm && setHarmValue(1)}
              />
              <div
                data-testid="harm-sector-2"
                style={getSector(harm.value, 2, 180, 0, harm.isStabilized)}
                onClick={() => !settingHarm && setHarmValue(2)}
              />
              <div
                data-testid="harm-sector-3"
                style={getSector(harm.value, 3, 270, -60, harm.isStabilized)}
                onClick={() => !settingHarm && setHarmValue(3)}
              />
              <div
                data-testid="harm-sector-4"
                style={getSector(harm.value, 4, 300, -60, harm.isStabilized)}
                onClick={() => !settingHarm && setHarmValue(4)}
              />
              <div
                data-testid="harm-sector-5"
                style={getSector(harm.value, 5, 330, -60, harm.isStabilized)}
                onClick={() => !settingHarm && setHarmValue(5)}
              />
            </div>
          ) : (
            <Spinner />
          )}
        </Box>
        <Box flex="grow" pad="12px" gap="12px" justify="center">
          {!!harm ? (
            <Box gap="12px">
              <Box>
                <CheckBox
                  label="Stabilized"
                  checked={harm.isStabilized}
                  onClick={() => !settingHarm && handleSetHarm({ ...harm, isStabilized: !harm.isStabilized })}
                />
              </Box>
              <Box margin={{ top: '12px' }} fill>
                <DeathMovesBox />
              </Box>
            </Box>
          ) : (
            <Spinner width="200px" />
          )}
        </Box>
      </Box>
    </CollapsiblePanelBox>
  );
};

export default HarmBox;
