import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, noOpReducer, ReducerMap } from '../../lib/ReduxHelpers';
import { ITeam, ProtoModel } from '../../models';

/* ------------- Types and Action Creators ------------- */
export interface ITeamPayloadCreate {
  team: ProtoModel<ITeam>
}

export interface ITeamPayloadDelete {
  id: number;
}

const actions = {
  teamsQuery: createAction('teams/QUERY'),
  teamsLoadStart: createAction('teams/LOAD_START'),
  teamsLoadError: createAction('teams/LOAD_ERROR', resolve => (payload: Error) => resolve(payload)),
  teamsLoadSuccess: createAction('teams/LOAD_SUCCESS'),
  teamsCreate: createAction('teams/CREATE', resolve => (payload: ITeamPayloadCreate) => resolve(payload)),
  teamsCreateStart: createAction('teams/CREATE_START'),
  teamsCreateError: createAction('teams/CREATE_ERROR', resolve => (payload: Error) => resolve(payload)),
  teamsCreateSuccess: createAction('teams/CREATE_SUCCESS'),
  teamsDelete: createAction('teams/DELETE', resolve => (payload: ITeamPayloadDelete) => resolve(payload)),
  teamsDeleteSuccess: createAction('teams/DELETE_SUCCES', resolve => (payload: ITeamPayloadDelete) => resolve(payload)),
  teamsDeleteError: createAction('teams/DELETE_ERROR', resolve => (payload: ITeamPayloadDelete) => resolve(payload))
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

const teamsCreate = noOpReducer;

const teamsCreateStart: AppReducer<ITeamsState, undefined> = (state: ITeamsState) => {
  return {
    ...state,
    isCreating: true,
    createError: null
  }
};

const teamsCreateError: AppReducer<ITeamsState, Error> = (state: ITeamsState, { payload }) => {
  return {
    ...state,
    isCreating: false,
    createError: payload
  }
};

const teamsCreateSuccess: AppReducer<ITeamsState, undefined> = (state: ITeamsState) => {
  return {
    ...state,
    isCreating: false,
    createError: null
  }
};

const teamsDelete = noOpReducer;

const teamsDeleteSuccess = noOpReducer;

const teamsDeleteError = noOpReducer;
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, ITeamsState> = {
  teamsQuery,
  teamsLoadStart,
  teamsLoadError,
  teamsLoadSuccess,
  teamsCreate,
  teamsCreateStart,
  teamsCreateError,
  teamsCreateSuccess,
  teamsDelete,
  teamsDeleteSuccess,
  teamsDeleteError
};


export const teamReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default teamReducer;
