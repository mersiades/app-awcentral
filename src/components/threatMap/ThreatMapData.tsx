import React, { FC, useCallback, useEffect, useReducer } from 'react';
import { union } from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';
import { Character, GameRole } from '../../@types/dataInterfaces';
import { ThreatMapItemType, ThreatMapLocation } from '../../@types/enums';
import { useGame } from '../../contexts/gameContext';
import { useKeycloakUser } from '../../contexts/keycloakUserContext';
import ThreatMapPage from '../../pages/ThreatMapPage';
import { useMutation } from '@apollo/client';
import CHANGE_CHARACTER_POSITION, {
  ChangeCharacterPositionData,
  changeCharacterPositionOR,
  ChangeCharacterPositionVars,
} from '../../mutations/changeCharacterPosition';

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

interface Action {
  type: 'SET_CHARACTERS';
  payload?: any;
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

const ThreatMapData: FC = () => {
  // ----------------------------- Component state ------------------------------ //
  const [state, dispatch] = useReducer(threatMapReducer, initialState);
  console.log(`state`, state);

  // ----------------------------- 3rd party hooks ------------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ---------------------------------------- //
  const { game, allPlayerGameRoles, setGameContext } = useGame();
  const { id: userId } = useKeycloakUser();
  console.log(`game`, game);

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
        console.log(
          'changeCharacterPosition',
          gameId,
          gameRoleId,
          characterId,
          newPosition
        );
        await changeCharacterPosition({
          variables: { gameId, gameRoleId, characterId, newPosition },
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
  // Sets the GameContext
  useEffect(() => {
    if (!!gameId && !!userId && !!setGameContext) {
      setGameContext(gameId, userId);
    }
  }, [gameId, userId, setGameContext]);

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
    <DndProvider backend={HTML5Backend}>
      <ThreatMapPage
        {...state}
        handleCharacterPositionChange={handleCharacterPositionChange}
      />
    </DndProvider>
  );
};

export default ThreatMapData;
