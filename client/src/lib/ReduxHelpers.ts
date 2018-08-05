
import { Action, AnyAction, Reducer, ReducersMapObject } from 'redux';
import { createAction, getType } from 'typesafe-actions';

export type ActionCreator = ReturnType<typeof createAction>;

type ActionCreatorMap<T> = { readonly [P in keyof T]: ActionCreator };

export type ReducerMap<A, S> = { readonly [T in keyof A]: Reducer<S> };

export type AppReducer<S, P> = Reducer<S, Action & { payload: P }>

export function mapReducers<S, R extends ReducersMapObject>(
  initialState: S,
  reducers: R,
  actionCreators: ActionCreatorMap<R>
): AppReducer<S, any> {
  const reducerMap = new Map(
    Object.entries(actionCreators).map(
      ([key, val]): [string, Reducer<any>] => [getType(val), reducers[key]]
    )
  );

  return (state: S = initialState, action: AnyAction) => {
    if (!('type' in action)) {
      return state;
    }
    const reducer = reducerMap.get(action.type);
    if (!reducer) {
      return state;
    }
    return reducer(state, action);
  };
}

export function noOpReducer(state: any) {
  return state;
}
