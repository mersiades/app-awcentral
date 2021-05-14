import { FC } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Anchor, Box } from 'grommet';

import Spinner from '../Spinner';
import { ButtonWS, HeadingWS, ParagraphWS } from '../../config/grommetConfig';
import CREATE_CHARACTER, { CreateCharacterData, CreateCharacterVars } from '../../mutations/createCharacter';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { NEW_GAME_TEXT, WELCOME_JUNGLE_TEXT, GET_STARTED_TEXT } from '../../config/constants';

const NewGameIntro: FC = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { userGameRole, game } = useGame();
  const { crustReady } = useFonts();

  // --------------------------------------------------3rd party hooks ----------------------------------------------------- //
  const history = useHistory();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const [createCharacter, { loading: creatingCharacter }] =
    useMutation<CreateCharacterData, CreateCharacterVars>(CREATE_CHARACTER);

  // ---------------------------------------- Component functions and variables ------------------------------------------ //
  const handleInitilializeCharacter = async () => {
    if (!!userGameRole && !!game && userGameRole.characters?.length === 0) {
      try {
        await createCharacter({ variables: { gameRoleId: userGameRole?.id } });
        history.push(`/character-creation/${game.id}?step=${1}`);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ------------------------------------------------------ Render -------------------------------------------------------- //
  const renderComms = () => {
    if (!!game) {
      if (!!game.commsApp) {
        if (!!game.commsUrl) {
          return (
            <ParagraphWS textAlign="center" size="medium">
              If you haven't already, join the rest of your crew on{' '}
              <Anchor href={game.commsUrl} target="_blank" rel="noopener noreferrer">
                {game.commsApp}
              </Anchor>
              .
            </ParagraphWS>
          );
        } else {
          return (
            <ParagraphWS textAlign="center" size="medium">
              {`If you haven't already, join the rest of your crew on ${game.commsApp}.`}
            </ParagraphWS>
          );
        }
      } else if (!!game.commsUrl) {
        return (
          <ParagraphWS textAlign="center" size="medium">
            If you haven't already, join the rest of your crew{' '}
            <Anchor href={game.commsUrl} target="_blank" rel="noopener noreferrer">
              here
            </Anchor>
            .
          </ParagraphWS>
        );
      }
    } else {
      // return skeleton
      return null;
    }
  };
  return (
    <Box fill align="center" justify="start" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
      <Box width="85vw" align="center" style={{ maxWidth: '763px' }}>
        <Box direction="row" fill="horizontal" justify="between" align="center">
          <HeadingWS crustReady={crustReady} textAlign="center" level={2} style={{ maxWidth: 'unset' }}>
            {NEW_GAME_TEXT}
          </HeadingWS>
          <ButtonWS
            label={creatingCharacter ? <Spinner fillColor="#FFF" width="52px" height="36px" /> : 'NEXT'}
            primary
            size="large"
            disabled={creatingCharacter}
            onClick={() => handleInitilializeCharacter()}
          />
        </Box>
        <ParagraphWS textAlign="center" size="large">
          {WELCOME_JUNGLE_TEXT}
        </ParagraphWS>
        {renderComms()}
        <ParagraphWS textAlign="center" size="medium">
          {GET_STARTED_TEXT}
        </ParagraphWS>
      </Box>
    </Box>
  );
};

export default NewGameIntro;
