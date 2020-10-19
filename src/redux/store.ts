import { AnyAction, createStore, Store as ReduxStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';
import { Observable } from 'rxjs';
import State from './State';

class Store {
  private reduxStore: ReduxStore<State>;
  public state$: Observable<State>;

  initStore() {
    this.reduxStore = createStore(rootReducer, devToolsEnhancer({})) as ReduxStore<State>;
    this.state$ = new Observable(observer => {
      // emit the current state as first value:
      observer.next(this.reduxStore.getState());
      // let's return the function that will be called
      // when the Observable is unsubscribed
      return this.reduxStore.subscribe(() => {
        // emit on every new state changes
        observer.next(this.reduxStore.getState());
      });
    });
  }

  dispatch<T extends AnyAction>(obj: T): T {
    if (!this.reduxStore) throw new Error('Store not initalized');

    return this.reduxStore.dispatch(obj);
  }

}

const store = new Store();
export default store;

