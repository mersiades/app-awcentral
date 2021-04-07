import React, { FC } from 'react';
import { Box, CheckBox } from 'grommet';

import CollapsiblePanelBox from '../CollapsiblePanelBox';
import { getCircle, getSector, oclock12, oclock3, oclock6, oclock9 } from '../HarmClock';
import { TextWS } from '../../config/grommetConfig';
import { HarmInput } from '../../@types';
import { CharacterHarm } from '../../@types/dataInterfaces';

interface HarmBoxProps {
  harm: CharacterHarm;
  settingHarm: boolean;
  handleSetHarm: (harm: HarmInput) => void;
}

const HarmBox: FC<HarmBoxProps> = ({ harm, settingHarm, handleSetHarm }) => {
  const circle = getCircle(200);

  const setHarmValue = (sector: number) => {
    let newValue = harm.value;
    if (harm.value > sector) {
      newValue = sector;
    } else {
      newValue = sector + 1;
    }

    handleSetHarm({ ...harm, value: newValue });
  };

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
        </Box>
        <Box flex="grow" pad="12px" gap="12px" justify="center">
          <CheckBox
            label="Stabilized"
            checked={harm.isStabilized}
            onClick={() => !settingHarm && handleSetHarm({ ...harm, isStabilized: !harm.isStabilized })}
          />
          <TextWS>When life becomes untenable:</TextWS>
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
        </Box>
      </Box>
    </CollapsiblePanelBox>
  );
};

export default HarmBox;
