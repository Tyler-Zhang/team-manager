import { combineReducers } from 'redux';
import authenticationReducer, { IAuthenticationState } from './authReducer';
import membersReducer, { IMembersState } from './membersReducer';
import ormReducer from './ormReducer/ormReducer';
import positionsReducer, { IPositionsState } from './positionsReducer';
import startupReducer, { IStartupState } from './startupReducer';
import teamsReducer, { ITeamsState } from './teamsReducer';

export interface IStore {
  orm: any;
  authentication: IAuthenticationState;
  members: IMembersState;
  teams: ITeamsState;
  startup: IStartupState;
  positions: IPositionsState;
}

export const rootReducer = combineReducers({
  orm: ormReducer,
  authentication: authenticationReducer,
  members: membersReducer,
  teams: teamsReducer,
  startup: startupReducer,
  positions: positionsReducer
});
