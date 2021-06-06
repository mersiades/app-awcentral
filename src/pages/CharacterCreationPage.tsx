import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Box } from 'grommet';

import CharacterPlaybookForm from '../components/characterCreation/CharacterPlaybookForm';
import CharacterNameForm from '../components/characterCreation/CharacterNameForm';
import CharacterLooksForm from '../components/characterCreation/CharacterLooksForm';
import CharacterStatsForm from '../components/characterCreation/CharacterStatsForm';
import CharacterGearForm from '../components/characterCreation/CharacterGearForm';
import CharacterMovesForm from '../components/characterCreation/CharacterMovesForm';
import NewGameIntro from '../components/characterCreation/NewGameIntro';
import PlaybookUniqueRouter from '../components/characterCreation/PlaybookUniqueRouter';
import CharacterCreationStepper from '../components/characterCreation/CharacterCreationStepper';
import CharacterHxForm from '../components/characterCreation/CharacterHxForm';
import ScrollableIndicator from '../components/ScrollableIndicator';
import Spinner from '../components/Spinner';
import CloseButton from '../components/CloseButton';
import { CharacterCreationSteps } from '../@types/enums';
import { useKeycloakUser } from '../contexts/keycloakUserContext';
import { useGame } from '../contexts/gameContext';
import VehiclesFormContainer from '../components/characterCreation/VehiclesFormContainer';
import BattleVehiclesFormContainer from '../components/characterCreation/BattleVehiclesFormContainer';
import { useQuery } from '@apollo/client';
import PLAYBOOKS, { PlaybooksData } from '../queries/playbooks';
import RipSign from '../components/RipSign';

export const background = {
  color: 'black',
  dark: true,
  size: 'contain',
  image: 'url(/images/character-creation-background-image.jpg)',
  position: 'top center',
};

const CharacterCreationPage: FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const step = query.get('step');
  const creationStep = !!step ? parseInt(step) : undefined;

  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showScrollable, setShowScrollable] = useState(false);

  // ------------------------------------------------------- Refs -------------------------------------------------------- //
  const containerRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { id: userId } = useKeycloakUser();
  const { game, setGameContext, character } = useGame();

  // --------------------------------------------------3rd party hooks ----------------------------------------------------- //
  const { gameId } = useParams<{ gameId: string }>();
  const history = useHistory();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  // Fetch playbooks now, to speed things up later
  useQuery<PlaybooksData>(PLAYBOOKS);

  // ---------------------------------------- Component functions and variables ------------------------------------------ //
  const handleScroll = (e: any) => {
    if (!e.currentTarget) {
      return;
    }
    if (e.currentTarget.scrollHeight <= e.currentTarget.offsetHeight) {
      setShowScrollable(false);
      return;
    }

    if (e.currentTarget.scrollTop > 0) {
      setShowScrollable(false);
      return;
    }

    if (e.currentTarget.scrollTop === 0) {
      setShowScrollable(true);
      return;
    }
  };

  // --------------------------------------------------- Effects ----------------------------------------------------- //
  // Navigate to correct character creation step
  useEffect(() => {
    if (!step) {
      if (!!character) {
        history.push(`/character-creation/${gameId}?step=${1}`);
      } else {
        history.push(`/character-creation/${gameId}?step=${0}`);
      }
    }

    if (step === '0' && !!character) {
      history.push(`/character-creation/${gameId}?step=${1}`);
    }
  }, [step, character, gameId, history]);

  // Navigate user to menu page if they are not a member of the game
  useEffect(() => {
    if (!!game && !!userId) {
      const memberIds = game?.players.map((player) => player.id);
      if (!memberIds.includes(userId)) {
        history.push('/menu');
      }
    }
  }, [game, userId, history]);

  // Set a scroll event listener for ScrollableIndicator
  useLayoutEffect(() => {
    if (!!containerRef.current) {
      // Set listener for future scrolls
      containerRef.current.addEventListener('scroll', (e) => handleScroll(e));

      // Set showScrollable on component mount
      // There's a bug here, because on initial mount, scrollHeight is always the same as offsetHeight
      if (containerRef.current.scrollHeight > containerRef.current.offsetHeight) {
        setShowScrollable(true);
      } else {
        setShowScrollable(false);
      }
      containerRef.current.scrollTop = 0;
    }
  }, [containerRef, step]);

  // Set the GameContext
  useEffect(() => {
    if (!!gameId && !!userId && !!setGameContext) {
      setGameContext(gameId, userId);
    }
  }, [gameId, userId, setGameContext]);

  if (creationStep === undefined) {
    return (
      <Box fill background={background} align="center" justify="center">
        <Spinner />
      </Box>
    );
  }

  // -------------------------------------------------- Render component  ---------------------------------------------------- //
  return (
    <Box
      data-testid="character-creation-page"
      ref={containerRef}
      fill
      background={background}
      overflow={{ vertical: 'auto' }}
    >
      {character?.isDead && <RipSign />}
      {!game && (
        <div style={{ position: 'absolute', top: 'calc(50vh - 12px)', left: 'calc(50vw - 12px)' }}>
          <Spinner />
        </div>
      )}
      <ScrollableIndicator show={showScrollable} />
      <CloseButton
        handleClose={() => {
          if (!!character?.playbook) {
            !!game && history.push(`/player-game/${game.id}`);
          } else {
            history.push('/menu');
          }
        }}
      />

      <CharacterCreationStepper />
      <Box flex="grow">
        {creationStep === CharacterCreationSteps.intro && !!game && !character && <NewGameIntro />}
        {creationStep === CharacterCreationSteps.selectPlaybook && !!character && <CharacterPlaybookForm />}
        {creationStep === CharacterCreationSteps.selectName && character && character.playbook && <CharacterNameForm />}
        {creationStep === CharacterCreationSteps.selectLooks && character && character.name && character.playbook && (
          <CharacterLooksForm />
        )}
        {creationStep === CharacterCreationSteps.selectStats && character && character.name && character.playbook && (
          <CharacterStatsForm />
        )}
        {creationStep === CharacterCreationSteps.selectGear && character && character.name && character.playbook && (
          <CharacterGearForm />
        )}
        {creationStep === CharacterCreationSteps.setUnique && character && character.name && character.playbook && (
          <PlaybookUniqueRouter />
        )}
        {creationStep === CharacterCreationSteps.setVehicle && character && character.name && character.playbook && (
          <VehiclesFormContainer />
        )}
        {creationStep === CharacterCreationSteps.setBattleVehicle && character && character.name && character.playbook && (
          <BattleVehiclesFormContainer />
        )}
        {creationStep === CharacterCreationSteps.selectMoves && character && !!character.name && character.playbook && (
          <CharacterMovesForm />
        )}
        {creationStep === CharacterCreationSteps.setHx && !!character && !!character.playbook && <CharacterHxForm />}
      </Box>
    </Box>
  );
};

export default CharacterCreationPage;
