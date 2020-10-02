import { createStore, Reducer } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer as Reducer);

export default store;
