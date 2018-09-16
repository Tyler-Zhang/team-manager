import { createAction } from 'typesafe-actions';
import { mapReducers, noOpReducer, ReducerMap } from '../../lib/ReduxHelpers';
import { IPosition, ProtoModel } from '../../models';

/* ------------- Types and Action Creators ------------- */
export interface IPositionPayloadCreate {
  position: ProtoModel<IPosition>
}

export interface IPositionPayload {
  id: number;
}

export type IPositionPatchPayload = IPositionPayload & Partial<IPosition>;

const actions = {
  positionsDelete: createAction('positions/DELETE', resolve => (payload: IPositionPayload) => resolve(payload)),
  positionsDeleteSuccess: createAction('positions/DELETE_SUCCES', resolve => (payload: IPositionPayload) => resolve(payload)),
  positionsDeleteError: createAction('positions/DELETE_ERROR', resolve => (payload: IPositionPayload) => resolve(payload)),
};


export const PositionActions = actions;

export interface IPositionsState {
  _keep?: null
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IPositionsState = {};

/* ------------- Reducers ------------- */
const positionsDelete = noOpReducer;

const positionsDeleteSuccess = noOpReducer;

const positionsDeleteError = noOpReducer;
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, IPositionsState> = {
  positionsDelete,
  positionsDeleteSuccess,
  positionsDeleteError,
};


export const positionReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default positionReducer;
