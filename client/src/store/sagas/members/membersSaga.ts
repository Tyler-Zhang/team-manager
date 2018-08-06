import { fork } from "redux-saga/effects";

import membersCreateSaga from './membersCreateSaga';
import membersQuerySaga from './membersQuerySaga';
import membersStartupSaga from './membersStartupSaga';

export default function* membersSaga() {
  yield fork(membersQuerySaga);
  yield fork(membersCreateSaga);
  yield fork(membersStartupSaga);
}
