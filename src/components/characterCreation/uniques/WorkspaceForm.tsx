import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Box, Text } from 'grommet';

import { StyledMarkdown } from '../../styledComponents';
import { accentColors, ButtonWS, HeadingWS, ParagraphWS } from '../../../config/grommetConfig';
import PLAYBOOK_CREATOR, { PlaybookCreatorData, PlaybookCreatorVars } from '../../../queries/playbookCreator';
import { CharacterCreationSteps, PlaybookType } from '../../../@types/enums';
import { useFonts } from '../../../contexts/fontContext';
import { useGame } from '../../../contexts/gameContext';
import SET_WORKSPACE, { getSetWorkspaceOR, SetWorkspaceData, SetWorkspaceVars } from '../../../mutations/setWorkspace';
import Spinner from '../../Spinner';
import { WorkspaceInput } from '../../../@types';
import { INCREASED_BY_IMPROVEMENT_TEXT } from '../../../config/constants';
import { omit } from 'lodash';

const ITEMS_INSTRUCTIONS = 'Choose which of the following your workspace includes.';

const WorkspaceForm: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [items, setItems] = useState<string[]>([]);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { character, game, userGameRole } = useGame();
  const { crustReady } = useFonts();
  const workspace = character?.playbookUniques?.workspace;

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
    if (!!userGameRole && !!character && !!game && !!workspaceCreator && !!workspace) {
      const workspaceInput: WorkspaceInput = {
        ...omit(workspace, '__typename'),
        workspaceItems: items,
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
    if (!!workspace) {
      if (items.includes(item)) {
        const newItems = items.filter((itm) => itm !== item);
        setItems(newItems);
      } else if (items.length < workspace.itemsCount) {
        setItems([...items, item]);
      }
    }
  };

  // ------------------------------------------------------- Effects -------------------------------------------------------- //

  // Set existing Workspace when component mounts
  useEffect(() => {
    if (!!workspace) {
      setItems(workspace.workspaceItems);
    }
  }, [workspace]);

  // ------------------------------------------------------ Render -------------------------------------------------------- //

  if (!workspace) {
    return null;
  }

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
          onClick={() => !settingWorkspace && items.length === workspace.itemsCount && handleSubmitWorkspace()}
          disabled={settingWorkspace || items.length !== workspace.itemsCount}
          style={{ height: '45px' }}
        />
      </Box>

      <Box fill="horizontal" justify="between" gap="12px" margin={{ top: '0px' }}>
        <ParagraphWS margin={{ bottom: '6px' }}>{ITEMS_INSTRUCTIONS}</ParagraphWS>
        <Box direction="row" align="center" gap="12px">
          <ParagraphWS margin={{ vertical: '0px' }}>{`Choose ${workspace.itemsCount}:`}</ParagraphWS>
          {!!workspaceCreator && workspaceCreator?.defaultItemsCount < workspace.itemsCount && (
            <ParagraphWS margin={{ vertical: '0px' }} color={accentColors[0]}>
              {INCREASED_BY_IMPROVEMENT_TEXT}
            </ParagraphWS>
          )}
        </Box>
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
