import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useMutation } from '@apollo/client';
import { union } from 'lodash';

import { useGame } from './gameContext';
import { ThreatMapItemType, ThreatMapLocation } from '../@types/enums';
import CHANGE_CHARACTER_POSITION, {
  ChangeCharacterPositionData,
  changeCharacterPositionOR,
  ChangeCharacterPositionVars,
} from '../mutations/changeCharacterPosition';
import { GameRole } from '../@types/dataInterfaces';

export interface ThreatMapItem {
  type: ThreatMapItemType;
  label: string;
  position: ThreatMapLocation;
}

export interface ThreatMapCharacterItem extends ThreatMapItem {
  characterId: string;
  gameRoleId: string;
}

interface ThreatMapState {
  center: ThreatMapItem[];
  closerNorth: ThreatMapItem[];
  fatherNorth: ThreatMapItem[];
  closerUp: ThreatMapItem[];
  fartherUp: ThreatMapItem[];
  closerEast: ThreatMapItem[];
  fartherEast: ThreatMapItem[];
  closerOut: ThreatMapItem[];
  fartherOut: ThreatMapItem[];
  closerSouth: ThreatMapItem[];
  fartherSouth: ThreatMapItem[];
  closerDown: ThreatMapItem[];
  fatherDown: ThreatMapItem[];
  closerWest: ThreatMapItem[];
  fartherWest: ThreatMapItem[];
  closerIn: ThreatMapItem[];
  fartherIn: ThreatMapItem[];
  notAssigned: ThreatMapItem[];
}

interface ThreatMapContext extends ThreatMapState {
  changingCharacterPosition: boolean;
  handleCharacterPositionChange?: (
    gameRoleId: string,
    characterId: string,
    newPosition: ThreatMapLocation
  ) => void;
}

const initialState: ThreatMapState = {
  center: [],
  closerNorth: [],
  fatherNorth: [],
  closerUp: [],
  fartherUp: [],
  closerEast: [],
  fartherEast: [],
  closerOut: [],
  fartherOut: [],
  closerSouth: [],
  fartherSouth: [],
  closerDown: [],
  fatherDown: [],
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
    // TODO: remove items from old segment
    // TODO: add items to new segment
    return union(oldItems, newItems);
    // let items: ThreatMapItem[] = []
    // newItems.forEach((newItem) => {
    //   if (oldItems.map((oldItem)  => oldItem.label).includes(newItem.label)) {
    //      items.push
    //   }
    // })
    // // The items are new
    // if ()

    // // If an item has been removed

    // // Nothing has changed

    // return items
  };

  return {
    center: addOrRemoveItem(oldState.center, newState.center),
    closerNorth: [],
    fatherNorth: [],
    closerUp: [],
    fartherUp: [],
    closerEast: [],
    fartherEast: [],
    closerOut: [],
    fartherOut: [],
    closerSouth: [],
    fartherSouth: [],
    closerDown: [],
    fatherDown: [],
    closerWest: [],
    fartherWest: [],
    closerIn: [],
    fartherIn: [],
    notAssigned: [],
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
  console.log(`state`, state);

  // ----------------------------- Hooks ---------------------------------------- //
  const { game, allPlayerGameRoles } = useGame();

  // ----------------------------- GraphQL -------------------------------------- //
  const [changeCharacterPosition, { loading: changingCharacterPosition }] =
    useMutation<ChangeCharacterPositionData, ChangeCharacterPositionVars>(
      CHANGE_CHARACTER_POSITION
    );

  // ----------------------------- Component functions ------------------------- //

  const handleCharacterPositionChange = async (
    gameRoleId: string,
    characterId: string,
    newPosition: ThreatMapLocation
  ) => {
    if (!!game) {
      try {
        await changeCharacterPosition({
          variables: { gameId: game.id, gameRoleId, characterId, newPosition },
          optimisticResponse: changeCharacterPositionOR(
            game,
            characterId,
            newPosition
          ),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const convertCharacterToThreatMapItem = (
    gameRoles: GameRole[]
  ): ThreatMapCharacterItem[] => {
    const items: ThreatMapCharacterItem[] = [];
    gameRoles.forEach((gameRole) => {
      gameRole.characters.forEach((ch) => {
        items.push({
          type: ThreatMapItemType.character,
          label: !!ch.name ? ch.name : 'unnamed character',
          position: ch.mapPosition,
          characterId: ch.id,
          gameRoleId: gameRole.id,
        });
      });
    });
    return items;
  };

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
        fatherNorth: items.filter(
          (item) => item.position === ThreatMapLocation.fatherNorth
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
        fatherDown: items.filter(
          (item) => item.position === ThreatMapLocation.fatherDown
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
    []
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
