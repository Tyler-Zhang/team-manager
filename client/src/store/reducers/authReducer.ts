import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, ReducerMap } from '../../lib/ReduxHelpers';
import { IAuthenticatedContext, IOrganization } from '../../models';

/* ------------- Types and Action Creators ------------- */

export interface IAuthPayloadLoggedIn {
  authContext: IAuthenticatedContext,
  organization: IOrganization;
}

const actions = {
  authLoggedIn: createAction('auth/LOGGED_IN', resolve => (payload: IAuthPayloadLoggedIn) => resolve(payload)),
  authLoggedOut: createAction('auth/LOGGED_OUT'),
};


export const AuthActions = actions;

export type IAuthenticationState =
  { authenticated: false } |
  {
    authenticated: true;
    authContext: IAuthenticatedContext;
    organization: IOrganization;
  };

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IAuthenticationState = {
  authenticated: false
};

/* ------------- Reducers ------------- */

const authLoggedIn: AppReducer<IAuthenticationState, IAuthPayloadLoggedIn> = (
  state: IAuthenticationState,
  { payload }) => {

  return {
    ...state,
    authenticated: true,
    ...payload
  }
};

const authLoggedOut: AppReducer<IAuthenticationState, undefined> = (
  state: IAuthenticationState
) => {
  return {
    authenticated: false
  }
}

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, IAuthenticationState> = {
  authLoggedIn,
  authLoggedOut
};


export const AuthenticationReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default AuthenticationReducer;
