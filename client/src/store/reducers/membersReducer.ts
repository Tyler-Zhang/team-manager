import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, noOpReducer, ReducerMap } from '../../lib/ReduxHelpers';
import { IMember, ProtoModel } from '../../models';

/* ------------- Types and Action Creators ------------- */
export interface IMemberPayloadCreate {
  member: ProtoModel<IMember>
}

export interface IMemberPayloadDelete {
  id: number;
}

const actions = {
  membersQuery: createAction('members/QUERY'),
  membersLoadStart: createAction('members/LOAD_START'),
  membersLoadError: createAction('members/LOAD_ERROR', resolve => (payload: Error) => resolve(payload)),
  membersLoadSuccess: createAction('members/LOAD_SUCCESS'),
  membersCreate: createAction('members/CREATE', resolve => (payload: IMemberPayloadCreate) => resolve(payload)),
  membersCreateStart: createAction('members/CREATE_START'),
  membersCreateError: createAction('members/CREATE_ERROR', resolve => (payload: Error) => resolve(payload)),
  membersCreateSuccess: createAction('members/CREATE_SUCCESS'),
  membersDelete: createAction('members/DELETE', resolve => (payload: IMemberPayloadDelete) => resolve(payload))
};


export const MemberActions = actions;

export interface IMembersState {
  fetchError: Error | null;
  isFetching: boolean;
  isCreating: boolean;
  createError: Error | null;
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IMembersState = {
  isFetching: false,
  fetchError: null,
  isCreating: false,
  createError: null
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

const membersCreate = noOpReducer;

const membersCreateStart: AppReducer<IMembersState, undefined> = (state: IMembersState) => {
  return {
    ...state,
    isCreating: true,
    createError: null
  }
};

const membersCreateError: AppReducer<IMembersState, Error> = (state: IMembersState, { payload }) => {
  return {
    ...state,
    isCreating: false,
    createError: payload
  }
};

const membersCreateSuccess: AppReducer<IMembersState, undefined> = (state: IMembersState) => {
  return {
    ...state,
    isCreating: false,
    createError: null
  }
};

const membersDelete = noOpReducer;
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, IMembersState> = {
  membersQuery,
  membersLoadStart,
  membersLoadError,
  membersLoadSuccess,
  membersCreate,
  membersCreateStart,
  membersCreateError,
  membersCreateSuccess,
  membersDelete
};


export const memberReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default memberReducer;
