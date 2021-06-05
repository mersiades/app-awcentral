import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/client';
import { Box, Tab, TabExtendedProps, Tabs, TabsExtendedProps } from 'grommet';

import PlaybookDisplay from '../PlaybookDisplay';
import { HeadingWS, ParagraphWS } from '../../config/grommetConfig';
import PLAYBOOKS, { PlaybooksData } from '../../queries/playbooks';
import { Playbook } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { decapitalize } from '../../helpers/decapitalize';
import { CHOOSE_YOUR_PLAYBOOK_TEXT, CHANGED_PLAYBOOK_INTRO_TEXT, NEW_PLAYER_INTRO_TEXT } from '../../config/constants';

import '../../assets/styles/transitions.css';

const StyledTab = styled(Tab as FC<TabExtendedProps>)(
  () => css`
    display: flex;
    align-items: center;
    color: blue;
    & div {
      margin-left: 3px;
      margin-right: 3px;
    }
  `
);

const StyledTabs = styled(Tabs as FC<TabsExtendedProps>)(
  () => css`
    width: 100%;
    & div {
      width: 100%;
      justify-content: space-between;
      text-align: center;
    }
  `
);

const CharacterPlaybookForm: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [startFadeOut, setStartFadeOut] = useState(false);
  const [sortedPlaybooks, setSortedPlaybooks] = useState<Playbook[]>([]);

  const [activeTab, setActiveTab] = useState(12);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { character } = useGame();
  const { crustReady } = useFonts();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: playbooksData } = useQuery<PlaybooksData>(PLAYBOOKS);
  const playbooks = playbooksData?.playbooks;

  // ------------------------------------------------------ Effects --------------------------------------------------------- //

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
      setActiveTab(sortedPlaybooks.indexOf(setPlaybook));
    }
  }, [character, playbooks, sortedPlaybooks]);

  // -------------------------------------------------- Render component  ---------------------------------------------------- //
  return (
    <Box
      fill
      data-testid="character-playbook-form"
      pad="24px"
      align="center"
      justify="start"
      className={startFadeOut ? 'fadeOut' : ''}
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <Box width="85vw" align="start" style={{ maxWidth: '763px' }}>
        <Box direction="row" fill="horizontal" justify="start" align="center">
          <HeadingWS crustReady={crustReady} level={2} style={{ maxWidth: 'unset', height: '34px', lineHeight: '44px' }}>
            {CHOOSE_YOUR_PLAYBOOK_TEXT}
          </HeadingWS>
        </Box>
        <Box direction="row" fill="horizontal" justify="between" align="center">
          <StyledTabs
            activeIndex={activeTab}
            onActive={(tab) => {
              setActiveTab(tab);
            }}
          >
            {sortedPlaybooks.map((playbook) => (
              <StyledTab key={playbook.id} title={decapitalize(playbook.playbookType)} name={playbook.playbookType}>
                <PlaybookDisplay playbook={playbook} startFadeOut={() => setStartFadeOut(true)} />
              </StyledTab>
            ))}
          </StyledTabs>
        </Box>
        {activeTab === 12 && (
          <Box direction="row" fill="horizontal" justify="center" align="center" pad={{ vertical: '48px' }}>
            <ParagraphWS textAlign="center">
              {character?.mustChangePlaybook ? CHANGED_PLAYBOOK_INTRO_TEXT : NEW_PLAYER_INTRO_TEXT}
            </ParagraphWS>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CharacterPlaybookForm;
