import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Box, ResponsiveContext } from 'grommet';

import Spinner from './Spinner';
import WarningDialog from './dialogs/WarningDialog';
import { StyledMarkdown } from './styledComponents';
import CHANGE_PLAYBOOK, { ChangePlaybookData, ChangePlaybookVars, getChangePlaybookOR } from '../mutations/changePlaybook';
import SET_CHARACTER_PLAYBOOK, {
  SetCharacterPlaybookData,
  SetCharacterPlaybookVars,
} from '../mutations/setCharacterPlaybook';
import { useGame } from '../contexts/gameContext';
import { CharacterCreationSteps, PlaybookType } from '../@types/enums';
import { Playbook } from '../@types/staticDataInterfaces';
import { logAmpEvent } from '../config/amplitudeConfig';
import { ButtonWS } from '../config/grommetConfig';
import { decapitalize } from '../helpers/decapitalize';

interface PlaybookDisplayProps {
  playbook: Playbook;
  startFadeOut: () => void;
}

const PlaybookDisplay: FC<PlaybookDisplayProps> = ({ playbook, startFadeOut }) => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showSwitchWarning, setShowSwitchWarning] = useState<PlaybookType | undefined>();
  const [showResetWarning, setShowResetWarning] = useState<PlaybookType | undefined>();

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game, character, userGameRole } = useGame();

  // --------------------------------------------------3rd party hooks ----------------------------------------------------- //
  const history = useHistory();
  const size = useContext(ResponsiveContext);

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const [setCharacterPlaybook, { loading: settingPlaybook }] =
    useMutation<SetCharacterPlaybookData, SetCharacterPlaybookVars>(SET_CHARACTER_PLAYBOOK);

  const [changePlaybook, { loading: changingPlaybook }] =
    useMutation<ChangePlaybookData, ChangePlaybookVars>(CHANGE_PLAYBOOK);

  // ---------------------------------------- Component functions and variables ------------------------------------------ //
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
          !character.hasCompletedCharacterCreation && logAmpEvent('choose playbook');
          setShowSwitchWarning(undefined);
          history.push(`/character-creation/${game.id}?step=${CharacterCreationSteps.selectName}`);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // -------------------------------------------------- Render component  ---------------------------------------------------- //
  return (
    <Box direction="row" fill="horizontal" margin={{ bottom: '125px' }} justify="center" align="start">
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
          handleClose={() => setShowResetWarning(undefined)}
          handleConfirm={() => handlePlaybookSelect(showResetWarning)}
        />
      )}
      {size !== 'small' && (
        <Box animation="fadeIn" justify="center">
          <img
            src={playbook.playbookImageUrl}
            alt={decapitalize(playbook.playbookType)}
            style={{ objectFit: 'contain', maxHeight: '45vh' }}
          />
        </Box>
      )}
      <Box pad="12px" animation="fadeIn" justify="around" align="center">
        <Box overflow="auto" style={{ maxWidth: '856px', maxHeight: '400px' }} flex>
          <StyledMarkdown>{playbook.intro}</StyledMarkdown>
          <em>
            <StyledMarkdown>{playbook.introComment}</StyledMarkdown>
          </em>
        </Box>
        <Box border direction="row" fill="horizontal" justify="center" align="center" margin={{ top: '12px' }}>
          {playbook.playbookType !== character?.playbook ? (
            <ButtonWS
              label={
                settingPlaybook || changingPlaybook ? (
                  <Spinner fillColor="#FFF" width="230px" height="36px" />
                ) : (
                  `SELECT ${decapitalize(playbook.playbookType)}`
                )
              }
              primary
              size="large"
              onClick={() => {
                if (!settingPlaybook && !changingPlaybook) {
                  startFadeOut();
                  checkPlaybookReset(playbook.playbookType);
                }
              }}
              style={{ width: '100%' }}
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
                  startFadeOut();
                  setShowResetWarning(playbook.playbookType);
                }
              }}
              style={{ width: '100%' }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default PlaybookDisplay;
