import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Box, Text } from 'grommet';

import { StyledMarkdown } from '../../styledComponents';
import { ButtonWS, HeadingWS } from '../../../config/grommetConfig';
import PLAYBOOK_CREATOR, { PlaybookCreatorData, PlaybookCreatorVars } from '../../../queries/playbookCreator';
import { CharacterCreationSteps, PlaybookType } from '../../../@types/enums';
import { useFonts } from '../../../contexts/fontContext';
import { useGame } from '../../../contexts/gameContext';
import SET_WORKSPACE, { getSetWorkspaceOR, SetWorkspaceData, SetWorkspaceVars } from '../../../mutations/setWorkspace';
import Spinner from '../../Spinner';
import { WorkspaceInput } from '../../../@types';

const ITEMS_INSTRUCTIONS = 'Choose which of the following your workspace includes. Choose 3:';

const WorkspaceForm: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [items, setItems] = useState<string[]>([]);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { character, game, userGameRole } = useGame();
  const { crustReady } = useFonts();

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //
  const history = useHistory();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: pbCreatorData } = useQuery<PlaybookCreatorData, PlaybookCreatorVars>(PLAYBOOK_CREATOR, {
    variables: { playbookType: PlaybookType.savvyhead },
  });

  const workspaceCreator = pbCreatorData?.playbookCreator.playbookUniqueCreator?.workspaceCreator;
  const [setWorkspace, { loading: settingWorkspace }] = useMutation<SetWorkspaceData, SetWorkspaceVars>(SET_WORKSPACE);

  // ------------------------------------------------- Component functions -------------------------------------------------- //

  const handleSubmitWorkspace = async () => {
    if (!!userGameRole && !!character && !!game && !!workspaceCreator) {
      const workspaceInput: WorkspaceInput = {
        id: character.playbookUniques?.workspace ? character.playbookUniques.workspace.id : undefined,
        workspaceItems: items,
        workspaceInstructions: workspaceCreator.workspaceInstructions,
        projectInstructions: workspaceCreator.projectInstructions,
        projects: character.playbookUniques?.workspace ? character.playbookUniques.workspace.projects : [],
      };

      try {
        setWorkspace({
          variables: { gameRoleId: userGameRole.id, characterId: character.id, workspace: workspaceInput },
          optimisticResponse: getSetWorkspaceOR(character, workspaceInput),
        });
        if (!character.hasCompletedCharacterCreation) {
          history.push(`/character-creation/${game.id}?step=${CharacterCreationSteps.selectMoves}`);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleItemSelect = (item: string) => {
    if (!!workspaceCreator) {
      if (items.includes(item)) {
        const newItems = items.filter((itm) => itm !== item);
        setItems(newItems);
      } else if (items.length < workspaceCreator?.itemsCount) {
        setItems([...items, item]);
      }
    }
  };

  // ------------------------------------------------------- Effects -------------------------------------------------------- //

  // Set existing Workspace when component mounts
  useEffect(() => {
    if (!!character?.playbookUniques?.workspace) {
      setItems(character.playbookUniques.workspace.workspaceItems);
    }
  }, [character]);

  // ------------------------------------------------------ Render -------------------------------------------------------- //

  const renderPills = (item: string) => (
    <Box
      data-testid={`${item}-pill`}
      key={item}
      background={items.includes(item) ? { color: '#698D70', dark: true } : '#4C684C'}
      round="medium"
      pad={{ top: '3px', bottom: '1px', horizontal: '12px' }}
      margin={{ vertical: '3px', horizontal: '3px' }}
      justify="center"
      onClick={() => handleItemSelect(item)}
      style={{ boxShadow: '0 0 3px 0.5px #000' }}
      hoverIndicator={{ color: '#698D70', dark: true }}
    >
      <Text size="medium">{item}</Text>
    </Box>
  );

  return (
    <Box
      data-testid="workspace-form"
      justify="start"
      width="85vw"
      align="start"
      style={{ maxWidth: '742px' }}
      margin={{ bottom: '24px' }}
      gap="12px"
    >
      <Box direction="row" fill="horizontal" align="center" justify="between">
        <HeadingWS crustReady={crustReady} level={2} style={{ maxWidth: 'unset', height: '34px', lineHeight: '44px' }}>{`${
          !!character?.name ? character.name?.toUpperCase() : '...'
        }'S WORKSPACE`}</HeadingWS>
        <ButtonWS
          primary
          label={settingWorkspace ? <Spinner fillColor="#FFF" width="37px" height="36px" /> : 'SET'}
          onClick={() => !settingWorkspace && items.length === 3 && handleSubmitWorkspace()}
          disabled={settingWorkspace || items.length < 3}
          style={{ height: '45px' }}
        />
      </Box>

      <Box fill="horizontal" justify="between" gap="12px" margin={{ top: '6px' }}>
        <StyledMarkdown>{ITEMS_INSTRUCTIONS}</StyledMarkdown>
        <Box direction="row" gap="12px">
          <Box direction="row" wrap>
            {workspaceCreator?.workspaceItems.map((item) => renderPills(item))}
          </Box>
        </Box>
      </Box>
      <StyledMarkdown>
        {workspaceCreator?.workspaceInstructions ? workspaceCreator.workspaceInstructions : '...'}
      </StyledMarkdown>
      <HeadingWS crustReady={crustReady} level={3}>
        Projects
      </HeadingWS>
      <StyledMarkdown>{workspaceCreator?.projectInstructions ? workspaceCreator.projectInstructions : '...'}</StyledMarkdown>
    </Box>
  );
};

export default WorkspaceForm;
