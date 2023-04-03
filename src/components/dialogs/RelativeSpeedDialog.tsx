import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Select } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  relativeSpeedDialogBackground,
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { Vehicle } from '../../@types/dataInterfaces';
import { dummyVehicleFrame } from '../../tests/fixtures/dummyData';
import {
  CANCEL_TEXT,
  OUTDISTANCE_TEXT,
  OUTDISTANCE_VEHICLE_NAME,
  OVERTAKE_TEXT,
} from '../../config/constants';
import { VehicleType } from '../../@types/enums';
import { logAmpEvent } from '../../config/amplitudeConfig';
import { useMoves } from '../../contexts/movesContext';

interface RelativeSpeedDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const RelativeSpeedDialog: FC<RelativeSpeedDialogProps> = ({
  move,
  handleClose,
}) => {
  // ----------------------------- Component state -------------------------- //
  const [mySpeed, setMySpeed] = useState('');
  const [theirSpeed, setTheirSpeed] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, character } = useGame();
  const { makeSpeedRollMove, rollingMove} = useMoves()

  // ----------------------------- Component functions ---------------------- //
  const otherVehicle: Vehicle = {
    id: 'other-vehicle-id',
    vehicleType: VehicleType.car,
    name: 'Other',
    vehicleFrame: dummyVehicleFrame,
    speed: 0,
    handling: 0,
    armor: 0,
    massive: 0,
    strengths: [],
    weaknesses: [],
    looks: [],
    battleOptions: [],
  };

  const handleSpeedRollMove = async () => {
    if (
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove &&
      !!mySpeed &&
      !!theirSpeed
    ) {
      const modifier = parseInt(mySpeed) - parseInt(theirSpeed);
      try {
        makeSpeedRollMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            moveId: move.id,
            modifier,
          },
        });
        logAmpEvent('make move', { move: move.name });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ----------------------------- Render ----------------------------------- //

  const renderVehicleChoice = () => {
    if (!!character && character.vehicles.length > 0) {
      return (
        <Box fill align="start" justify="start">
          <ParagraphWS alignSelf="start">What are you driving?</ParagraphWS>
          <Select
            aria-label="my vehicle select"
            name="my-vehicle"
            placeholder="My vehicle"
            options={[...character.vehicles, otherVehicle]}
            labelKey="name"
            valueKey="name"
            onChange={(e) => {
              setSelectedVehicle(e.value);
              if (e.value.id !== 'other-vehicle-id') {
                setMySpeed(e.value.speed.toString());
              } else {
                setMySpeed('');
              }
            }}
          />
          {selectedVehicle?.id === 'other-vehicle-id' && (
            <Select
              aria-label="other vehicle select"
              name="other-vehicle"
              placeholder="My speed"
              options={['0', '1', '2', '3']}
              value={mySpeed}
              onChange={(e) => setMySpeed(e.value)}
              margin={{ top: '12px' }}
            />
          )}
        </Box>
      );
    } else if (!!character) {
      return (
        <Box fill align="start" justify="start">
          <ParagraphWS alignSelf="start">
            What is the speed of your vehicle?
          </ParagraphWS>
          <Select
            aria-label="my speed select"
            name="my-speed"
            placeholder="My speed"
            options={['0', '1', '2', '3']}
            value={mySpeed}
            onChange={(e) => setMySpeed(e.value)}
          />
        </Box>
      );
    }
  };

  return (
    <DialogWrapper
      background={relativeSpeedDialogBackground}
      handleClose={handleClose}
    >
      <Box gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <Box direction="row" gap="24px">
          {character && renderVehicleChoice()}
          <Box fill align="start" justify="start">
            <ParagraphWS alignSelf="start">
              What is the speed of their vehicle?
            </ParagraphWS>
            <Select
              id="target-character-input"
              aria-label="opposition speed select"
              name="opposition-speed"
              placeholder="Their speed"
              options={['0', '1', '2', '3']}
              value={theirSpeed}
              onChange={(e) => setTheirSpeed(e.value)}
            />
          </Box>
        </Box>
        <Box fill="horizontal" direction="row" justify="end" gap="small">
          <ButtonWS
            label={CANCEL_TEXT}
            style={{
              background: 'transparent',
              textShadow:
                '0 0 1px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000',
            }}
            onClick={handleClose}
          />
          <ButtonWS
            label={
              move.name === OUTDISTANCE_VEHICLE_NAME
                ? OUTDISTANCE_TEXT
                : OVERTAKE_TEXT
            }
            primary
            onClick={() => !rollingMove && handleSpeedRollMove()}
            disabled={rollingMove || !mySpeed || !theirSpeed}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default RelativeSpeedDialog;
