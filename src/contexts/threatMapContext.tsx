import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useMutation } from '@apollo/client';
import { difference } from 'lodash';

import { useGame } from './gameContext';
import { ThreatMapItemType, ThreatMapLocation } from '../@types/enums';
import CHANGE_CHARACTER_POSITION, {
  ChangeCharacterPositionData,
  changeCharacterPositionOR,
  ChangeCharacterPositionVars,
} from '../mutations/changeCharacterPosition';
import { Game, GameRole } from '../@types/dataInterfaces';

export interface ThreatMapItem {
  type: ThreatMapItemType;
  id: string;
  game: Game;
  label: string;
  position: ThreatMapLocation;
}

export interface ThreatMapCharacterItem extends ThreatMapItem {
  gameRoleId: string;
}

interface ThreatMapState {
  center: ThreatMapItem[];
  closerNorth: ThreatMapItem[];
  fartherNorth: ThreatMapItem[];
  closerUp: ThreatMapItem[];
  fartherUp: ThreatMapItem[];
  closerEast: ThreatMapItem[];
  fartherEast: ThreatMapItem[];
  closerOut: ThreatMapItem[];
  fartherOut: ThreatMapItem[];
  closerSouth: ThreatMapItem[];
  fartherSouth: ThreatMapItem[];
  closerDown: ThreatMapItem[];
  fartherDown: ThreatMapItem[];
  closerWest: ThreatMapItem[];
  fartherWest: ThreatMapItem[];
  closerIn: ThreatMapItem[];
  fartherIn: ThreatMapItem[];
  notAssigned: ThreatMapItem[];
}

interface ThreatMapContext extends ThreatMapState {
  changingCharacterPosition: boolean;
  handleCharacterPositionChange?: (
    game: Game,
    gameRoleId: string,
    characterId: string,
    newPosition: ThreatMapLocation
  ) => void;
}

const initialState: ThreatMapState = {
  center: [],
  closerNorth: [],
  fartherNorth: [],
  closerUp: [],
  fartherUp: [],
  closerEast: [],
  fartherEast: [],
  closerOut: [],
  fartherOut: [],
  closerSouth: [],
  fartherSouth: [],
  closerDown: [],
  fartherDown: [],
  closerWest: [],
  fartherWest: [],
  closerIn: [],
  fartherIn: [],
  notAssigned: [],
};

const initialContext: ThreatMapContext = {
  ...initialState,
  changingCharacterPosition: false,
};

interface ThreatMapProviderProps {
  children: JSX.Element;
}

interface Action {
  type: 'SET_CHARACTERS';
  payload?: any;
}

const threatMapContext = createContext<ThreatMapContext>(initialContext);

export const useThreatMap = () => useContext(threatMapContext);

export const ThreatMapConsumer = threatMapContext.Consumer;

const updateState = (oldState: ThreatMapState, newState: ThreatMapState) => {
  const addOrRemoveItem = (
    oldItems: ThreatMapItem[],
    newItems: ThreatMapItem[]
  ) => {
    // Which items in old are not included in new?
    const differenceOldNew = difference(oldItems, newItems);

    // Which items in new are not included in old?
    const differenceNewOld = difference(newItems, oldItems);

    if (differenceNewOld < differenceOldNew) {
      return differenceNewOld;
    }

    return newItems;
  };

  return {
    center: addOrRemoveItem(oldState.center, newState.center),
    closerNorth: addOrRemoveItem(oldState.closerNorth, newState.closerNorth),
    fartherNorth: addOrRemoveItem(oldState.fartherNorth, newState.fartherNorth),
    closerUp: addOrRemoveItem(oldState.closerUp, newState.closerUp),
    fartherUp: addOrRemoveItem(oldState.fartherUp, newState.fartherUp),
    closerEast: addOrRemoveItem(oldState.closerEast, newState.closerEast),
    fartherEast: addOrRemoveItem(oldState.fartherEast, newState.fartherEast),
    closerOut: addOrRemoveItem(oldState.closerOut, newState.closerOut),
    fartherOut: addOrRemoveItem(oldState.fartherOut, newState.fartherOut),
    closerSouth: addOrRemoveItem(oldState.closerSouth, newState.closerSouth),
    fartherSouth: addOrRemoveItem(oldState.fartherSouth, newState.fartherSouth),
    closerDown: addOrRemoveItem(oldState.closerDown, newState.closerDown),
    fartherDown: addOrRemoveItem(oldState.fartherDown, newState.fartherDown),
    closerWest: addOrRemoveItem(oldState.closerWest, newState.closerWest),
    fartherWest: addOrRemoveItem(oldState.fartherWest, newState.fartherWest),
    closerIn: addOrRemoveItem(oldState.closerIn, newState.closerIn),
    fartherIn: addOrRemoveItem(oldState.fartherIn, newState.fartherIn),
    notAssigned: addOrRemoveItem(oldState.notAssigned, newState.notAssigned),
  };
};

const threatMapReducer = (
  state: ThreatMapState,
  action: Action
): ThreatMapState => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      console.log(`action.payload`, action.payload);
      return updateState(state, action.payload);
    default:
      return state;
  }
};

export const ThreatMapProvider: FC<ThreatMapProviderProps> = ({ children }) => {
  // ----------------------------- Component state ------------------------------ //
  const [state, dispatch] = useReducer(threatMapReducer, initialState);

  // ----------------------------- Hooks ---------------------------------------- //
  const { game, allPlayerGameRoles } = useGame();

  // ----------------------------- GraphQL -------------------------------------- //
  const [changeCharacterPosition, { loading: changingCharacterPosition }] =
    useMutation<ChangeCharacterPositionData, ChangeCharacterPositionVars>(
      CHANGE_CHARACTER_POSITION
    );

  // ----------------------------- Component functions ------------------------- //

  const handleCharacterPositionChange = async (
    game: Game,
    gameRoleId: string,
    characterId: string,
    newPosition: ThreatMapLocation
  ) => {
    const optimisticResponse = changeCharacterPositionOR(
      game,
      characterId,
      newPosition
    );
    try {
      await changeCharacterPosition({
        variables: { gameId: game.id, gameRoleId, characterId, newPosition },
        optimisticResponse,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const convertCharacterToThreatMapItem = useCallback(
    (gameRoles: GameRole[]): ThreatMapCharacterItem[] => {
      const items: ThreatMapCharacterItem[] = [];
      if (!!game) {
        gameRoles.forEach((gameRole) => {
          gameRole.characters.forEach((ch) => {
            items.push({
              game,
              type: ThreatMapItemType.character,
              label: !!ch.name ? ch.name : 'unnamed character',
              position: ch.mapPosition,
              id: ch.id,
              gameRoleId: gameRole.id,
            });
          });
        });
      }
      return items;
    },
    [game]
  );

  const filterIntoSegments = useCallback(
    (data: any[], itemType: ThreatMapItemType): ThreatMapState => {
      let items: ThreatMapItem[] = [];
      switch (itemType) {
        case ThreatMapItemType.character:
          items = convertCharacterToThreatMapItem(data);
          break;
      }

      return {
        center: items.filter(
          (item) => item.position === ThreatMapLocation.center
        ),
        closerNorth: items.filter(
          (item) => item.position === ThreatMapLocation.closerNorth
        ),
        fartherNorth: items.filter(
          (item) => item.position === ThreatMapLocation.fartherNorth
        ),
        closerUp: items.filter(
          (item) => item.position === ThreatMapLocation.closerUp
        ),
        fartherUp: items.filter(
          (item) => item.position === ThreatMapLocation.fartherUp
        ),
        closerEast: items.filter(
          (item) => item.position === ThreatMapLocation.closerEast
        ),
        fartherEast: items.filter(
          (item) => item.position === ThreatMapLocation.fartherEast
        ),
        closerOut: items.filter(
          (item) => item.position === ThreatMapLocation.closerOut
        ),
        fartherOut: items.filter(
          (item) => item.position === ThreatMapLocation.fartherOut
        ),
        closerSouth: items.filter(
          (item) => item.position === ThreatMapLocation.closerSouth
        ),
        fartherSouth: items.filter(
          (item) => item.position === ThreatMapLocation.fartherSouth
        ),
        closerDown: items.filter(
          (item) => item.position === ThreatMapLocation.closerDown
        ),
        fartherDown: items.filter(
          (item) => item.position === ThreatMapLocation.fartherDown
        ),
        closerWest: items.filter(
          (item) => item.position === ThreatMapLocation.closerWest
        ),
        fartherWest: items.filter(
          (item) => item.position === ThreatMapLocation.fartherWest
        ),
        closerIn: items.filter(
          (item) => item.position === ThreatMapLocation.closerIn
        ),
        fartherIn: items.filter(
          (item) => item.position === ThreatMapLocation.fartherIn
        ),
        notAssigned: items.filter(
          (item) => item.position === ThreatMapLocation.notAssigned
        ),
      };
    },
    [convertCharacterToThreatMapItem]
  );

  // ----------------------------- Effects ---------------------------------------- //

  // Assign characters to map segments
  useEffect(() => {
    if (!!allPlayerGameRoles) {
      dispatch({
        type: 'SET_CHARACTERS',
        payload: filterIntoSegments(
          allPlayerGameRoles,
          ThreatMapItemType.character
        ),
      });
    }
  }, [allPlayerGameRoles, filterIntoSegments]);

  // ----------------------------- Render ---------------------------------------- //
  return (
    <threatMapContext.Provider
      value={{
        ...state,
        handleCharacterPositionChange,
        changingCharacterPosition,
      }}
    >
      {children}
    </threatMapContext.Provider>
  );
};
