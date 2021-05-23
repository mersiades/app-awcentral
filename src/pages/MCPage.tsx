import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Tabs, Tab, ThemeContext, Collapsible, Carousel, ResponsiveContext } from 'grommet';
import { useMutation, useQuery } from '@apollo/client';

import GamePanel from '../components/gamePanel/GamePanel';
import MovesPanel from '../components/MovesPanel';
import McPanel from '../components/mcPanel/McPanel';
import ThreatsPanel from '../components/threatsPanel/ThreatsPanel';
import NpcsPanel from '../components/npcsPanel/NpcsPanel';
import MessagesPanel from '../components/messagesPanel/MessagesPanel';
import InvitationForm from '../components/InvitationForm';
import GameForm from '../components/GameForm';
import WarningDialog from '../components/dialogs/WarningDialog';
import FirstSessionDialog from '../components/dialogs/FirstSessionDialog';
import GoToPreGameDialog from '../components/dialogs/GoToPreGameDialog';
import ScriptChange from '../components/ScriptChange';
import {
  Footer,
  LeftMainContainer,
  MainContainer,
  RightMainContainer,
  SidePanel,
  StyledMarkdown,
} from '../components/styledComponents';
import ALL_MOVES, { AllMovesData } from '../queries/allMoves';
import GAMEROLES_BY_USER_ID from '../queries/gameRolesByUserId';
import DELETE_GAME, { DeleteGameData, DeleteGameVars } from '../mutations/deleteGame';
import REMOVE_INVITEE, { RemoveInviteeData, RemoveInviteeVars } from '../mutations/removeInvitee';
import { useKeycloakUser } from '../contexts/keycloakUserContext';
import { useGame } from '../contexts/gameContext';
import { customTabStyles } from '../config/grommetConfig';
import GameNavbar from '../components/GameNavbar';
import { useMcContent } from '../contexts/mcContentContext';
import { GAME_PAGE_BOTTOM_NAVBAR_HEIGHT } from '../config/constants';
import '../assets/styles/transitions.css';

export const background = {
  color: 'black',
  dark: true,
  size: 'contain',
  image: 'url(/images/background-image-9.jpg)',
  position: 'bottom center',
};

export interface ShowInvitation {
  show: boolean;
  showMessageOnly: boolean;
  existingEmail: string;
}

export interface LeftPanelState {
  type: 'MESSAGES' | 'GAME_FORM' | 'INVITATION_FORM';
  [key: string]: any;
}

const MCPage: FC = () => {
  const maxSidePanel = 3;
  const sidePanelWidth = 33;

  // -------------------------------------------------- Component state ---------------------------------------------------- //
  /**
   * Number that indicates what should be shown in the right panel
   * 0 - ThreatsPanel
   * 1 - NpcPanel
   * 2 - None, right panel is closed
   */
  const [rightPanel, setRightPanel] = useState<number>(2);

  /**
   * Number that indicates what should be shown in the side panel
   * 0 - GamePanel
   * 1 - MovesPanel
   * 2 - MCMovesPanel
   * 3 - None, side panel is closed
   */
  const [sidePanel, setSidePanel] = useState<number>(0);
  const [leftPanel, setLeftPanel] = useState<LeftPanelState>({ type: 'MESSAGES' });
  const [showDeleteGameDialog, setShowDeleteGameDialog] = useState(false);
  const [showGoToPreGameDialog, setShowGoToPreGameDialog] = useState(false);
  let hasShownGotToPreGameDialog = useRef(false);

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //

  const { gameId } = useParams<{ gameId: string }>();
  const history = useHistory();
  const size = React.useContext(ResponsiveContext);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game, setGameContext } = useGame();
  const { id: userId } = useKeycloakUser();
  const { tickerData } = useMcContent();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: allMovesData } = useQuery<AllMovesData>(ALL_MOVES);
  const allMoves = allMovesData?.allMoves;
  const [deleteGame] = useMutation<DeleteGameData, DeleteGameVars>(DELETE_GAME);

  const [removeInvitee] = useMutation<RemoveInviteeData, RemoveInviteeVars>(REMOVE_INVITEE);

  // ------------------------------------------------- Component functions -------------------------------------------------- //

  const handleDeleteGame = () => {
    deleteGame({ variables: { gameId }, refetchQueries: [{ query: GAMEROLES_BY_USER_ID, variables: { id: userId } }] });
    history.push('/menu');
  };

  const handleRemoveInvitee = (email: string) => {
    if (game?.invitees.includes(email)) {
      removeInvitee({ variables: { gameId, email } });
    }
  };

  // ------------------------------------------------------- Effects -------------------------------------------------------- //

  // Kick the User off the page if they are not a mc of the game
  useEffect(() => {
    if (!!game && !!userId) {
      if (game.mc?.id !== userId) {
        history.push('/menu');
      }
    }
  }, [game, userId, history]);

  // Sets the GameContext
  useEffect(() => {
    if (!!gameId && !!userId && !!setGameContext) {
      setGameContext(gameId, userId);
    }
  }, [gameId, userId, setGameContext]);

  // Show GoToPreGameDialog if game hasn't finished pre-game
  useEffect(() => {
    if (!!game && !game?.hasFinishedPreGame && !hasShownGotToPreGameDialog.current) {
      setShowGoToPreGameDialog(true);
    }
  }, [game, game?.hasFinishedPreGame]);

  // ------------------------------------------------------ Render -------------------------------------------------------- //

  const renderLeftPanel = () => {
    switch (leftPanel.type) {
      case 'GAME_FORM':
        return <GameForm handleClose={() => setLeftPanel({ type: 'MESSAGES' })} />;
      case 'INVITATION_FORM':
        return (
          <InvitationForm
            handleClose={() => setLeftPanel({ type: 'MESSAGES', existingEmail: '', showMessageOnly: false })}
            existingEmail={leftPanel.existingEmail}
            showMessageOnly={leftPanel.showMessageOnly}
          />
        );
      case 'MESSAGES':
      //deliberately falls through
      default:
        return <MessagesPanel />;
    }
  };
  return (
    <Box fill background={background}>
      {game?.showFirstSession && game.hasFinishedPreGame && <FirstSessionDialog />}
      {!!game && showDeleteGameDialog && (
        <WarningDialog
          title="Delete game?"
          buttonTitle="DELETE"
          text={`Are you sure you want to delete ${game.name}? This can't be undone.`}
          handleClose={() => setShowDeleteGameDialog(false)}
          handleConfirm={handleDeleteGame}
        />
      )}
      {showGoToPreGameDialog && (
        <GoToPreGameDialog
          handleClose={() => {
            hasShownGotToPreGameDialog.current = true;
            setShowGoToPreGameDialog(false);
          }}
        />
      )}
      <GameNavbar isMc={true} />
      <div data-testid="mc-page">
        <Collapsible direction="horizontal" open={sidePanel < 3}>
          <SidePanel sidePanel={sidePanel} growWidth={sidePanelWidth}>
            {!!game && sidePanel === 0 && (
              <GamePanel
                setShowDeleteGameDialog={setShowDeleteGameDialog}
                handleShowInvitationForm={setLeftPanel}
                handleShowGameForm={setLeftPanel}
                handleRemoveInvitee={handleRemoveInvitee}
              />
            )}
            {sidePanel === 1 && !!allMoves && <MovesPanel allMoves={allMoves} />}
            {sidePanel === 2 && <McPanel />}
          </SidePanel>
        </Collapsible>
        <MainContainer fill sidePanel={sidePanel} maxPanels={maxSidePanel} shinkWidth={sidePanelWidth}>
          <LeftMainContainer fill rightPanel={rightPanel}>
            <Box fill align="center" justify="center" pad={{ horizontal: '12px' }}>
              {renderLeftPanel()}
            </Box>
          </LeftMainContainer>
          <RightMainContainer rightPanel={rightPanel}>
            <Box fill align="center" justify="start" pad="12px">
              {rightPanel === 0 && <ThreatsPanel />}
              {rightPanel === 1 && <NpcsPanel />}
            </Box>
          </RightMainContainer>
        </MainContainer>
      </div>
      <Footer direction="row" justify="between" align="center" height={`${GAME_PAGE_BOTTOM_NAVBAR_HEIGHT}px`} wrap>
        <ThemeContext.Extend value={customTabStyles}>
          <Tabs
            activeIndex={sidePanel}
            onActive={(tab) => {
              tab === sidePanel ? setSidePanel(3) : setSidePanel(tab);
            }}
          >
            <Tab title="Game" name="game" />
            {allMoves && <Tab title="Moves" name="moves" />}
            <Tab title="MC" name="mc" />
          </Tabs>

          {size !== 'small' && (
            <Carousel play={60000} controls={false}>
              <div />
              {tickerData?.map((tickerItem, index) => (
                <div
                  key={tickerItem.category + index}
                  style={{
                    width: 'calc(100vw - 700px)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textAlign: 'center',
                  }}
                >
                  <StyledMarkdown>{tickerItem.content}</StyledMarkdown>
                </div>
              ))}
            </Carousel>
          )}
          <Box direction="row" align="center" gap="12px">
            <Tabs activeIndex={rightPanel} onActive={(tab) => (tab === rightPanel ? setRightPanel(2) : setRightPanel(tab))}>
              <Tab title="Threats" name="threats" />
              <Tab title="NPCs" name="npcs" />
            </Tabs>
            <ScriptChange />
          </Box>
        </ThemeContext.Extend>
      </Footer>
    </Box>
  );
};

export default MCPage;
