import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, noOpReducer, ReducerMap } from '../../lib/ReduxHelpers';

/* ------------- Types and Action Creators ------------- */

const actions = {
  membersQuery: createAction('members/QUERY'),
  membersLoadStart: createAction('members/LOAD_START'),
  membersLoadError: createAction('members/LOAD_ERROR', resolve => (payload: Error) => resolve(payload)),
  membersLoadSuccess: createAction('members/LOAD_SUCCESS')
};


export const MemberActions = actions;

export interface IMembersState {
  error: Error | null;
  isFetching: boolean;
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IMembersState = {
  isFetching: false,
  error: null
};

/* ------------- Reducers ------------- */

const membersQuery = noOpReducer;

const membersLoadStart: AppReducer<IMembersState, undefined> = (state: IMembersState) => {
  return {
    ...state,
    isFetching: true,
    error: null
  }
};

const membersLoadError: AppReducer<IMembersState, Error> = (state: IMembersState, { payload }) => {
  return {
    ...state,
    isFetching: false,
    error: payload
  }
};

const membersLoadSuccess: AppReducer<IMembersState, undefined> = (state: IMembersState) => {
  return {
    ...state,
    isFetching: false,
    error: null
  }
};

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, IMembersState> = {
  membersQuery,
  membersLoadStart,
  membersLoadError,
  membersLoadSuccess
};


export const memberReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default memberReducer;
