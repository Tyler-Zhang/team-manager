import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, noOpReducer, ReducerMap } from '../../lib/ReduxHelpers';
import { ITeam, ProtoModel } from '../../models';

/* ------------- Types and Action Creators ------------- */
export interface ITeamPayloadCreate {
  team: ProtoModel<ITeam>
}

export interface ITeamPayload {
  id: number;
}

export type ITeamPatchPayload = ITeamPayload & Partial<ITeam>;

const actions = {
  teamsQuery: createAction('teams/QUERY'),
  teamsLoadStart: createAction('teams/LOAD_START'),
  teamsLoadError: createAction('teams/LOAD_ERROR', resolve => (payload: Error) => resolve(payload)),
  teamsLoadSuccess: createAction('teams/LOAD_SUCCESS'),
  teamsDelete: createAction('teams/DELETE', resolve => (payload: ITeamPayload) => resolve(payload)),
  teamsDeleteSuccess: createAction('teams/DELETE_SUCCES', resolve => (payload: ITeamPayload) => resolve(payload)),
  teamsDeleteError: createAction('teams/DELETE_ERROR', resolve => (payload: ITeamPayload) => resolve(payload)),
  teamsPurge: createAction('teams/PURGE', resolve => (payload: ITeamPayload) => resolve(payload)),
  teamsPatch: createAction('teams/PATCH', resolve => (payload: ITeamPatchPayload) => resolve(payload))
};


export const TeamActions = actions;

export interface ITeamsState {
  fetchError: Error | null;
  isFetching: boolean;
  isCreating: boolean;
  createError: Error | null;
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ITeamsState = {
  isFetching: false,
  fetchError: null,
  isCreating: false,
  createError: null
};

/* ------------- Reducers ------------- */

const teamsQuery = noOpReducer;

const teamsLoadStart: AppReducer<ITeamsState, undefined> = (state: ITeamsState) => {
  return {
    ...state,
    isFetching: true,
    fetchError: null
  }
};

const teamsLoadError: AppReducer<ITeamsState, Error> = (state: ITeamsState, { payload }) => {
  return {
    ...state,
    isFetching: false,
    fetchError: payload
  }
};

const teamsLoadSuccess: AppReducer<ITeamsState, undefined> = (state: ITeamsState) => {
  return {
    ...state,
    isFetching: false,
    fetchError: null
  }
};

const teamsDelete = noOpReducer;

const teamsDeleteSuccess = noOpReducer;

const teamsDeleteError = noOpReducer;

const teamsPurge = noOpReducer;

const teamsPatch = noOpReducer;

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, ITeamsState> = {
  teamsQuery,
  teamsLoadStart,
  teamsLoadError,
  teamsLoadSuccess,
  teamsDelete,
  teamsDeleteSuccess,
  teamsDeleteError,
  teamsPurge,
  teamsPatch
};


export const teamReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default teamReducer;
