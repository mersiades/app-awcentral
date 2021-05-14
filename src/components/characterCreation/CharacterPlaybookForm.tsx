import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box } from 'grommet';

import Spinner from '../Spinner';
import WarningDialog from '../dialogs/WarningDialog';
import { ButtonWS, HeadingWS, ParagraphWS } from '../../config/grommetConfig';
import { StyledMarkdown } from '../styledComponents';
import PLAYBOOKS, { PlaybooksData } from '../../queries/playbooks';
import SET_CHARACTER_PLAYBOOK, {
  SetCharacterPlaybookData,
  SetCharacterPlaybookVars,
} from '../../mutations/setCharacterPlaybook';
import { CharacterCreationSteps, PlaybookType } from '../../@types/enums';
import { Playbook } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { decapitalize } from '../../helpers/decapitalize';
import '../../assets/styles/transitions.css';
import { useHistory } from 'react-router-dom';
import CHANGE_PLAYBOOK, {
  ChangePlaybookData,
  ChangePlaybookVars,
  getChangePlaybookOR,
} from '../../mutations/changePlaybook';

export const CHOOSE_YOUR_PLAYBOOK_TEXT = 'Choose your playbook';
export const NEW_PLAYER_INTRO_TEXT =
  'You should probably wait for your MC and the rest of your crew, tho. No headstarts for nobody in Apocalypse World.';
export const CHANGED_PLAYBOOK_INTRO_TEXT =
  "You've chosen to change your playbook. Do it now, before continuing... you don't wanna throw yourself back out there half-cocked.";

const CharacterPlaybookForm: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | undefined>();
  const [showIntro, setShowIntro] = useState(true);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const [sortedPlaybooks, setSortedPlaybooks] = useState<Playbook[]>([]);
  const [showSwitchWarning, setShowSwitchWarning] = useState<PlaybookType | undefined>();
  const [showResetWarning, setShowResetWarning] = useState<PlaybookType | undefined>();

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game, character, userGameRole } = useGame();
  const { crustReady } = useFonts();

  // --------------------------------------------------3rd party hooks ----------------------------------------------------- //
  const history = useHistory();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: playbooksData } = useQuery<PlaybooksData>(PLAYBOOKS);
  const playbooks = playbooksData?.playbooks;

  const [setCharacterPlaybook, { loading: settingPlaybook }] =
    useMutation<SetCharacterPlaybookData, SetCharacterPlaybookVars>(SET_CHARACTER_PLAYBOOK);

  const [changePlaybook, { loading: changingPlaybook }] =
    useMutation<ChangePlaybookData, ChangePlaybookVars>(CHANGE_PLAYBOOK);

  // ---------------------------------------- Component functions and variables ------------------------------------------ //
  const handlePlaybookClick = (playbook: Playbook) => {
    setShowIntro(false);
    setSelectedPlaybook(undefined);
    setTimeout(() => setSelectedPlaybook(playbook), 0);
  };

  const checkPlaybookReset = (playbookType: PlaybookType) => {
    if (
      !!userGameRole &&
      !!userGameRole.characters &&
      userGameRole.characters.length > 0 &&
      !!character?.playbook &&
      character?.playbook !== playbookType
    ) {
      setShowSwitchWarning(playbookType);
    } else {
      handlePlaybookSelect(playbookType);
    }
  };

  const handlePlaybookSelect = async (playbookType: PlaybookType) => {
    if (!!userGameRole && !!game && !!character) {
      if (!!character.mustChangePlaybook) {
        try {
          await changePlaybook({
            variables: { gameRoleId: userGameRole.id, characterId: character.id, playbookType },
            optimisticResponse: getChangePlaybookOR(character, playbookType),
          });
          history.push(`/character-creation/${game.id}?step=${CharacterCreationSteps.selectStats}`);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await setCharacterPlaybook({
            variables: { gameRoleId: userGameRole.id, characterId: character.id, playbookType },
          });
          setShowSwitchWarning(undefined);
          history.push(`/character-creation/${game.id}?step=${CharacterCreationSteps.selectName}`);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    if (!!playbooks) {
      const sortedPlaybooks = [...playbooks].sort((a, b) => {
        const nameA = a.playbookType.toLowerCase();
        const nameB = b.playbookType.toLowerCase();
        if (nameA < nameB) {
          return -1;
        } else {
          return 1;
        }
      });
      setSortedPlaybooks(sortedPlaybooks);
    }
  }, [playbooks]);

  // If the playbook has already been set, show that playbook to the User
  useEffect(() => {
    if (!!character && !!character.playbook && playbooks) {
      const setPlaybook = playbooks.filter((pb) => pb.playbookType === character.playbook)[0];
      setSelectedPlaybook(setPlaybook);
    }
  }, [character, playbooks]);

  // -------------------------------------------------- Render component  ---------------------------------------------------- //
  return (
    <Box
      fill
      align="center"
      justify="start"
      className={startFadeOut ? 'fadeOut' : ''}
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      {!!showSwitchWarning && (
        <WarningDialog
          title="Switch playbook?"
          buttonTitle="SWITCH"
          text="Changing the playbook will reset the character."
          handleClose={() => setShowSwitchWarning(undefined)}
          handleConfirm={() => handlePlaybookSelect(showSwitchWarning)}
        />
      )}
      {!!showResetWarning && (
        <WarningDialog
          title={`Reset ${decapitalize(showResetWarning)}?`}
          buttonTitle="RESET"
          text={`You'll remain as the ${decapitalize(showResetWarning)} but all other character info will be lost.`}
          handleClose={() => setShowSwitchWarning(undefined)}
          handleConfirm={() => handlePlaybookSelect(showResetWarning)}
        />
      )}
      {!selectedPlaybook && showIntro && (
        <Box width="85vw" align="center" style={{ maxWidth: '763px' }}>
          <Box direction="row" fill="horizontal" justify="start" align="center">
            <HeadingWS crustReady={crustReady} level={2}>
              {CHOOSE_YOUR_PLAYBOOK_TEXT}
            </HeadingWS>
          </Box>
          <ParagraphWS>{character?.mustChangePlaybook ? CHANGED_PLAYBOOK_INTRO_TEXT : NEW_PLAYER_INTRO_TEXT}</ParagraphWS>
        </Box>
      )}
      {!!selectedPlaybook && (
        <Box direction="row" fill="horizontal" margin={{ bottom: '125px' }} justify="center" align="start">
          <Box animation="fadeIn" justify="center">
            <img
              src={selectedPlaybook.playbookImageUrl}
              alt={decapitalize(selectedPlaybook.playbookType)}
              style={{ objectFit: 'contain', maxHeight: '45vh' }}
            />
          </Box>
          <Box pad="12px" animation="fadeIn" justify="around" align="center">
            <Box direction="row" fill="horizontal" justify="between" align="center" margin={{ bottom: '12px' }}>
              <HeadingWS crustReady={crustReady} level={2} alignSelf="center" margin="0px">
                {decapitalize(selectedPlaybook.playbookType)}
              </HeadingWS>
              {selectedPlaybook.playbookType !== character?.playbook ? (
                <ButtonWS
                  label={
                    settingPlaybook || changingPlaybook ? (
                      <Spinner fillColor="#FFF" width="230px" height="36px" />
                    ) : (
                      `SELECT ${decapitalize(selectedPlaybook.playbookType)}`
                    )
                  }
                  primary
                  size="large"
                  onClick={() => {
                    if (!settingPlaybook && !changingPlaybook) {
                      setStartFadeOut(true);
                      checkPlaybookReset(selectedPlaybook.playbookType);
                    }
                  }}
                  style={{ width: '295px' }}
                />
              ) : (
                <ButtonWS
                  label={
                    settingPlaybook || changingPlaybook ? <Spinner fillColor="#FFF" width="230px" height="36px" /> : 'RESET'
                  }
                  secondary
                  size="large"
                  onClick={() => {
                    if (!settingPlaybook && !changingPlaybook) {
                      setStartFadeOut(true);
                      setShowResetWarning(selectedPlaybook.playbookType);
                    }
                  }}
                  style={{ width: '295px' }}
                />
              )}
            </Box>
            <Box overflow="auto" style={{ maxWidth: '856px', maxHeight: '30vh' }}>
              <StyledMarkdown>{selectedPlaybook.intro}</StyledMarkdown>
              <em>
                <StyledMarkdown>{selectedPlaybook.introComment}</StyledMarkdown>
              </em>
            </Box>
          </Box>
        </Box>
      )}

      <Box
        direction="row"
        gap="3px"
        pad="3px"
        align="end"
        justify="around"
        style={{ height: '125px', position: 'absolute', left: 0, bottom: 0, right: 0, top: 'unset' }}
      >
        {sortedPlaybooks.length > 0
          ? sortedPlaybooks.map((playbook) => (
              <Box
                data-testid={`${playbook.playbookType.toLowerCase()}-button`}
                key={playbook.playbookImageUrl}
                onClick={() => handlePlaybookClick(playbook)}
                hoverIndicator={{ color: 'brand', opacity: 0.4 }}
                height="95%"
                justify="center"
                align="center"
                flex="grow"
              >
                <img
                  src={playbook.playbookImageUrl}
                  alt={decapitalize(playbook.playbookType)}
                  style={{ objectFit: 'contain', maxHeight: '98%', maxWidth: '96%' }}
                />
              </Box>
            ))
          : null}
      </Box>
    </Box>
  );
};

export default CharacterPlaybookForm;
