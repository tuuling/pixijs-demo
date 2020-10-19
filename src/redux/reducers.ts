import { AnyAction, combineReducers } from 'redux';
import State from './State';
import { DIRECTION_S } from '../models/Player';

import * as Actions from './actions';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function assumeType<T extends(...args: any) => any>(x: unknown): asserts x is ReturnType<T> {}

const mouseCords = (state = { x: 1, y: 1 }, action: AnyAction) => {
  switch (action.type) {
    case Actions.CHANGE_CORDS:
      assumeType<typeof Actions.changeCords>(action);
      return action.mouseCords;
    default:
      return state;
  }
};

const defaultPlayerState = { location: null, destination: null, direction: DIRECTION_S };
const player = (state: State['player'] = defaultPlayerState, action: AnyAction) => {
  switch (action.type) {
    case Actions.SET_PLAYER_DEST:
      assumeType<typeof Actions.setPlayerDest>(action);
      return {
        ...state,
        destination: action.cords
      };
    case Actions.SET_PLAYER_LOC:
      assumeType<typeof Actions.setPlayerLoc>(action);
      return {
        ...state,
        location: action.cords
      };
    case Actions.SET_PLAYER_DIRECTION:
      assumeType<typeof Actions.setPlayerDirection>(action);
      return {
        ...state,
        direction: action.direction
      };
    default:
      return state;
  }
};

const combinedReducers = combineReducers({
  mouseCords,
  player
});

export default combinedReducers;
