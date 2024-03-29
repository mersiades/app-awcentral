import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
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
import VehiclesFormContainer from '../components/characterCreation/VehiclesFormContainer';
import BattleVehiclesFormContainer from '../components/characterCreation/BattleVehiclesFormContainer';
import RipSign from '../components/RipSign';
import { useGame } from '../contexts/gameContext';
import { useUser } from '../contexts/userContext';
import { CharacterCreationSteps } from '../@types/enums';
import PLAYBOOKS, { PlaybooksData } from '../queries/playbooks';

export const background = {
  color: 'black',
  dark: true,
  size: 'contain',
  image: 'url(/images/character-creation-background-image.jpg)',
  position: 'top center'
};

const CharacterCreationPage: FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const step = query.get('step');
  const creationStep = !!step ? parseInt(step) : undefined;

  // ----------------------------- Component state -------------------------- //
  const [showScrollable, setShowScrollable] = useState(false);

  // ----------------------------- Refs ------------------------------------- //
  const containerRef = useRef<HTMLDivElement>(null);

  // ----------------------------- Hooks ------------------------------------ //
  const { userId } = useUser();
  const { game, setGameContext, character } = useGame();

  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  // ----------------------------- GraphQL ---------------------------------- //
  // Fetch playbooks now, to speed things up later
  useQuery<PlaybooksData>(PLAYBOOKS);

  // ----------------------------- Component functions ---------------------- //
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

  // ------------------------------- Effects -------------------------------- //
  // Navigate to correct character creation step
  useEffect(() => {
    if (!step) {
      if (!!character) {
        navigate(`/character-creation/${gameId}?step=${1}`);
      } else {
        navigate(`/character-creation/${gameId}?step=${0}`);
      }
    }

    if (step === '0' && !!character) {
      navigate(`/character-creation/${gameId}?step=${1}`);
    }
  }, [step, character, gameId, navigate]);

  // Navigate user to menu page if they are not a member of the game
  useEffect(() => {
    if (!!game && !!userId) {
      const memberIds = game?.players.map((player) => player.id);
      if (!memberIds.includes(userId)) {
        navigate('/menu');
      }
    }
  }, [game, userId, navigate]);

  // Set a scroll event listener for ScrollableIndicator
  useLayoutEffect(() => {
    if (!!containerRef.current) {
      // Set listener for future scrolls
      containerRef.current.addEventListener('scroll', (e) => handleScroll(e));

      // Set showScrollable on component mount
      // There's a bug here, because on initial mount, scrollHeight is always the same as offsetHeight
      if (
        containerRef.current.scrollHeight > containerRef.current.offsetHeight
      ) {
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
      <Box fill background={background} align='center' justify='center'>
        <Spinner />
      </Box>
    );
  }

  // ----------------------------- Render ----------------------------------- //
  return (
    <Box
      data-testid='character-creation-page'
      ref={containerRef}
      fill
      background={background}
      overflow={{ vertical: 'auto' }}
    >
      {character?.isDead && <RipSign />}
      {!game && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(50vh - 12px)',
            left: 'calc(50vw - 12px)'
          }}
        >
          <Spinner />
        </div>
      )}
      <ScrollableIndicator show={showScrollable} />
      <CloseButton
        handleClose={() => {
          if (!!character?.playbook) {
            !!game && navigate(`/player-game/${game.id}`);
          } else {
            navigate('/menu');
          }
        }}
      />

      <CharacterCreationStepper />
      <Box flex='grow'>
        {creationStep === CharacterCreationSteps.intro &&
          !!game &&
          !character && <NewGameIntro />}
        {creationStep === CharacterCreationSteps.selectPlaybook &&
          !!character && <CharacterPlaybookForm />}
        {creationStep === CharacterCreationSteps.selectName &&
          character &&
          character.playbook && <CharacterNameForm />}
        {creationStep === CharacterCreationSteps.selectLooks &&
          character &&
          character.name &&
          character.playbook && <CharacterLooksForm />}
        {creationStep === CharacterCreationSteps.selectStats &&
          character &&
          character.name &&
          character.playbook && <CharacterStatsForm />}
        {creationStep === CharacterCreationSteps.selectGear &&
          character &&
          character.name &&
          character.playbook && <CharacterGearForm />}
        {creationStep === CharacterCreationSteps.setUnique &&
          character &&
          character.name &&
          character.playbook && <PlaybookUniqueRouter />}
        {creationStep === CharacterCreationSteps.setVehicle &&
          character &&
          character.name &&
          character.playbook && <VehiclesFormContainer />}
        {creationStep === CharacterCreationSteps.setBattleVehicle &&
          character &&
          character.name &&
          character.playbook && <BattleVehiclesFormContainer />}
        {creationStep === CharacterCreationSteps.selectMoves &&
          character &&
          !!character.name &&
          character.playbook && <CharacterMovesForm />}
        {creationStep === CharacterCreationSteps.setHx &&
          !!character &&
          !!character.playbook && <CharacterHxForm />}
      </Box>
    </Box>
  );
};

export default CharacterCreationPage;
