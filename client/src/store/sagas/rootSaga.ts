import { spawn } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import membersSaga from './members/membersSaga';
import teamsSaga from './teams/teamsSaga';

export default function* rootSaga() {
  yield spawn(membersSaga);
  yield spawn(teamsSaga);
  yield spawn(authSaga);
}
