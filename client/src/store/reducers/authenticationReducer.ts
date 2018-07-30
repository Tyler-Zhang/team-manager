import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, ReducerMap } from '../../lib/ReduxHelpers';
import { Authority } from '../../models/Member';

/* ------------- Types and Action Creators ------------- */

interface IAuthLoggedInPayload {
  authContext: {
    authority: Authority;
    memberId: number;
    organizationId: number;
  },
  organization: {
    name: string
  }
}

const actions = {
  authLoggedIn: createAction('auth/LOGGED_IN', resolve => (payload: IAuthLoggedInPayload) => resolve(payload)),
  authLoggedOut: createAction('auth/LOGGED_OUT'),
};


export const AuthActions = actions;

export type IAuthenticationState =
  { authenticated: false } |
  {
    authenticated: boolean;
    authContext: {
      authority: Authority,
      memberId: number,
      organizationId: number
    },
    organization: {
      name: string
    }
  };

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IAuthenticationState = {
  authenticated: false
};

/* ------------- Reducers ------------- */

const authLoggedIn: AppReducer<IAuthenticationState, IAuthLoggedInPayload> = (
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
