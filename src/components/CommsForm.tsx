import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, Select, Heading, Text, TextArea } from 'grommet';

import Spinner from './Spinner';
import { ButtonWS, ParagraphWS } from '../config/grommetConfig';
import ADD_COMMS_APP, { AddCommsAppData, AddCommsAppVars, getAddCommsAppOR } from '../mutations/addCommsApp';
import ADD_COMMS_URL, { AddCommsUrlData, AddCommsUrlVars, getAddCommsUrlOR } from '../mutations/addCommsUrl';
import { useGame } from '../contexts/gameContext';

interface CommsFormProps {
  setCreationStep: (step: number) => void;
  setHasSkippedComms: (skipped: boolean) => void;
}

const CommsForm: FC<CommsFormProps> = ({ setCreationStep, setHasSkippedComms }) => {
  // ------------------------------------------------- Component state --------------------------------------------------- //
  const [app, setApp] = useState('');
  const [url, setUrl] = useState('');

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game } = useGame();

  // -------------------------------------------------- Graphql hooks ---------------------------------------------------- //

  const [addCommsApp, { loading: loadingCommsApp }] = useMutation<AddCommsAppData, AddCommsAppVars>(ADD_COMMS_APP);
  const [addCommsUrl, { loading: loadingCommsUrl }] = useMutation<AddCommsUrlData, AddCommsUrlVars>(ADD_COMMS_URL);

  // ---------------------------------------- Component functions and variables ------------------------------------------ //
  const appOptions = ['Discord', 'Zoom', 'Skype', 'FaceTime', 'WhatsApp', 'Google Hangouts', 'Talky', 'ooVoo', 'other'];

  const handleSetApp = async () => {
    if (!!app && !!game) {
      try {
        await addCommsApp({
          variables: { gameId: game.id, app },
          optimisticResponse: getAddCommsAppOR(game, app),
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleSetUrl = () => {
    if (!!url && !!game) {
      try {
        addCommsUrl({
          variables: { gameId: game.id, url },
          optimisticResponse: getAddCommsUrlOR(game, url),
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // ------------------------------------------------------- Effects -------------------------------------------------------- //
  useEffect(() => {
    if (!!game) {
      !!game.commsApp && setApp(game.commsApp);
      !!game.commsUrl && setUrl(game.commsUrl);
    }
  }, [game]);

  // ------------------------------------------------ Render component ------------------------------------------------- //

  const renderOption = (option: string) => {
    return (
      <Box pad="xsmall">
        <Text style={{ fontFamily: 'chaparral pro' }}>{option}</Text>
      </Box>
    );
  };

  return (
    <Box
      direction="column"
      fill
      align="center"
      justify="center"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <Box width="65vw" height="70vh" align="center" direction="column" justify="start" overflow="auto">
        <Heading level={2}>COMMS</Heading>
        <Box direction="row" justify="evenly" gap="48px" height="400px">
          <Box direction="column" fill="vertical">
            <ParagraphWS textAlign="center" size="large">
              How will you talk to your players?
            </ParagraphWS>
            <ParagraphWS textAlign="center" size="medium">
              AW Central can manage playbooks, threats, dice rolls etc, but you'll need to use some other app to talk with
              your players.
            </ParagraphWS>
            <ParagraphWS textAlign="center" size="medium">
              If you know your voice comms details, add them here to make it easier for your players to join you.
            </ParagraphWS>
          </Box>
          <Box direction="column" fill="vertical" justify="around">
            <Box direction="column">
              <Box gap="small" direction="row" justify="between">
                <Select
                  aria-label="comms-app-input"
                  name="app"
                  size="large"
                  options={appOptions}
                  value={app}
                  onChange={(e) => setApp(e.value)}
                  children={(option) => renderOption(option)}
                />

                {!!game ? (
                  <ButtonWS
                    aria-label="set-app"
                    label={loadingCommsApp ? <Spinner fillColor="#FFF" width="36px" height="36px" /> : 'SET'}
                    secondary={!!game.commsApp}
                    primary={!game.commsApp}
                    size="large"
                    alignSelf="center"
                    onClick={() => handleSetApp()}
                    disabled={!app}
                  />
                ) : (
                  <ButtonWS label="Set" primary disabled size="large" />
                )}
              </Box>
              <Text color="accent-1" weight="bold" margin={{ top: 'xsmall' }}>
                Video app to use
              </Text>
            </Box>
            <Box direction="column">
              <Box gap="small" direction="row" justify="between">
                <TextArea
                  aria-label="comms-url-input"
                  id="url-input"
                  name="url"
                  size="large"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://"
                />
                {!!game ? (
                  <ButtonWS
                    aria-label="set-url"
                    label={loadingCommsUrl ? <Spinner fillColor="#FFF" width="36px" height="36px" /> : 'SET'}
                    secondary={!!game.commsUrl}
                    primary={!game.commsUrl}
                    size="large"
                    alignSelf="center"
                    onClick={() => handleSetUrl()}
                    disabled={!url}
                  />
                ) : (
                  <ButtonWS label="Set" primary disabled size="large" alignSelf="center" />
                )}
              </Box>
              <Text color="accent-1" weight="bold" margin={{ top: 'xsmall' }}>
                Url to video chat group, meeting, channel etc
              </Text>
            </Box>
            {!!game && (
              <Button
                label={!!game.commsApp && !!game.commsUrl ? 'NEXT' : 'LATER'}
                primary={!!game.commsApp && !!game.commsUrl}
                size="large"
                alignSelf="end"
                onClick={() => {
                  setCreationStep(2);
                  (!game.commsApp || !game.commsUrl) && setHasSkippedComms(true);
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommsForm;
