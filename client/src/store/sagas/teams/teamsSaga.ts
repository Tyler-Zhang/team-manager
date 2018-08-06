import { fork } from "redux-saga/effects";

import teamsCreateSaga from './teamsCreateSaga';
import teamsQuerySaga from './teamsQuerySaga';

export default function* membersSaga() {
  yield fork(teamsCreateSaga);
  yield fork(teamsQuerySaga);
}
