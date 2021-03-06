import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FormField, TextInput, Box, Form } from 'grommet';

import Spinner from './Spinner';
import { ButtonWS, TextWS } from '../config/grommetConfig';
import { useKeycloakUser } from '../contexts/keycloakUserContext';
import CREATE_GAME, {
  CreateGameData,
  CreateGameVars,
  getCreateGameOR,
} from '../mutations/createGame';
import GAMEROLES_BY_USER_ID from '../queries/gameRolesByUserId';
import { logAmpEvent } from '../config/amplitudeConfig';
import { CREATE_GAME_INSTRUCTIONS, SUBMIT_TEXT } from '../config/constants';

const CreateGameForm: FC = () => {
  const [gameName, setGameName] = useState({ name: '' });
  const { id: userId, username: displayName, email } = useKeycloakUser();
  const [createGame, { loading: loadingCreateGame }] = useMutation<
    CreateGameData,
    CreateGameVars
  >(CREATE_GAME);
  const history = useHistory();

  const sendNewGameRequest = async (userId: string, name: string) => {
    if (!!userId && !!displayName) {
      // Tell awcentral-api to create a new game
      const { data: newGame } = await createGame({
        // @ts-ignore
        variables: { userId, name, displayName, email },
        // skip: !displayName || !email,
        optimisticResponse: getCreateGameOR(name, userId, displayName),
        refetchQueries: [
          { query: GAMEROLES_BY_USER_ID, variables: { id: userId } },
        ],
      });
      logAmpEvent('give game name');

      const gameId = newGame?.createGame.id;

      if (!!gameId) {
        history.push(`/create-game/${gameId}`);
      }
    }
  };

  return (
    <Form
      value={gameName}
      onChange={(nextName: any) => setGameName(nextName)}
      onReset={() => setGameName({ name: '' })}
      onSubmit={async ({ value: { name } }: any) =>
        !!userId && !loadingCreateGame && sendNewGameRequest(userId, name)
      }
    >
      <Box gap="small">
        <FormField name="name" label="Name" htmlFor="text-input-id">
          <TextInput
            id="text-input-id"
            name="name"
            autoFocus
            size="xlarge"
            placeholder={`${displayName}'s game`}
          />
        </FormField>
        <TextWS color="accent-1" margin={{ top: 'xsmall' }}>
          {CREATE_GAME_INSTRUCTIONS}
        </TextWS>
        <ButtonWS
          type="submit"
          label={
            loadingCreateGame ? (
              <Spinner fillColor="#FFF" fillHorizontal />
            ) : (
              SUBMIT_TEXT
            )
          }
          primary
          size="large"
          alignSelf="center"
          disabled={!gameName.name}
          fill
        />
      </Box>
    </Form>
  );
};

export default CreateGameForm;
