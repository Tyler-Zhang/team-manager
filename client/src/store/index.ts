import { Store } from 'redux';
import { createApplicationStore } from './createApplicationStore';
import { IState, rootReducer } from './reducers';

export { IState };

export const created = createApplicationStore(rootReducer);

export const store: Store<IState> = created.store;
export const history = created.history;

