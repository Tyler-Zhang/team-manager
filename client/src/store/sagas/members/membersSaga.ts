import { fork } from "redux-saga/effects";

import membersQuerySaga from './membersQuerySaga';

export default function* membersSaga() {
  yield fork(membersQuerySaga);
}
