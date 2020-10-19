import store from './store';

export const CHANGE_CORDS = 'CHANGE_CORDS';
export const changeCords = (x: number, y: number) =>
  store.dispatch({
    type: CHANGE_CORDS,
    mouseCords: { x, y }
  });

export const SET_PLAYER_LOC = 'SET_PLAYER_LOC';
export const setPlayerLoc = ({ x, y }: { x: number; y: number }) =>
  store.dispatch({
    type: SET_PLAYER_LOC,
    cords: { x, y }
  });

export const SET_PLAYER_DEST = 'SET_PLAYER_DEST';
export const setPlayerDest = ({ x, y }: { x: number; y: number }) =>
  store.dispatch({
    type: SET_PLAYER_DEST,
    cords: { x, y }
  });

export const SET_PLAYER_DIRECTION = 'SET_PLAYER_DIRECTION';
export const setPlayerDirection = (direction: number) =>
  store.dispatch({
    type: SET_PLAYER_DIRECTION,
    direction
  });

