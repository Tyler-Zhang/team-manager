import { spawn } from 'redux-saga/effects';
import membersSaga from './members/membersSaga';
import teamsSaga from './teams/teamsSaga';

export default function* rootSaga() {
  yield spawn(membersSaga);
  yield spawn(teamsSaga);
}
