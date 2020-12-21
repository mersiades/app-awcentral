import { useMutation } from '@apollo/client';
import { Box, Heading, Paragraph, Select, Button, FormField, TextInput, TextArea, ThemeContext } from 'grommet';
import React, { FC, useState } from 'react';
import { Game } from '../@types';

import ADD_COMMS_APP, { AddCommsAppData, AddCommsAppVars } from '../mutations/addCommsApp';
import ADD_COMMS_URL, { AddCommsUrlData, AddCommsUrlVars } from '../mutations/addCommsUrl';

interface CommsFormShortProps {
  game: Game;
  setShowCommsForm: (show: boolean) => void;
}

const CommsFormShort: FC<CommsFormShortProps> = ({ game, setShowCommsForm }) => {
  // ------------------------------------------------- Component state --------------------------------------------------- //
  const [app, setApp] = useState(game.commsApp || '');
  const [url, setUrl] = useState(game.commsUrl || '');

  // -------------------------------------------------- Graphql hooks ---------------------------------------------------- //
  const [addCommsApp] = useMutation<AddCommsAppData, AddCommsAppVars>(ADD_COMMS_APP, {
    variables: { gameId: game.id, app },
  });
  const [addCommsUrl] = useMutation<AddCommsUrlData, AddCommsUrlVars>(ADD_COMMS_URL, {
    variables: { gameId: game.id, url },
  });

  // ---------------------------------------- Component functions and variables ------------------------------------------ //
  const appOptions = ['Discord', 'Zoom', 'Skype', 'FaceTime', 'WhatsApp', 'Google Hangouts', 'Talky', 'ooVoo', 'other'];

  const handleSetApp = () => {
    if (!!app) {
      try {
        addCommsApp({ variables: { gameId: game.id, app } });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleSetUrl = () => {
    if (!!url) {
      try {
        addCommsUrl({ variables: { gameId: game.id, url } });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const getUrlSize = () => {
    if (url.length < 20) {
      return 'xlarge';
    } else if (url.length < 50) {
      return 'large';
    } else {
      return 'medium';
    }
  };

  return (
    <Box
      direction="column"
      fill
      align="center"
      justify="center"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <Box align="center" direction="column" justify="between" overflow="auto">
        <Box width="30vw" gap="medium">
          <Box gap="small" width="100%" direction="row" justify="between">
            <Select
              id="app-input"
              name="app"
              size="xlarge"
              placeholder="App"
              options={appOptions}
              value={app}
              onChange={(e) => setApp(e.value)}
            />

            {!!game.commsApp ? (
              <Button label="SET" secondary size="large" alignSelf="center" onClick={() => handleSetApp()} disabled={!app} />
            ) : (
              <Button label="SET" primary size="large" alignSelf="center" onClick={() => handleSetApp()} disabled={!app} />
            )}
          </Box>
          <Box gap="small" direction="row" justify="between">
            <TextArea
              id="url-input"
              name="url"
              size="xlarge"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://"
            />

            {!!game.commsUrl ? (
              <Button label="SET" secondary size="large" alignSelf="center" onClick={() => handleSetUrl()} disabled={!url} />
            ) : (
              <Button label="SET" primary size="large" alignSelf="center" onClick={() => handleSetUrl()} disabled={!url} />
            )}
          </Box>
          <Button label="CLOSE" size="large" alignSelf="end" onClick={() => setShowCommsForm(false)} />
          {/*!!game.commsApp && !!game.commsUrl ? (
        <Button label="NEXT" primary size="large" alignSelf="end" onClick={() => setCreationStep(2)} />
      ) : (
        <Button label="LATER" size="large" alignSelf="end" onClick={() => setCreationStep(2)} />
      )*/}
        </Box>
      </Box>
    </Box>
  );
};

export default CommsFormShort;
