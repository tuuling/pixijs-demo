import { AnyAction, combineReducers } from 'redux';

const mouseCords = (state = { x: 1, y: 1 }, action: AnyAction & { mouseCords: string }) => {
  switch (action.type) {
    case 'CHANGE_CORDS':
      return action.mouseCords;
    default:
      return state;
  }
};

const combinedReducers = combineReducers({
  mouseCords
});

export default combinedReducers;
