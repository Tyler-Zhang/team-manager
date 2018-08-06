import { fork } from "redux-saga/effects";

import teamsCreateSaga from './teamsCreateSaga';
import teamsQuerySaga from './teamsQuerySaga';
import teamsStartupSaga from './teamsStartupSaga';

export default function* membersSaga() {
  yield fork(teamsCreateSaga);
  yield fork(teamsQuerySaga);
  yield fork(teamsStartupSaga);
}
