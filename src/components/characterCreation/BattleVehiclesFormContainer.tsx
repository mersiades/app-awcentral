import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs, Tip } from 'grommet';
import { AddCircle } from 'grommet-icons';

import Spinner from '../Spinner';
import BattleVehicleForm from './BattleVehicleForm';
import { ButtonWS, HeadingWS, ParagraphWS } from '../../config/grommetConfig';
import SET_BATTLE_VEHICLE_COUNT, {
  SetBattleVehicleCountData,
  SetBattleVehicleCountVars,
} from '../../mutations/setBattleVehicleCount';
import { CharacterCreationSteps } from '../../@types/enums';
import { useGame } from '../../contexts/gameContext';
import { decapitalize } from '../../helpers/decapitalize';
import { useFonts } from '../../contexts/fontContext';
import {
  ADD_VEHICLE_TEXT,
  PASS_TEXT,
  START_PLAY_WITH_BATTLE_VEHICLE_TEXT,
} from '../../config/constants';
import { logAmpEvent } from '../../config/amplitudeConfig';

const BattleVehiclesFormContainer: FC = () => {
  // ----------------------------- Component state ------------------------------ //

  const [activeTab, setActiveTab] = useState(0);

  // ----------------------------- Hooks ---------------------------------------- //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();

  // ----------------------------- 3rd party hooks ------------------------------- //
  const navigate = useNavigate();

  // ----------------------------- GraphQL -------------------------------------- //
  const [setBattleVehicleCount, { loading: settingBattleVehicleCount }] =
    useMutation<SetBattleVehicleCountData, SetBattleVehicleCountVars>(
      SET_BATTLE_VEHICLE_COUNT
    );

  // ----------------------------- Component functions ------------------------- //

  const handleAddVehicle = async () => {
    if (!!userGameRole && !!character && !character.isDead && !!game) {
      const battleVehicleCount = character.battleVehicleCount + 1;
      try {
        await setBattleVehicleCount({
          variables: {
            gameRoleId: userGameRole.id,
            characterId: character.id,
            battleVehicleCount,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            setBattleVehicleCount: {
              __typename: 'Character',
              ...character,
              battleVehicleCount,
            },
          },
        });
        !character.hasCompletedCharacterCreation &&
          logAmpEvent('set battle vehicle');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const navigateOnSet = (numVehicles: number) => {
    if (!character?.hasCompletedCharacterCreation && !!game) {
      if (character?.battleVehicleCount === numVehicles) {
        navigate(
          `/character-creation/${game.id}?step=${CharacterCreationSteps.setHx}`
        );
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } else {
        !!character &&
          setActiveTab((prevTab) =>
            prevTab < character.vehicleCount ? prevTab + 1 : prevTab
          );
      }
    }
  };

  // ----------------------------- Render ---------------------------------------- //

  if (!character) {
    return <Spinner />;
  }

  if (character.battleVehicleCount === 0) {
    return (
      <Box
        data-testid="no-default-battle-vehicle-message"
        fill
        pad="12px"
        align="center"
        justify="start"
        animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      >
        <Box width="85vw" align="center" style={{ maxWidth: '742px' }}>
          <Box
            direction="row"
            fill="horizontal"
            justify="between"
            align="center"
          >
            <HeadingWS
              level={2}
              crustReady={crustReady}
              textAlign="center"
              style={{ maxWidth: 'unset', height: '34px', lineHeight: '44px' }}
            >
              BATTLE VEHICLES
            </HeadingWS>
            <ButtonWS
              primary
              label={PASS_TEXT}
              onClick={() =>
                !!game &&
                navigate(
                  `/character-creation/${game.id}?step=${CharacterCreationSteps.setHx}`
                )
              }
            />
          </Box>
          <ParagraphWS>
            By default, the {decapitalize(character.playbook)} has no battle
            vehicles.
          </ParagraphWS>
          <ParagraphWS>{START_PLAY_WITH_BATTLE_VEHICLE_TEXT}</ParagraphWS>
          <ButtonWS
            label={ADD_VEHICLE_TEXT}
            secondary
            onClick={() => handleAddVehicle()}
          />
        </Box>
      </Box>
    );
  } else if (character.battleVehicleCount > 0) {
    return (
      <Box
        data-testid="battle-vehicle-form-container"
        fill
        pad="12px"
        align="center"
        justify="start"
        animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      >
        <Box width="85vw" align="center" style={{ maxWidth: '741px' }}>
          <Tabs activeIndex={activeTab} onActive={(tab) => setActiveTab(tab)}>
            {/*
          // @ts-ignore */}
            {[...Array(character.battleVehicleCount).keys()].map((number) => (
              <Tab
                key={number}
                title={`Battle Vehicle ${number + 1}`}
                name={`battle-vehicle-${number + 1}-tab`}
              >
                <BattleVehicleForm
                  navigateOnSet={navigateOnSet}
                  existingVehicle={character.battleVehicles[number]}
                />
              </Tab>
            ))}
            {character.battleVehicleCount ===
              character.battleVehicles.length && (
              <Tip content="Add another vehicle">
                <Box
                  margin={{ horizontal: '24px' }}
                  justify="center"
                  align="center"
                >
                  <AddCircle
                    color="brand"
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      !settingBattleVehicleCount && handleAddVehicle()
                    }
                  />
                </Box>
              </Tip>
            )}
          </Tabs>
        </Box>
      </Box>
    );
  } else {
    return <Spinner />;
  }
};

export default BattleVehiclesFormContainer;
