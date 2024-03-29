import React, { FC, useEffect, useReducer, useState } from 'react';
import { omit } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Box, CheckBox } from 'grommet';

import Spinner from '../../Spinner';
import DoubleRedBox from '../../DoubleRedBox';
import RedTagsBox from '../../RedTagsBox';
import SingleRedBox from '../../SingleRedBox';
import { StyledMarkdown } from '../../styledComponents';
import {
  accentColors,
  ButtonWS,
  HeadingWS,
  ParagraphWS,
} from '../../../config/grommetConfig';
import PLAYBOOK_CREATOR, {
  PlaybookCreatorData,
  PlaybookCreatorVars,
} from '../../../queries/playbookCreator';
import SET_HOLDING, {
  getSetHoldingOR,
  SetHoldingData,
  SetHoldingVars,
} from '../../../mutations/setHolding';
import {
  CharacterCreationSteps,
  GangSize,
  HoldingSize,
  PlaybookType,
} from '../../../@types/enums';
import { HoldingInput } from '../../../@types';
import {
  GangOption,
  HoldingOption,
} from '../../../@types/staticDataInterfaces';
import { useFonts } from '../../../contexts/fontContext';
import { useGame } from '../../../contexts/gameContext';
import { updateTags, unUpdateTags } from '../../../helpers/updateTags';
import {
  DECREASED_BY_IMPROVEMENT_TEXT,
  HOLDING_SOULS_LARGE,
  HOLDING_SOULS_MEDIUM,
  HOLDING_SOULS_SMALL,
  INCREASED_BY_IMPROVEMENT_TEXT,
} from '../../../config/constants';
import { logAmpEvent } from '../../../config/amplitudeConfig';

interface HoldingFormState {
  holdingSize: HoldingSize;
  gangSize: GangSize;
  souls: string;
  surplus: number;
  barter: number;
  gangHarm: number;
  gangArmor: number;
  gangDefenseArmorBonus: number;
  wants: string[];
  gigs: string[];
  gangTags: string[];
  strengthsCount: number;
  weaknessesCount: number;
  selectedStrengths: HoldingOption[];
  selectedWeaknesses: HoldingOption[];
}

interface Action {
  type: 'SET_EXISTING_HOLDING' | 'SET_DEFAULT_HOLDING' | 'UPDATE_HOLDING';
  payload?: any;
}

const getSouls = (holdingSize: HoldingSize) => {
  switch (holdingSize) {
    case HoldingSize.small:
      return HOLDING_SOULS_SMALL;
    case HoldingSize.medium:
      return HOLDING_SOULS_MEDIUM;
    case HoldingSize.large:
      return HOLDING_SOULS_LARGE;
  }
};

const holdingFormReducer = (state: HoldingFormState, action: Action) => {
  switch (action.type) {
    case 'SET_EXISTING_HOLDING':
      return {
        ...state,
        ...action.payload,
        souls: getSouls(action.payload.holdingSize),
      };
    case 'UPDATE_HOLDING':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const HoldingForm: FC = () => {
  const initialState: HoldingFormState = {
    holdingSize: HoldingSize.medium,
    gangSize: GangSize.medium,
    souls: getSouls(HoldingSize.medium),
    surplus: 1,
    barter: 0,
    gangHarm: 2,
    gangArmor: 1,
    gangDefenseArmorBonus: 1,
    wants: ['hungry'],
    gigs: ['hunting', 'crude farming', 'scavenging'],
    gangTags: ['unruly'],
    strengthsCount: 4,
    weaknessesCount: 2,
    selectedStrengths: [],
    selectedWeaknesses: [],
  };
  // ----------------------------- Component state -------------------------- //
  const [
    {
      strengthsCount,
      weaknessesCount,
      selectedStrengths,
      selectedWeaknesses,
      holdingSize,
      gangSize,
      surplus,
      gangHarm,
      gangArmor,
      gangDefenseArmorBonus,
      wants,
      gigs,
      gangTags,
    },
    dispatch,
  ] = useReducer(holdingFormReducer, initialState);
  const [vehicleCount, setVehicleCount] = useState(4);
  const [battleVehicleCount, setBattleVehicleCount] = useState(4);

  // ----------------------------- Hooks ------------------------------------ //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();

  // ----------------------------- 3rd party hooks -------------------------- //
  const navigate = useNavigate();

  // ----------------------------- GraphQL ---------------------------------- //
  const { data: pbCreatorData } = useQuery<
    PlaybookCreatorData,
    PlaybookCreatorVars
  >(PLAYBOOK_CREATOR, {
    variables: { playbookType: PlaybookType.hardholder },
  });

  const holdingCreator =
    pbCreatorData?.playbookCreator.playbookUniqueCreator?.holdingCreator;
  const [setHolding, { loading: settingHolding }] = useMutation<
    SetHoldingData,
    SetHoldingVars
  >(SET_HOLDING);

  // ----------------------------- Component functions ---------------------- //
  const handleSubmitHolding = async () => {
    if (!!userGameRole && !!character && !!game) {
      // @ts-ignore
      const strengthsNoTypename = selectedStrengths.map((str: GangOption) =>
        omit(str, ['__typename'])
      );
      // @ts-ignore
      const weaknessesNoTypename = selectedWeaknesses.map((wk: GangOption) =>
        omit(wk, ['__typename'])
      );

      const holdingInput: HoldingInput = {
        id: character?.playbookUniques?.holding
          ? character.playbookUniques.holding.id
          : undefined,
        selectedStrengths: strengthsNoTypename,
        selectedWeaknesses: weaknessesNoTypename,
        weaknessesCount,
        strengthsCount,
        holdingSize,
        gangSize,
        surplus,
        gangHarm,
        gangArmor,
        gangDefenseArmorBonus,
        wants,
        gigs,
        gangTags,
        souls: getSouls(holdingSize),
        barter: 0,
      };

      try {
        setHolding({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            holding: holdingInput,
            vehicleCount,
            battleVehicleCount,
          },
          optimisticResponse: getSetHoldingOR(character, holdingInput),
        });

        if (!character.hasCompletedCharacterCreation) {
          logAmpEvent('set unique');
          navigate(
            `/character-creation/${game.id}?step=${CharacterCreationSteps.selectMoves}`
          );
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addOption = (option: HoldingOption, type: 'strength' | 'weakness') => {
    let update: Partial<HoldingInput> =
      type === 'strength'
        ? { selectedStrengths: [...selectedStrengths, option] }
        : { selectedWeaknesses: [...selectedWeaknesses, option] };

    if (option.surplusChange > -2) {
      update = { ...update, surplus: surplus + option.surplusChange };
    }

    if (!!option.wantChange) {
      update = { ...update, wants: updateTags(wants, option.wantChange) };
    }

    if (!!option.newHoldingSize) {
      update = { ...update, holdingSize: option.newHoldingSize };
    }

    if (!!option.gigChange) {
      update = { ...update, gigs: updateTags(gigs, [option.gigChange]) };
    }

    if (!!option.newGangSize) {
      update = { ...update, gangSize: option.newGangSize };
    }

    if (!!option.gangTagChange) {
      update = {
        ...update,
        gangTags: updateTags(gangTags, [option.gangTagChange]),
      };
    }

    if (option.gangHarmChange > -2) {
      update = { ...update, gangHarm: gangHarm + option.gangHarmChange };
    }

    if (option.newArmorBonus > -1) {
      update = { ...update, gangDefenseArmorBonus: option.newArmorBonus };
    }

    if (option.newVehicleCount > -1) {
      setVehicleCount(option.newVehicleCount);
    }

    if (option.newBattleVehicleCount > -1) {
      setBattleVehicleCount(option.newBattleVehicleCount);
    }

    dispatch({ type: 'UPDATE_HOLDING', payload: update });
  };

  const removeOption = (
    option: HoldingOption,
    type: 'strength' | 'weakness'
  ) => {
    let update: Partial<HoldingInput> =
      type === 'strength'
        ? {
            selectedStrengths: selectedStrengths.filter(
              (str: HoldingOption) => str.id !== option.id
            ),
          }
        : {
            selectedWeaknesses: selectedWeaknesses.filter(
              (str: HoldingOption) => str.id !== option.id
            ),
          };

    if (option.surplusChange > -2) {
      update = { ...update, surplus: surplus - option.surplusChange };
    }

    if (!!option.wantChange) {
      update = { ...update, wants: unUpdateTags(wants, option.wantChange) };
    }

    if (!!option.newHoldingSize) {
      update = { ...update, holdingSize: holdingCreator?.defaultHoldingSize };
    }

    if (!!option.gigChange) {
      update = { ...update, gigs: unUpdateTags(gigs, [option.gigChange]) };
    }

    if (!!option.newGangSize) {
      update = { ...update, gangSize: holdingCreator?.defaultGangSize };
    }

    if (!!option.gangTagChange) {
      update = {
        ...update,
        gangTags: unUpdateTags(gangTags, [option.gangTagChange]),
      };
    }

    if (option.gangHarmChange > -2) {
      update = { ...update, gangHarm: gangHarm - option.gangHarmChange };
    }

    if (option.newArmorBonus > -1) {
      update = {
        ...update,
        gangDefenseArmorBonus: holdingCreator?.defaultArmorBonus,
      };
    }

    if (option.newVehicleCount > -1) {
      !!holdingCreator && setVehicleCount(holdingCreator.defaultVehiclesCount);
    }

    if (option.newBattleVehicleCount > -1) {
      !!holdingCreator &&
        setBattleVehicleCount(holdingCreator.defaultBattleVehicleCount);
    }

    dispatch({ type: 'UPDATE_HOLDING', payload: update });
  };

  const handleStrengthSelect = (option: HoldingOption) => {
    if (!!holdingCreator) {
      if (
        selectedStrengths
          .map((str: HoldingOption) => str.id)
          .includes(option.id)
      ) {
        removeOption(option, 'strength');
      } else if (selectedStrengths.length < strengthsCount) {
        addOption(option, 'strength');
      }
    }
  };

  const handleWeaknessSelect = (option: HoldingOption) => {
    if (!!holdingCreator) {
      if (
        selectedWeaknesses.map((wk: HoldingOption) => wk.id).includes(option.id)
      ) {
        removeOption(option, 'weakness');
      } else if (selectedWeaknesses.length < weaknessesCount) {
        addOption(option, 'weakness');
      }
    }
  };

  // ----------------------------- Effects ---------------------------------------- //
  useEffect(() => {
    if (!!character?.playbookUniques?.holding) {
      dispatch({
        type: 'SET_EXISTING_HOLDING',
        payload: character.playbookUniques.holding,
      });
      setVehicleCount(character.vehicleCount);
      !!holdingCreator &&
        setBattleVehicleCount(holdingCreator.defaultBattleVehicleCount);
    } else if (!!holdingCreator) {
      const defaultState: HoldingFormState = {
        holdingSize: holdingCreator.defaultHoldingSize,
        gangSize: holdingCreator.defaultGangSize,
        souls: getSouls(holdingCreator.defaultHoldingSize),
        surplus: holdingCreator.defaultSurplus,
        barter: 0,
        gangHarm: holdingCreator.defaultGangHarm,
        gangArmor: holdingCreator.defaultGangArmor,
        gangDefenseArmorBonus: 1,
        wants: [holdingCreator.defaultWant],
        gigs: holdingCreator.defaultGigs,
        gangTags: [holdingCreator.defaultGangTag],
        strengthsCount: 4,
        weaknessesCount: 2,
        selectedStrengths: [],
        selectedWeaknesses: [],
      };
      dispatch({ type: 'SET_DEFAULT_HOLDING', payload: defaultState });
      setVehicleCount(holdingCreator.defaultVehiclesCount);
      setBattleVehicleCount(holdingCreator.defaultBattleVehicleCount);
    }
  }, [character, holdingCreator]);

  // ----------------------------- Render ---------------------------------------- //

  if (!holdingCreator) {
    return null;
  }

  return (
    <Box
      data-testid="holding-form"
      justify="start"
      width="85vw"
      align="start"
      style={{ maxWidth: '742px' }}
      margin={{ bottom: '24px' }}
    >
      <Box direction="row" fill="horizontal" align="center" justify="between">
        <HeadingWS
          crustReady={crustReady}
          level={2}
          style={{ maxWidth: 'unset', height: '34px', lineHeight: '44px' }}
        >{`${
          !!character?.name ? character.name?.toUpperCase() : '...'
        }'S HOLDING`}</HeadingWS>
        <ButtonWS
          primary
          label={
            settingHolding ? (
              <Spinner fillColor="#FFF" width="36px" height="36px" />
            ) : (
              'SET'
            )
          }
          onClick={() => !settingHolding && handleSubmitHolding()}
          disabled={
            settingHolding ||
            selectedStrengths.length !== strengthsCount ||
            selectedWeaknesses.length !== weaknessesCount
          }
        />
      </Box>
      {<StyledMarkdown>{holdingCreator.instructions}</StyledMarkdown>}
      <Box direction="row" align="center" gap="12px">
        <ParagraphWS>Then, choose {strengthsCount}:</ParagraphWS>
        {strengthsCount > holdingCreator.defaultStrengthsCount && (
          <ParagraphWS color={accentColors[0]}>
            {INCREASED_BY_IMPROVEMENT_TEXT}
          </ParagraphWS>
        )}
      </Box>
      <Box direction="row" fill="horizontal" gap="12px">
        <Box>
          {!!holdingCreator &&
            holdingCreator.strengthOptions.map((option) => {
              return (
                <CheckBox
                  key={option.id}
                  checked={selectedStrengths
                    .map((str: HoldingOption) => str.id)
                    .includes(option.id)}
                  label={option.description}
                  onChange={() => handleStrengthSelect(option)}
                />
              );
            })}
          <Box direction="row" align="center" gap="12px">
            <ParagraphWS>And choose {weaknessesCount}:</ParagraphWS>
            {weaknessesCount < holdingCreator.defaultWeaknessesCount && (
              <ParagraphWS color={accentColors[0]}>
                {DECREASED_BY_IMPROVEMENT_TEXT}
              </ParagraphWS>
            )}
          </Box>

          {!!holdingCreator &&
            holdingCreator.weaknessOptions.map((option) => {
              return (
                <CheckBox
                  key={option.id}
                  checked={selectedWeaknesses
                    .map((wk: HoldingOption) => wk.id)
                    .includes(option.id)}
                  label={option.description}
                  onChange={() => handleWeaknessSelect(option)}
                />
              );
            })}
        </Box>
        <Box
          align="center"
          width="200px"
          flex="grow"
          fill="vertical"
          style={{ maxWidth: '200px' }}
        >
          <DoubleRedBox
            value={holdingSize}
            label="Holding Size"
            width="200px"
            height="90px"
          />
          <DoubleRedBox
            value={`+${surplus}barter`}
            label="Surplus"
            width="200px"
            height="90px"
          />
          <RedTagsBox tags={wants} label="Wants" width="200px" height="150px" />
          <RedTagsBox tags={gigs} label="Gigs" width="200px" height="200px" />
          <DoubleRedBox
            value={`+${gangDefenseArmorBonus}armor`}
            label="Defense bonus"
            width="200px"
            height="90px"
          />
          <DoubleRedBox
            value={gangSize}
            label="Gang Size"
            width="200px"
            height="90px"
          />
          <Box fill="horizontal" direction="row" justify="around" flex="grow">
            <SingleRedBox value={gangHarm} label="Harm" />
            <SingleRedBox value={gangArmor} label="Armor" />
          </Box>
          <RedTagsBox
            tags={gangTags}
            label="Tags"
            width="200px"
            height="90px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HoldingForm;
