import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Mail } from 'grommet-icons';
import { Box, Form, FormField, TextInput, TextArea } from 'grommet';

import CloseButton from './CloseButton';
import {
  accentColors,
  ButtonWS,
  HeadingWS,
  ParagraphWS,
  TextWS,
} from '../config/grommetConfig';
import ADD_INVITEE, {
  AddInviteeData,
  AddInviteeVars,
  getAddInviteeOR,
} from '../mutations/addInvitee';
import { useGame } from '../contexts/gameContext';
import { useFonts } from '../contexts/fontContext';
import { useUser } from '../contexts/userContext';
import { copyToClipboard } from '../helpers/copyToClipboard';
import { validateEmail } from '../helpers/validateEmail';
import {
  ADD_ANOTHER_TEXT,
  ADD_EMAIL_ADDRESS_TEXT,
  ADD_TEXT, INVALID_EMAIL_ADDRESS,
  INVITE_A_PLAYER_TO_TEXT,
  NO_MC_AS_PLAYER_TEXT,
  PLAYER_ALREADY_INVITED_TEXT,
  PLAYER_ALREADY_JOINED_GAME_TEXT,
  TELL_HOW_JOIN_GAME_TEXT
} from '../config/constants';

interface InvitationFormProps {
  handleClose: () => void;
  existingEmail?: string;
  showMessageOnly?: boolean;
}

const baseUrl = process.env.REACT_APP_ROOT_URL;

const InvitationForm: FC<InvitationFormProps> = ({
  handleClose,
  existingEmail = '',
  showMessageOnly,
}) => {
  // ----------------------------- Component state -------------------------- //
  const [formValues, setFormValues] = useState<{ email: string }>({
    email: existingEmail,
  });
  const [message, setMessage] = useState(existingEmail);
  const [hasSubmitted, setHasSubmitted] = useState(showMessageOnly);
  const [errorMessage, setErrorMessage] = useState('');

  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();
  // ----------------------------- Hooks ------------------------------------ //
  const { game } = useGame();
  const { crustReady } = useFonts();
  const { email: mcEmail } = useUser();

  // ----------------------------- GraphQL ---------------------------------- //
  const [addInvitee] = useMutation<AddInviteeData, AddInviteeVars>(ADD_INVITEE);
  // ----------------------------- Component functions ---------------------- //
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

    if (!validateEmail(lowercaseEmail)) {
      setErrorMessage(INVALID_EMAIL_ADDRESS);
      return;
    }

    if (!!game && gameId) {
      await addInvitee({
        variables: { gameId, email: lowercaseEmail },
        optimisticResponse: getAddInviteeOR(game, lowercaseEmail),
      });
      setHasSubmitted(true);
    }
  };

  // ----------------------------- Effects ---------------------------------- //
  useEffect(() => {
    const defaultMessage = `Hi. Please join our Apocalypse World game on AW Central.\n\n- Go to ${baseUrl}/join-game\n- Log in (or register) with ${formValues.email}\n- Join the game called ${game?.name}`;
    hasSubmitted && setMessage(defaultMessage);
  }, [hasSubmitted, game, gameId, formValues, setMessage]);

  // ----------------------------- Render ----------------------------------- //

  const renderMessage = () => {
    return (
      <TextArea
        resize={false}
        style={{ height: '33vh', borderRadius: 'unset' }}
        fill
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    );
  };

  return (
    <Box data-testid="invitation-form" pad="12px">
      <CloseButton handleClose={handleClose} />
      <HeadingWS
        crustReady={crustReady}
        level={2}
        margin={{ horizontal: '0px', bottom: '6px', top: '12px' }}
      >{`${INVITE_A_PLAYER_TO_TEXT} ${game?.name}`}</HeadingWS>
      {hasSubmitted ? (
        <Box
          width="520px"
          animation={{
            type: 'fadeIn',
            delay: 0,
            duration: 500,
            size: 'xsmall',
          }}
        >
          <ParagraphWS fill margin="6px">
            {TELL_HOW_JOIN_GAME_TEXT}
          </ParagraphWS>
          <Box
            border={{ color: accentColors[0] }}
            pad="12px"
            background="transparent"
            gap="12px"
          >
            {renderMessage()}
            <ButtonWS
              fill="horizontal"
              secondary
              label="COPY TO CLIPBOARD"
              onClick={() => copyToClipboard(message)}
            />
            <ButtonWS
              primary
              label={ADD_ANOTHER_TEXT}
              onClick={() => {
                setFormValues({ email: '' });
                setHasSubmitted(false);
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          animation={{
            type: 'fadeIn',
            delay: 0,
            duration: 500,
            size: 'xsmall',
          }}
        >
          <ParagraphWS margin="6px">{ADD_EMAIL_ADDRESS_TEXT}</ParagraphWS>
          <Form
            value={formValues}
            onChange={(nextValue: any) => setFormValues(nextValue)}
            onReset={() => {
              setErrorMessage('');
              setFormValues({ email: '' });
            }}
            onSubmit={() => {
              handleAddInvitee(formValues.email);
            }}
          >
            <Box>
              <FormField name="email" width="100%">
                <TextInput
                  aria-label="Email input"
                  placeholder="Type player's email"
                  type="email"
                  name="email"
                  size="xlarge"
                  icon={<Mail />}
                  onFocus={() => setErrorMessage('')}
                />
              </FormField>
              <Box direction="row" justify="between" align="center">
                <TextWS color="accent-3">{errorMessage}</TextWS>
                <ButtonWS
                  type="submit"
                  primary
                  label={ADD_TEXT}
                  alignSelf="end"
                  disabled={!formValues.email || !!errorMessage}
                />
              </Box>
            </Box>
          </Form>
        </Box>
      )}
    </Box>
  );
};

export default InvitationForm;
