import { fork } from "redux-saga/effects";

import teamsDeleteSaga from './teamsDeleteSaga';
import teamsQuerySaga from './teamsQuerySaga';
import teamsStartupSaga from './teamsStartupSaga';

export default function* membersSaga() {
  yield fork(teamsQuerySaga);
  yield fork(teamsStartupSaga);
  yield fork(teamsDeleteSaga);
}
