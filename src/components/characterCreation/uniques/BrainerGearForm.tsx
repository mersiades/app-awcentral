import React, { FC, useState } from 'react';
import { Box, CheckBox, Text } from 'grommet';

import Spinner from '../../Spinner';
import {
  accentColors,
  ButtonWS,
  HeadingWS,
  ParagraphWS,
} from '../../../config/grommetConfig';
import { StyledMarkdown } from '../../styledComponents';
import { useFonts } from '../../../contexts/fontContext';
import { useGame } from '../../../contexts/gameContext';
import { useMutation, useQuery } from '@apollo/client';
import PLAYBOOK_CREATOR, {
  PlaybookCreatorData,
  PlaybookCreatorVars,
} from '../../../queries/playbookCreator';
import SET_BRAINER_GEAR, {
  SetBrainerGearData,
  setBrainerGearOR,
  SetBrainerGearVars,
} from '../../../mutations/setBrainerGear';
import { useNavigate } from 'react-router-dom';
import { CharacterCreationSteps, PlaybookType } from '../../../@types/enums';
import { INCREASED_BY_IMPROVEMENT_TEXT } from '../../../config/constants';
import { logAmpEvent } from '../../../config/amplitudeConfig';

const BrainerGearForm: FC = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();
  const brainerGear = character?.playbookUniques?.brainerGear;

  // ----------------------------- Component state ------------------------------ //
  const [selectedGear, setSelectedGear] = useState(
    !!character?.playbookUniques?.brainerGear
      ? character.playbookUniques.brainerGear.brainerGear
      : []
  );

  // ----------------------------- 3rd party hooks ------------------------------- //
  const navigate = useNavigate();

  // ----------------------------- GraphQL -------------------------------------- //
  const { data: pbCreatorData } = useQuery<
    PlaybookCreatorData,
    PlaybookCreatorVars
  >(PLAYBOOK_CREATOR, {
    variables: { playbookType: PlaybookType.brainer },
    skip: !character,
  });
  const brainerGearCreator =
    pbCreatorData?.playbookCreator.playbookUniqueCreator?.brainerGearCreator;
  const [setBrainerGear, { loading: settingBrainerGear }] = useMutation<
    SetBrainerGearData,
    SetBrainerGearVars
  >(SET_BRAINER_GEAR);

  // ----------------------------- Component functions ------------------------- //
  const handleSelectItem = (item: string) => {
    if (selectedGear.includes(item)) {
      setSelectedGear(selectedGear.filter((gear) => gear !== item));
    } else {
      !!brainerGear &&
        selectedGear.length < brainerGear.allowedItemsCount &&
        setSelectedGear([...selectedGear, item]);
    }
  };

  const handleSubmitBrainerGear = async (brainerGear: string[]) => {
    if (!!userGameRole && !!character && !!game) {
      try {
        await setBrainerGear({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            brainerGear,
          },
          optimisticResponse: setBrainerGearOR(character, brainerGear),
        });
        !character.hasCompletedCharacterCreation && logAmpEvent('set unique');
        navigate(
          `/character-creation/${game.id}?step=${CharacterCreationSteps.selectMoves}`
        );
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!brainerGear || !brainerGearCreator) {
    return null;
  }

  // ----------------------------- Render ---------------------------------------- //
  return (
    <Box
      data-testid="brainer-gear-form"
      justify="start"
      width="85vw"
      align="start"
      style={{ maxWidth: '763px' }}
    >
      <Box direction="row" fill="horizontal" justify="between" align="center">
        <HeadingWS
          crustReady={crustReady}
          level={2}
          style={{ lineHeight: '44px' }}
        >
          {!!character && !!character.name
            ? `WHAT SPECIAL BRAINER GEAR DOES ${character.name.toUpperCase()} HAVE?`
            : '...'}
        </HeadingWS>
        <ButtonWS
          label={
            settingBrainerGear ? (
              <Spinner fillColor="#FFF" width="37px" height="36px" />
            ) : (
              'SET'
            )
          }
          primary
          disabled={selectedGear.length !== brainerGear.allowedItemsCount}
          onClick={() =>
            !settingBrainerGear && handleSubmitBrainerGear(selectedGear)
          }
        />
      </Box>
      <Box direction="row" align="center" gap="12px">
        <ParagraphWS size="large">{`Select ${brainerGear.allowedItemsCount}`}</ParagraphWS>
        {brainerGear.allowedItemsCount >
          brainerGearCreator.defaultItemCount && (
          <ParagraphWS color={accentColors[0]}>
            {INCREASED_BY_IMPROVEMENT_TEXT}
          </ParagraphWS>
        )}
      </Box>
      <Box align="start" gap="12px">
        {!!brainerGearCreator &&
          brainerGearCreator?.gear.map((item, index) => {
            const splitItem = item.split(')');
            return (
              <CheckBox
                key={index}
                aria-label={`option-${splitItem[0]})`}
                label={
                  <div>
                    <Text weight="bold">{splitItem[0] + ') '}</Text>
                    <StyledMarkdown>{splitItem[1]}</StyledMarkdown>
                  </div>
                }
                checked={selectedGear.includes(item)}
                onChange={() => handleSelectItem(item)}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default BrainerGearForm;
