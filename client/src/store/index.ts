import { Store } from 'redux';
import { createApplicationStore } from './createApplicationStore';
import { IStore, rootReducer } from './reducers';

export { IStore };

export const created = createApplicationStore(rootReducer);

export const store: Store<IStore> = created.store;
export const history = created.history;

