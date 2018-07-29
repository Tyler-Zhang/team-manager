import { createApplicationStore } from './createApplicationStore';
import { IStore, rootReducer } from './reducers';

export { IStore };

export const store = createApplicationStore(rootReducer);
