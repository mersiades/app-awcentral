import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box } from 'grommet';

import CommsForm from '../components/CommsForm';
import GameCreationStepper from '../components/GameCreationStepper';
import InviteesForm from '../components/InviteesForm';
import CloseButton from '../components/CloseButton';
import { useKeycloakUser } from '../contexts/keycloakUserContext';
import { useGame } from '../contexts/gameContext';

export const background = {
  color: 'black',
  dark: true,
  position: 'right top',
  size: 'contain',
  image: 'url(/images/background-image-4.jpg)',
};

const CreateGamePage = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [creationStep, setCreationStep] = useState<number>(0);
  const [hasSkippedComms, setHasSkippedComms] = useState(false);

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //
  const history = useHistory();
  const { gameId } = useParams<{ gameId: string }>();

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { id: userId } = useKeycloakUser();
  const { game, fetchingGame, setGameContext } = useGame();

  // ---------------------------------------------------- UseEffects  ------------------------------------------------------ //
  useEffect(() => {
    if (!!game) {
      if ((!game.commsApp || !game.commsUrl) && !hasSkippedComms) {
        setCreationStep(1);
      } else {
        setCreationStep(2);
      }
    }
  }, [gameId, game, hasSkippedComms, setCreationStep]);

  // Sets the GameContext
  useEffect(() => {
    if (!fetchingGame && !!gameId && !!userId && !!setGameContext) {
      setGameContext(gameId, userId);
    }
  }, [fetchingGame, gameId, userId, setGameContext]);

  // -------------------------------------------------- Render component ---------------------------------------------------- //

  return (
    <Box data-testid="create-game-page" fill background={background} pad="6px" overflow={{ vertical: 'auto' }}>
      <CloseButton handleClose={() => history.push('/menu')} />
      <Box fill direction="column" justify="start">
        <GameCreationStepper
          setCreationStep={setCreationStep}
          currentStep={creationStep}
          setHasSkippedComms={setHasSkippedComms}
        />
        {creationStep === 1 && <CommsForm setCreationStep={setCreationStep} setHasSkippedComms={setHasSkippedComms} />}
        {creationStep === 2 && <InviteesForm />}
      </Box>
    </Box>
  );
};

export default CreateGamePage;
