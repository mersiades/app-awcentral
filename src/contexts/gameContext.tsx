import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Character, Game, GameRole } from '../@types/dataInterfaces';
import { RoleType } from '../@types/enums';
import GAME, { GameData, GameVars } from '../queries/game';

/**
 * This context keeps track of the current Game. In particular,
 * it separates out the GameRoles into the following categories:
 *  - the GameRole for the Game's MC
 *  - the GameRole for the current User
 *  - all the player GameRoles
 *  - all the player GameRoles except the current User (if they are a player)
 */

interface IGameContext {
  game?: Game;
  fetchingGame?: boolean;
  userGameRole?: GameRole;
  mcGameRole?: GameRole;
  allPlayerGameRoles?: GameRole[];
  otherPlayerGameRoles?: GameRole[];
  character?: Character;
  setGameContext?: (gameId: string, userId: string) => void;
  clearGameContext?: () => void;
}

interface GameProviderProps {
  children: JSX.Element;
  injectedGame?: Game; // Only used for mocking context in tests
  injectedGameId?: string; // Only used for mocking context in tests
  injectedUserId?: string; // Only used for mocking context in tests
  injectedCharacter?: Character;
}

const GameContext = createContext<IGameContext>({});

export const useGame = () => useContext(GameContext);

export const GameConsumer = GameContext.Consumer;

export const GameProvider: FC<GameProviderProps> = ({
  children,
  injectedGame,
  injectedGameId,
  injectedUserId,
  injectedCharacter,
}) => {
  // ----------------------------- Component state ------------------------------ //
  const [gameId, setGameId] = useState<string | undefined>(injectedGameId);
  const [userId, setUserId] = useState<string | undefined>(injectedUserId);
  const [game, setGame] = useState<Game | undefined>(injectedGame);
  const [userGameRole, setUserGameRole] = useState<GameRole | undefined>(
    undefined
  );
  const [mcGameRole, setMcGameRole] = useState<GameRole | undefined>(undefined);
  const [allPlayerGameRoles, setAllPlayerGameRoles] = useState<
    GameRole[] | undefined
  >(undefined);
  const [otherPlayerGameRoles, setOtherPlayerGameRoles] = useState<
    GameRole[] | undefined
  >(undefined);
  const [character, setCharacter] = useState<Character | undefined>(
    injectedCharacter
  );

  // ----------------------------- 3rd party hooks ------------------------------- //
  const history = useHistory();

  // ----------------------------- GraphQL -------------------------------------- //
  const {
    data,
    loading: fetchingGame,
    error,
    stopPolling,
  } = useQuery<GameData, GameVars>(GAME, {
    // @ts-ignore
    variables: { gameId },
    pollInterval: 2500,
    skip: !gameId,
  });
  // ----------------------------- Component functions ------------------------- //

  const setGameContext = (gameId: string, userId: string) => {
    setUserId(userId);
    setGameId(gameId);
  };

  const clearGameContext = useCallback(() => {
    stopPolling();
    setGameId(undefined);
    setGame(undefined);
    setUserGameRole(undefined);
    setMcGameRole(undefined);
    setAllPlayerGameRoles(undefined);
    setOtherPlayerGameRoles(undefined);
    setCharacter(undefined);
  }, [stopPolling]);

  // --------------------------------------------------- Effects ----------------------------------------------------- //

  useEffect(() => {
    if (!!game) {
      const userGameRole = game.gameRoles.find(
        (gameRole) => gameRole.userId === userId
      );
      const mcGameRole = game.gameRoles.find(
        (gameRole) => gameRole.role === RoleType.mc
      );
      const allPlayerGameRoles = game.gameRoles.filter(
        (gameRole) => gameRole.role === RoleType.player
      );
      const otherPlayerGameRoles = game.gameRoles.filter(
        (gameRole) =>
          gameRole.role === RoleType.player && gameRole.userId !== userId
      );
      if (!!userGameRole && userGameRole?.characters.length === 1) {
        setCharacter(userGameRole.characters[0]);
      } else if (!!userGameRole && userGameRole?.characters.length > 1) {
        // TODO: get PlayerPage to prompt user to select a character
      }
      setUserGameRole(userGameRole);
      setMcGameRole(mcGameRole);
      setAllPlayerGameRoles(allPlayerGameRoles);
      setOtherPlayerGameRoles(otherPlayerGameRoles);
    }
  }, [
    game,
    userId,
    setUserGameRole,
    setMcGameRole,
    setAllPlayerGameRoles,
    setOtherPlayerGameRoles,
  ]);

  useEffect(() => {
    if (!fetchingGame && !!gameId) {
      if (!!data) {
        if (!data.game) {
          // If the game query returned without a game because bad game id
          history.push(`/menu`);
          clearGameContext();
        } else {
          setGame(data.game);
        }
      }
    }
  }, [data, fetchingGame, gameId, history, clearGameContext]);

  useEffect(() => {
    if (!fetchingGame && !!error) {
      clearGameContext();
      history.push(`/menu`);
    }
  }, [error, fetchingGame, clearGameContext, history]);

  // ----------------------------- Render ---------------------------------------- //
  return (
    <GameContext.Provider
      value={{
        game,
        fetchingGame,
        userGameRole,
        mcGameRole,
        allPlayerGameRoles,
        otherPlayerGameRoles,
        character,
        setGameContext,
        clearGameContext,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
