import { combineReducers } from 'redux';
import authenticationReducer, { IAuthenticationState } from './authReducer';
import ormReducer from './ormReducer/ormReducer';

export interface IState {
  orm: any;
  authentication: IAuthenticationState;
}

export const rootReducer = combineReducers({
  orm: ormReducer,
  authentication: authenticationReducer
});
