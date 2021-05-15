import React, { FC, useEffect, useReducer } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { Box, TextInput, Text, Tip, FormField } from 'grommet';

import DoubleRedBox from '../DoubleRedBox';
import SingleRedBox from '../SingleRedBox';
import Spinner from '../Spinner';
import { accentColors, ButtonWS, neutralColors, RedBox, TextWS } from '../../config/grommetConfig';
import VEHICLE_CREATOR, { VehicleCreatorData, VehicleCreatorVars } from '../../queries/vehicleCreator';
import SET_VEHICLE, { SetVehicleData, SetVehicleVars } from '../../mutations/setVehicle';
import { BattleOptionType, PlaybookType, VehicleFrameType, VehicleType } from '../../@types/enums';
import { VehicleInput } from '../../@types';
import { Vehicle } from '../../@types/dataInterfaces';
import { VehicleBattleOption, VehicleFrame } from '../../@types/staticDataInterfaces';
import { useGame } from '../../contexts/gameContext';
import { GIVE_VEHICLE_NAME_TEXT, GIVE_VEHICLE_NAME_EXAMPLES_TEXT } from '../../config/constants';

interface VehicleTagsBoxProps {
  tags: string[];
  title: string;
  width?: string;
  minHeight?: string;
}

export const VehicleTagsBox: FC<VehicleTagsBoxProps> = ({ tags, title, width = '200px', minHeight }) => (
  <Box
    data-testid={`${title}-tags-box`}
    align="center"
    width={width}
    flex="grow"
    fill="vertical"
    style={{ maxWidth: width }}
  >
    <RedBox fill justify="center" pad="12px" gap="12px" style={{ minHeight }}>
      {tags.join(', ')}
    </RedBox>
    <TextWS weight={600}>{title}</TextWS>
  </Box>
);

interface VehicleFormProps {
  navigateOnSet: (numVehicles: number) => void;
  existingVehicle?: Vehicle;
}

interface VehicleFormState {
  vehicleType: VehicleType;
  name: string;
  frame?: VehicleFrame;
  speed: number;
  handling: number;
  massive: number;
  armor: number;
  strengths: string[];
  looks: string[];
  weaknesses: string[];
  battleOptions: VehicleBattleOption[];
}

interface Action {
  type: 'REPLACE_VEHICLE' | 'UPDATE_VEHICLE' | 'SET_FRAME' | 'SET_NAME';
  payload?: any;
}

const vehicleFormReducer = (state: VehicleFormState, action: Action) => {
  switch (action.type) {
    case 'REPLACE_VEHICLE':
      return action.payload;
    case 'UPDATE_VEHICLE':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_FRAME':
      return {
        ...state,
        frame: action.payload,
        vehicleType: action.payload === VehicleFrameType.bike ? VehicleType.bike : VehicleType.car,
        strengths: [] as string[],
        weaknesses: [] as string[],
        looks: [] as string[],
        battleOptions: [] as VehicleBattleOption[],
        speed: 0,
        handling: 0,
        armor: 0,
        massive: action.payload.massive,
      };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

const VehicleForm: FC<VehicleFormProps> = ({ navigateOnSet, existingVehicle }) => {
  const initialState: VehicleFormState = {
    vehicleType: !!existingVehicle ? existingVehicle.vehicleType : VehicleType.car,
    name: !!existingVehicle ? existingVehicle.name : 'Unnamed vehicle',
    frame: !!existingVehicle ? omit(existingVehicle.vehicleFrame, ['__typename']) : undefined,
    speed: !!existingVehicle ? existingVehicle.speed : 0,
    handling: !!existingVehicle ? existingVehicle.handling : 0,
    massive: !!existingVehicle ? existingVehicle.massive : 0,
    armor: !!existingVehicle ? existingVehicle.armor : 0,
    strengths: !!existingVehicle ? existingVehicle.strengths : [],
    weaknesses: !!existingVehicle ? existingVehicle.weaknesses : [],
    looks: !!existingVehicle ? existingVehicle.looks : [],
    battleOptions: !!existingVehicle
      ? (existingVehicle.battleOptions.map((bo) => omit(bo, ['__typename'])) as VehicleBattleOption[])
      : [],
  };

  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [{ frame, name, strengths, weaknesses, looks, speed, handling, massive, armor, battleOptions }, dispatch] =
    useReducer(vehicleFormReducer, initialState);
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { character, userGameRole } = useGame();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: vehicleCreatorData, loading } = useQuery<VehicleCreatorData, VehicleCreatorVars>(VEHICLE_CREATOR);
  const carCreator = vehicleCreatorData?.vehicleCreator.carCreator;
  const bikeCreator = vehicleCreatorData?.vehicleCreator.bikeCreator;
  const [setVehicle, { loading: settingVehicle }] = useMutation<SetVehicleData, SetVehicleVars>(SET_VEHICLE);
  // ------------------------------------------------- Component functions -------------------------------------------------- //

  const introText =
    frame?.frameType === VehicleFrameType.bike ? bikeCreator?.introInstructions : carCreator?.introInstructions;
  const strengthOptions: string[] | undefined =
    frame?.frameType === VehicleFrameType.bike ? bikeCreator?.strengths : carCreator?.strengths;

  const lookOptions: string[] | undefined =
    frame?.frameType === VehicleFrameType.bike ? bikeCreator?.looks : carCreator?.looks;

  const weaknessOptions: string[] | undefined =
    frame?.frameType === VehicleFrameType.bike ? bikeCreator?.weaknesses : carCreator?.weaknesses;

  const battleOptionOptions: VehicleBattleOption[] | undefined =
    frame?.frameType === VehicleFrameType.bike ? bikeCreator?.battleOptions : carCreator?.battleOptions;

  const increaseStats = (update: Partial<VehicleInput>, option: VehicleBattleOption) => {
    let newUpdate = update;
    switch (option.battleOptionType) {
      case BattleOptionType.speed:
        newUpdate = { ...newUpdate, speed: speed + 1 };
        break;
      case BattleOptionType.handling:
        newUpdate = { ...newUpdate, handling: handling + 1 };
        break;
      case BattleOptionType.massive:
        newUpdate = { ...newUpdate, massive: massive + 1 };
        break;
      case BattleOptionType.armor:
        newUpdate = { ...newUpdate, armor: armor + 1 };
        break;
      default:
    }

    return newUpdate;
  };

  const decreaseStats = (update: Partial<VehicleInput>, option: VehicleBattleOption) => {
    let newUpdate = update;
    switch (option.battleOptionType) {
      case BattleOptionType.speed:
        newUpdate = { ...newUpdate, speed: speed - 1 };
        break;
      case BattleOptionType.handling:
        newUpdate = { ...newUpdate, handling: handling - 1 };
        break;
      case BattleOptionType.massive:
        newUpdate = { ...newUpdate, massive: massive - 1 };
        break;
      case BattleOptionType.armor:
        newUpdate = { ...newUpdate, armor: armor - 1 };
        break;
      default:
    }

    return newUpdate;
  };

  const handleOptionSelect = (
    option: string | VehicleBattleOption,
    type: 'strength' | 'weakness' | 'look' | 'battleOption',
    isSelected: boolean
  ) => {
    let update: Partial<VehicleInput> = {};

    if (type === 'strength') {
      if (isSelected) {
        update = { ...update, strengths: strengths.filter((str: string) => str !== option) };
      } else if (strengths.length < 2) {
        update = { ...update, strengths: [...strengths, option] };
      }
    }

    if (type === 'weakness') {
      if (isSelected) {
        update = { ...update, weaknesses: weaknesses.filter((wk: string) => wk !== option) };
      } else if (weaknesses.length < 2) {
        update = { ...update, weaknesses: [...weaknesses, option] };
      }
    }
    if (type === 'look') {
      if (isSelected) {
        update = { ...update, looks: looks.filter((lk: string) => lk !== option) };
      } else if (looks.length < 2) {
        update = { ...update, looks: [...looks, option] };
      }
    }

    if (type === 'battleOption') {
      const castOption = option as VehicleBattleOption; // Because the option parameter could also be a string
      if (isSelected) {
        update = {
          ...update,
          battleOptions: battleOptions.filter((bo: VehicleBattleOption) => bo.id !== castOption.id),
        };
        update = decreaseStats(update, castOption);
      } else if (battleOptions.length < frame.battleOptionCount) {
        update = {
          ...update,
          battleOptions: [...battleOptions, omit(castOption, ['__typename'])] as VehicleBattleOption[],
        };
        update = increaseStats(update, castOption);
      }
    }

    dispatch({ type: 'UPDATE_VEHICLE', payload: update });
  };

  const handleSetVehicle = async () => {
    if (!!userGameRole && !!character && !character.isDead) {
      const vehicleInput: VehicleInput = {
        id: !!existingVehicle ? existingVehicle.id : undefined,
        name,
        // @ts-ignore
        vehicleFrame: omit(frame, ['__typename']),
        speed,
        handling,
        armor,
        massive,
        strengths,
        weaknesses,
        looks,
        battleOptions,
      };

      try {
        const { data } = await setVehicle({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            // @ts-ignore
            vehicleInput: omit(vehicleInput, ['__typename']),
          },
        });
        !!data && navigateOnSet(data.setVehicle.vehicles.length);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ------------------------------------------------------- Effects -------------------------------------------------------- //

  // Set initial frame if none set already
  useEffect(() => {
    if (!!character && !!bikeCreator && !!carCreator && !existingVehicle) {
      if (character.playbook === PlaybookType.chopper) {
        dispatch({ type: 'SET_FRAME', payload: omit(bikeCreator.frame, ['__typename']) });
      } else {
        dispatch({ type: 'SET_FRAME', payload: omit(carCreator.frames[2], ['__typename']) });
      }
    }
  }, [character, existingVehicle, bikeCreator, carCreator]);

  // Change component state if vehicle changes (ie, when user click on a tab for another vehicle)
  useEffect(() => {
    if (!!character && !!bikeCreator && !!carCreator) {
      const defaultFrame =
        character.playbook === PlaybookType.chopper
          ? omit(bikeCreator.frame, ['__typename'])
          : omit(carCreator.frames[2], ['__typename']);
      const payload: VehicleFormState = {
        name: !!existingVehicle ? existingVehicle.name : 'Unnamed vehicle',
        vehicleType: !!existingVehicle ? existingVehicle.vehicleType : VehicleType.car,
        frame: !!existingVehicle ? omit(existingVehicle.vehicleFrame, ['__typename']) : defaultFrame,
        strengths: !!existingVehicle ? existingVehicle.strengths : [],
        weaknesses: !!existingVehicle ? existingVehicle.weaknesses : [],
        looks: !!existingVehicle ? existingVehicle.looks : [],
        speed: !!existingVehicle ? existingVehicle.speed : 0,
        handling: !!existingVehicle ? existingVehicle.handling : 0,
        massive: !!existingVehicle ? existingVehicle.massive : (defaultFrame.massive as number),
        armor: !!existingVehicle ? existingVehicle.armor : 0,
        battleOptions: !!existingVehicle
          ? (existingVehicle.battleOptions.map((bo) => omit(bo, ['__typename'])) as VehicleBattleOption[])
          : [],
      };
      dispatch({ type: 'REPLACE_VEHICLE', payload });
    }
  }, [existingVehicle, character, bikeCreator, carCreator]);

  // ------------------------------------------------------ Render -------------------------------------------------------- //

  const renderPill = (item: string, isSelected: boolean, callback: (item: string) => void) => {
    return (
      <Box
        data-testid={`${item}-option-pill`}
        key={item}
        height="fit-content"
        background={isSelected ? { color: accentColors[0], dark: true } : neutralColors[0]}
        round="medium"
        pad={{ top: '3px', bottom: '1px', horizontal: '12px' }}
        margin={{ vertical: '3px', horizontal: '3px' }}
        justify="center"
        onClick={() => callback(item)}
        hoverIndicator={{ color: '#698D70', dark: true }}
      >
        <Text weight="bold" size="medium">
          {item}
        </Text>
      </Box>
    );
  };

  const renderBattleOptionPill = (battleOption: VehicleBattleOption) => {
    const isSelected = !!battleOptions.find((bo: VehicleBattleOption) => bo.id === battleOption.id);
    return (
      <Tip key={battleOption.id} content={battleOption.name}>
        <Box
          data-testid={`${battleOption.name}-pill`}
          key={battleOption.id}
          height="fit-content"
          background={isSelected ? { color: accentColors[0], dark: true } : neutralColors[0]}
          round="medium"
          pad={{ top: '3px', bottom: '1px', horizontal: '12px' }}
          margin={{ vertical: '3px', horizontal: '3px' }}
          justify="center"
          onClick={() => handleOptionSelect(battleOption, 'battleOption', isSelected)}
          hoverIndicator={{ color: '#698D70', dark: true }}
        >
          <Text weight="bold" size="medium">
            {battleOption.battleOptionType}
          </Text>
        </Box>
      </Tip>
    );
  };

  const renderFramePill = (frameArg: VehicleFrame) => {
    const isSelected = frame.id === frameArg.id;
    return (
      <Tip key={frameArg.id} content={`Battle options: ${frameArg.battleOptionCount}, massive: ${frameArg.massive}`}>
        <Box
          data-testid={`${frameArg.frameType.toLowerCase()}-bo-pill`}
          height="fit-content"
          background={isSelected ? { color: accentColors[0], dark: true } : neutralColors[0]}
          round="medium"
          pad={{ top: '3px', bottom: '1px', horizontal: '12px' }}
          margin={{ vertical: '3px', horizontal: '3px' }}
          justify="center"
          onClick={() => dispatch({ type: 'SET_FRAME', payload: omit(frameArg, ['__typename']) })}
          hoverIndicator={{ color: '#698D70', dark: true }}
        >
          <Text weight="bold" size="medium">
            {frameArg.frameType.toLowerCase()}
          </Text>
        </Box>
      </Tip>
    );
  };

  if (loading || !character || !carCreator || !frame) {
    return <Spinner />;
  }

  return (
    <Box data-testid="vehicle-form" width="80vw" align="start" justify="start" gap="12px" flex="grow">
      <Box fill="horizontal" justify="between" gap="12px">
        <Box direction="row" justify="between" align="center" gap="12px">
          <TextWS margin={{ bottom: '12px' }}>{introText}</TextWS>
          <ButtonWS
            primary
            alignSelf="start"
            style={{ width: '100px' }}
            label={settingVehicle ? <Spinner fillColor="#FFF" width="56px" height="36px" /> : 'SET'}
            onClick={() => !settingVehicle && handleSetVehicle()}
            disabled={settingVehicle || battleOptions.length < frame.battleOptionCount}
          />
        </Box>
        <Box flex="grow">
          <TextWS>
            <strong>{GIVE_VEHICLE_NAME_TEXT}</strong>
            {` ${GIVE_VEHICLE_NAME_EXAMPLES_TEXT}:`}
          </TextWS>
          <FormField>
            <TextInput
              aria-label="name-input"
              size="xlarge"
              value={name}
              onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            />
          </FormField>
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" gap="12px" margin={{ top: '6px' }}>
        <TextWS>Choose its frame (resets other settings):</TextWS>
        <Box direction="row" fill="horizontal" justify="between" gap="12px">
          <Box direction="row" margin={{ top: '3px' }} wrap>
            {carCreator.frames.map((frame) => renderFramePill(frame))}
          </Box>
          <DoubleRedBox value={frame?.frameType} label="Frame" width="175px" />
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" margin={{ top: '6px' }}>
        <TextWS>
          <strong>Strengths</strong> (choose 1 or 2):
        </TextWS>
        <Box direction="row" gap="12px">
          <Box direction="row" fill align="start" wrap>
            {strengthOptions?.map((strength) => {
              const isSelected = strengths.includes(strength);
              return renderPill(strength, isSelected, () => handleOptionSelect(strength, 'strength', isSelected));
            })}
          </Box>
          <VehicleTagsBox tags={strengths} title="Strengths" width="175px" minHeight="90px" />
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" margin={{ top: '6px' }}>
        <TextWS>
          <strong>Weaknesses</strong> (choose 1 or 2):
        </TextWS>
        <Box direction="row" gap="12px">
          <Box direction="row" fill align="start" wrap>
            {weaknessOptions?.map((weakness) => {
              const isSelected = weaknesses.includes(weakness);
              return renderPill(weakness, isSelected, () => handleOptionSelect(weakness, 'weakness', isSelected));
            })}
          </Box>
          <VehicleTagsBox tags={weaknesses} title="Weaknesses" width="175px" minHeight="90px" />
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" margin={{ top: '6px' }}>
        <TextWS>
          <strong>Looks</strong> (choose 1 or 2):
        </TextWS>
        <Box direction="row" gap="12px">
          <Box direction="row" fill align="start" wrap>
            {lookOptions?.map((look) => {
              const isSelected = looks.includes(look);
              return renderPill(look, isSelected, () => handleOptionSelect(look, 'look', isSelected));
            })}
          </Box>
          <VehicleTagsBox tags={looks} title="Looks" width="175px" minHeight="90px" />
        </Box>
      </Box>
      <Box fill="horizontal" justify="between" margin={{ top: '6px' }}>
        <TextWS>
          <strong>Battle options</strong> (choose {frame.battleOptionCount})
        </TextWS>
        <Box direction="row" justify="between" gap="12px">
          <Box direction="row" fill align="start" wrap>
            {battleOptionOptions?.map((battleOption) => renderBattleOptionPill(battleOption))}
          </Box>
          <Box align="center" width="175px" flex="grow" fill="vertical" style={{ maxWidth: '175px' }}>
            <Box direction="row" justify="between">
              <SingleRedBox value={speed} label="Speed" width="80px" />
              <SingleRedBox value={handling} label="Handling" width="80px" />
            </Box>
            <Box direction="row" justify="between">
              <SingleRedBox value={armor} label="Armor" width="80px" />
              <SingleRedBox value={massive} label="Massive" width="80px" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleForm;
