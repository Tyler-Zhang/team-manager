import { fork } from "redux-saga/effects";

import teamsCreateSaga from './teamsCreateSaga';

export default function* membersSaga() {
  yield fork(teamsCreateSaga);
}
