import { combineReducers } from 'redux';
import authenticationReducer, { IAuthenticationState } from './authReducer';
import membersReducer, { IMembersState } from './membersReducer';
import ormReducer from './ormReducer/ormReducer';
import teamsReducer, { ITeamsState } from './teamsReducer';

export interface IState {
  orm: any;
  authentication: IAuthenticationState;
  members: IMembersState;
  teams: ITeamsState;
}

export const rootReducer = combineReducers({
  orm: ormReducer,
  authentication: authenticationReducer,
  members: membersReducer,
  teams: teamsReducer
});
