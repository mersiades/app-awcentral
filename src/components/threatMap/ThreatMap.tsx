import React, { useEffect, useReducer } from 'react';
import { Box, BoxProps } from 'grommet';
import styled, { css } from 'styled-components';

import { useWindowSize } from '../../hooks/useWindowSize';
import ThreatMapLabels from './ThreatMapLabels';
import ThreatMapDropSegments from './ThreatMapDropSegments';
import { useGame } from '../../contexts/gameContext';
import { useParams } from 'react-router-dom';
import { useKeycloakUser } from '../../contexts/keycloakUserContext';
import { FC } from 'react';
import { ThreatMapItemType, ThreatMapLocation } from '../../@types/enums';
import { Character } from '../../@types/dataInterfaces';
import { union } from 'lodash';
import { useCallback } from 'react';

export interface WindowWidths {
  readonly windowHeight: number;
  readonly windowWidth: number;
}

interface ThreatMapItem {
  label: string;
  position: ThreatMapLocation;
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

const CenterCircle = styled(
  Box as React.FC<WindowWidths & BoxProps & JSX.IntrinsicElements['div']>
)(({ windowWidth, windowHeight }) => {
  const isLandscape = windowWidth > windowHeight;
  const width = isLandscape ? windowHeight * 0.34 : windowWidth * 0.34;
  const height = isLandscape ? windowHeight * 0.34 : windowWidth * 0.34;
  const left = isLandscape
    ? windowHeight * 0.5 - width / 2
    : windowWidth * 0.5 - width / 2;
  const top = isLandscape
    ? windowHeight * 0.5 - width / 2
    : windowWidth * 0.5 - width / 2;
  return css`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    z-index: 2;
    width: ${width}px;
    height: ${height}px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3), 0 0 10px 1px rgba(0, 0, 0, 0.2),
      0 0 5px 1px rgba(0, 0, 0, 0.3) inset,
      0 0 10px 1px rgba(0, 0, 0, 0.2) inset;
    &:hover {
      background-color: rgba(76, 104, 76, 0.33);
    }
  `;
});

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

const ThreatMap: FC = () => {
  // ----------------------------- Component state ------------------------------ //
  const [state, dispatch] = useReducer(threatMapReducer, initialState);
  console.log(`state`, state);
  // ----------------------------- Hooks ---------------------------------------- //
  const [width, height] = useWindowSize();
  const { allPlayerGameRoles, setGameContext } = useGame();
  const { id: userId } = useKeycloakUser();

  // ----------------------------- 3rd party hooks ------------------------------- //

  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Component functions ------------------------- //
  const convertCharacterToThreatMapItem = (
    characters: Character[]
  ): ThreatMapItem[] => {
    return characters.map((ch) => ({
      label: !!ch.name ? ch.name : 'unnamed character',
      position: ch.mapPosition,
    }));
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
      const characters = allPlayerGameRoles
        .map((gameRole) => gameRole.characters)
        .flat();

      dispatch({
        type: 'SET_CHARACTERS',
        payload: filterIntoSegments(characters, ThreatMapItemType.character),
      });
    }
  }, [allPlayerGameRoles, filterIntoSegments]);

  // ----------------------------- Render ---------------------------------------- //
  return (
    <>
      <CenterCircle
        windowHeight={height}
        windowWidth={width}
        align="center"
        justify="center"
      />

      <ThreatMapDropSegments />
      <ThreatMapLabels />
    </>
  );
};

export default ThreatMap;
