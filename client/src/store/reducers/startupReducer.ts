import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, ReducerMap } from '../../lib/ReduxHelpers';

/* ------------- Types and Action Creators ------------- */
const actions = {
  initialLoad: createAction('startup/INITIAL_LOAD')
};


export const StartupActions = actions;

/* ------------- Initial State ------------- */
export interface IStartupState {
  initialized: boolean
}

export const INITIAL_STATE: IStartupState = {
  initialized: false
};

/* ------------- Reducers ------------- */

const initialLoad: AppReducer<IStartupState, undefined> = (state: IStartupState) => {
  return {
    ...state,
    initialized: true
  }
};

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, IStartupState> = {
  initialLoad
};


export const startupReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default startupReducer;
