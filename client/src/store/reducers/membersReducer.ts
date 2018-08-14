import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, noOpReducer, ReducerMap } from '../../lib/ReduxHelpers';
import { IMember } from '../../models';

/* ------------- Types and Action Creators ------------- */
export interface IMemberPayloadCreateSuccess {
  member: IMember
}

export interface IMemberPayloadDelete {
  id: number;
}

const actions = {
  membersQuery: createAction('members/QUERY'),
  membersLoadStart: createAction('members/LOAD_START'),
  membersLoadError: createAction('members/LOAD_ERROR', resolve => (payload: Error) => resolve(payload)),
  membersLoadSuccess: createAction('members/LOAD_SUCCESS'),
  membersDelete: createAction('members/DELETE', resolve => (payload: IMemberPayloadDelete) => resolve(payload)),
  membersDeleteSuccess: createAction('members/DELETE_SUCCESS',
    resolve => (payload: IMemberPayloadDelete) => resolve(payload)),
  membersDeleteError: createAction('members/DELETE_ERROR',
    resolve => (payload: IMemberPayloadDelete) => resolve(payload))

};


export const MemberActions = actions;

export interface IMembersState {
  fetchError: Error | null;
  isFetching: boolean;
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IMembersState = {
  isFetching: false,
  fetchError: null,
};

/* ------------- Reducers ------------- */

const membersQuery = noOpReducer;

const membersLoadStart: AppReducer<IMembersState, undefined> = (state: IMembersState) => {
  return {
    ...state,
    isFetching: true,
    fetchError: null
  }
};

const membersLoadError: AppReducer<IMembersState, Error> = (state: IMembersState, { payload }) => {
  return {
    ...state,
    isFetching: false,
    fetchError: payload
  }
};

const membersLoadSuccess: AppReducer<IMembersState, undefined> = (state: IMembersState) => {
  return {
    ...state,
    isFetching: false,
    fetchError: null
  }
};

const membersDelete = noOpReducer;
const membersDeleteError = noOpReducer;
const membersDeleteSuccess = noOpReducer;
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, IMembersState> = {
  membersQuery,
  membersLoadStart,
  membersLoadError,
  membersLoadSuccess,
  membersDelete,
  membersDeleteError,
  membersDeleteSuccess
};


export const memberReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default memberReducer;
