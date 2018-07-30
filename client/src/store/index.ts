import { createApplicationStore } from './createApplicationStore';
import { IState, rootReducer } from './reducers';

export { IState };

export const store = createApplicationStore(rootReducer);
