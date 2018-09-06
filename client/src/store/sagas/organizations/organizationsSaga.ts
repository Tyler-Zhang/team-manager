import { fork } from "redux-saga/effects";
import organizationsAuthSaga from './organizationsAuthSaga';


export default function* organizationsSaga() {
  yield fork(organizationsAuthSaga);
}
