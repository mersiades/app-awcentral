import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Form, Box, FormField, TextInput, TextArea } from 'grommet';

import Spinner from './Spinner';
import { ButtonWS, HeadingWS, ParagraphWS, TextWS } from '../config/grommetConfig';
import ADD_INVITEE, { AddInviteeData, AddInviteeVars, getAddInviteeOR } from '../mutations/addInvitee';
import { useFonts } from '../contexts/fontContext';
import { useGame } from '../contexts/gameContext';
import { copyToClipboard } from '../helpers/copyToClipboard';
import { validateEmail } from '../helpers/validateEmail';
import { logAmpEvent } from '../config/amplitudeConfig';
import {
  ADD_TEXT,
  FINISH_TEXT,
  LATER_TEXT,
  NO_MC_AS_PLAYER_TEXT,
  PLAYER_ALREADY_INVITED_TEXT,
  PLAYER_ALREADY_JOINED_GAME_TEXT,
} from '../config/constants';
import { useKeycloakUser } from '../contexts/keycloakUserContext';

const baseUrl = process.env.REACT_APP_ROOT_URL;

const InviteesForm: FC = () => {
  // ------------------------------------------------- Component state --------------------------------------------------- //
  const [formValues, setFormValues] = useState<{ email: string }>({ email: '' });
  const [message, setMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //
  const history = useHistory();

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game } = useGame();
  const { vtksReady } = useFonts();
  const { email: mcEmail } = useKeycloakUser();

  // -------------------------------------------------- Graphql hooks ---------------------------------------------------- //
  const [addInvitee, { loading: loadingAddInvitee }] = useMutation<AddInviteeData, AddInviteeVars>(ADD_INVITEE);

  // ---------------------------------------- Component functions and variables ------------------------------------------ //

  const renderMessage = () => {
    return (
      <TextArea
        resize={false}
        style={{ height: '20vh', borderRadius: 'unset' }}
        fill
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    );
  };

  const handleAddInvitee = async (email: string) => {
    const lowercaseEmail = email.toLowerCase();

    if (game?.invitees.includes(lowercaseEmail)) {
      setErrorMessage(PLAYER_ALREADY_INVITED_TEXT);
      return;
    }

    if (game?.players.map((player) => player.email).includes(lowercaseEmail)) {
      setErrorMessage(PLAYER_ALREADY_JOINED_GAME_TEXT);
      return;
    }

    if (lowercaseEmail === mcEmail) {
      setErrorMessage(NO_MC_AS_PLAYER_TEXT);
      return;
    }

    if (!!game && validateEmail(lowercaseEmail)) {
      await addInvitee({
        variables: { gameId: game.id, email: lowercaseEmail },
        optimisticResponse: getAddInviteeOR(game, lowercaseEmail),
      });
      setHasSubmitted(true);
      logAmpEvent('add invitee');
    }
  };

  useEffect(() => {
    if (!!game) {
      const defaultMessage = `Hi. Please join our Apocalypse World game on AW Central.\n\n- Go to ${baseUrl}/join-game\n- Log in (or register) with ${formValues.email}\n- Join the game called ${game.name}`;
      hasSubmitted && setMessage(defaultMessage);
    }
  }, [hasSubmitted, game, formValues, setMessage]);

  return (
    <Box
      direction="column"
      fill
      align="center"
      justify="center"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <Box width="50vw" flex="grow" align="center" direction="column" justify="start">
        <HeadingWS vtksReady={vtksReady} level={1}>
          INVITE PLAYERS
        </HeadingWS>
        {hasSubmitted ? (
          <Box
            animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
            direction="column"
            align="center"
            width="100%"
          >
            <ParagraphWS style={{ maxWidth: 'unset' }}>
              Let your player know how to join your game. You can edit the instructions below (if you want) and then copy and
              paste into an email, Discord chat etc.
            </ParagraphWS>
            <Box gap="12px" width="100%">
              {renderMessage()}
              <Box direction="row" width="100%" justify="between" gap="12px">
                <ButtonWS secondary label="COPY TO CLIPBOARD" onClick={() => copyToClipboard(message)} />
                <ButtonWS
                  primary
                  label="INVITE ANOTHER"
                  onClick={() => {
                    setFormValues({ email: '' });
                    setHasSubmitted(false);
                  }}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
            <ParagraphWS>First, add the player's email address to the game</ParagraphWS>
            <Form
              value={formValues}
              onChange={(nextValue: any) => setFormValues(nextValue)}
              onReset={() => setFormValues({ email: '' })}
              onSubmit={() => {
                handleAddInvitee(formValues.email);
              }}
            >
              <Box gap="small" direction="row" justify="between" align="center">
                <FormField name="email" width="100%">
                  <TextInput
                    placeholder="Type player's email"
                    type="email"
                    name="email"
                    size="xlarge"
                    onFocus={() => setErrorMessage('')}
                  />
                </FormField>
                {!!game ? (
                  <ButtonWS
                    type="submit"
                    primary={game.invitees.length === 0}
                    secondary={game.invitees.length !== 0}
                    value={validateEmail(formValues.email)}
                    label={loadingAddInvitee ? <Spinner fillColor="#FFF" width="36px" height="36px" /> : ADD_TEXT}
                    disabled={!formValues.email || !!errorMessage}
                  />
                ) : (
                  <ButtonWS label="Set" primary disabled />
                )}
              </Box>
            </Form>
          </Box>
        )}
        <Box
          animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
          fill="horizontal"
          direction="row"
          justify="between"
          align="center"
          margin={{ top: '12px' }}
        >
          <TextWS color="accent-3">{errorMessage}</TextWS>
          {!!game && (
            <ButtonWS
              type="submit"
              value={validateEmail(formValues.email)}
              label={game.invitees.length === 0 ? LATER_TEXT : FINISH_TEXT}
              onClick={() => history.push(`/mc-game/${game.id}`)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InviteesForm;
