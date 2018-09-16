import { spawn } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import membersSaga from './members/membersSaga';
import organizationsSaga from './organizations/organizationsSaga';
import positionsSaga from './positions/positionsSaga';
import teamsSaga from './teams/teamsSaga';

export default function* rootSaga() {
  yield spawn(membersSaga);
  yield spawn(teamsSaga);
  yield spawn(authSaga);
  yield spawn(organizationsSaga);
  yield spawn(positionsSaga);
}
