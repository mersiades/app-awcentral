import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Box, Select, TextArea, TextInput } from 'grommet';

import CloseButton from './CloseButton';
import Spinner from './Spinner';
import { ButtonWS } from '../config/grommetConfig';
import ADD_COMMS_APP, {
  AddCommsAppData,
  AddCommsAppVars,
  getAddCommsAppOR,
} from '../mutations/addCommsApp';
import ADD_COMMS_URL, {
  AddCommsUrlData,
  AddCommsUrlVars,
  getAddCommsUrlOR,
} from '../mutations/addCommsUrl';
import SET_GAME_NAME, {
  SetGameNameData,
  SetGameNameVars,
} from '../mutations/setGameName';
import { useGame } from '../contexts/gameContext';
import { SET_TEXT } from '../config/constants';

interface GameFormProps {
  handleClose: () => void;
}

const GameForm: FC<GameFormProps> = ({ handleClose }) => {
  const { game } = useGame();

  // ----------------------------- Component state ------------------------------ //
  const [app, setApp] = useState(game?.commsApp || '');
  const [url, setUrl] = useState(game?.commsUrl || 'https://');
  const [name, setName] = useState(game?.name || '');

  // ----------------------------- 3rd party hooks ------------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- GraphQL -------------------------------------- //
  const [addCommsApp, { loading: settingApp }] = useMutation<
    AddCommsAppData,
    AddCommsAppVars
  >(ADD_COMMS_APP, {
    variables: { gameId: gameId!, app },
  });
  const [addCommsUrl, { loading: settingUrl }] = useMutation<
    AddCommsUrlData,
    AddCommsUrlVars
  >(ADD_COMMS_URL, {
    variables: { gameId: gameId!, url },
  });

  const [setGameName, { loading: settingName }] = useMutation<
    SetGameNameData,
    SetGameNameVars
  >(SET_GAME_NAME, {
    variables: { gameId: gameId!, name },
  });

  // ----------------------------- Component functions ------------------------- //
  const appOptions = [
    'Discord',
    'Zoom',
    'Skype',
    'FaceTime',
    'WhatsApp',
    'Google Hangouts',
    'Talky',
    'ooVoo',
    'other',
  ];

  const handleSetApp = async () => {
    if (!!app && !!game && gameId) {
      try {
        // TODO: Figure out why optomistic response isn't working here
        await addCommsApp({
          variables: { gameId, app },
          optimisticResponse: getAddCommsAppOR(game, app),
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleSetUrl = async () => {
    if (!!url && !!game && gameId) {
      try {
        await addCommsUrl({
          variables: { gameId, url },
          optimisticResponse: getAddCommsUrlOR(game, url),
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleSetName = () => {
    if (!!name && !!game && gameId) {
      try {
        setGameName({ variables: { gameId, name } });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // ----------------------------- Render ----------------------------------- //
  if (!game) {
    return <Spinner />;
  }

  return (
    <Box
      data-testid="game-form"
      align="start"
      height="500px"
      width="520px"
      direction="column"
      justify="around"
      overflow="auto"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <CloseButton handleClose={handleClose} />
      <Box gap="12px" width="100%" direction="row" justify="between">
        <TextInput
          aria-label="name-input"
          id="text-input-id"
          value={name}
          name="name"
          size="xlarge"
          placeholder={game.name}
          onChange={(e) => setName(e.target.value)}
        />
        <ButtonWS
          label={SET_TEXT}
          name="set-name-button"
          primary
          size="large"
          alignSelf="center"
          onClick={() => handleSetName()}
          disabled={!name || settingName}
        />
      </Box>
      <Box gap="12px" width="100%" direction="row" justify="between">
        <Select
          id="app-input"
          aria-label="app-input"
          name="app"
          placeholder="App"
          options={appOptions}
          value={app}
          onChange={(e) => setApp(e.value)}
        />
        <ButtonWS
          label={SET_TEXT}
          name="set-app-button"
          primary
          size="large"
          alignSelf="center"
          onClick={() => handleSetApp()}
          disabled={!app || settingApp}
        />
      </Box>
      <Box fill="horizontal" gap="small" justify="between">
        <TextArea
          id="url-input"
          aria-label="url-input"
          name="url"
          size="large"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://"
          style={{ height: '100px' }}
        />

        <ButtonWS
          alignSelf="end"
          label={SET_TEXT}
          name="set-url-button"
          primary
          size="large"
          onClick={() => handleSetUrl()}
          disabled={!url || settingUrl}
        />
      </Box>
    </Box>
  );
};

export default GameForm;
