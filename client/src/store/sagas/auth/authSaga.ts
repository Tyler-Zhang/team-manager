import { fork } from "redux-saga/effects";

import authStartupSaga from './authStartupSaga';

export default function* authSaga() {
  yield fork(authStartupSaga);
}
