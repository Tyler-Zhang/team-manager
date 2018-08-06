import { Store } from 'redux';
import { createApplicationStore } from './createApplicationStore';
import { IState, rootReducer } from './reducers';

export { IState };

export const store: Store<IState> = createApplicationStore(rootReducer);
