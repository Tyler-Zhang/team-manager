import { fork } from "redux-saga/effects";

import positionsDeleteSaga from './positionsDeleteSaga';

export default function* membersSaga() {
  yield fork(positionsDeleteSaga);
}
