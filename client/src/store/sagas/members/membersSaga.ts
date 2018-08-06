import { fork } from "redux-saga/effects";

import membersCreateSaga from './membersCreateSaga';
import membersQuerySaga from './membersQuerySaga';

export default function* membersSaga() {
  yield fork(membersQuerySaga);
  yield fork(membersCreateSaga);
}
