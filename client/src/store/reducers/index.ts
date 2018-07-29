import { combineReducers } from 'redux';
import ormReducer from './ormReducer';

export interface IStore {
  orm: any;
}

export const rootReducer = combineReducers({
  orm: ormReducer
})
