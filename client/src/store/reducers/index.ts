import { combineReducers } from 'redux';
import authenticationReducer, { IAuthenticationState } from './authenticationReducer';
import ormReducer from './ormReducer';

export interface IState {
  orm: any;
  authentication: IAuthenticationState;
}

export const rootReducer = combineReducers({
  orm: ormReducer,
  authentication: authenticationReducer
});
