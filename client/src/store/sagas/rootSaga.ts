import { spawn } from 'redux-saga/effects';
import membersSaga from './members/membersSaga';

export default function* rootSaga() {
  yield spawn(membersSaga);
}
