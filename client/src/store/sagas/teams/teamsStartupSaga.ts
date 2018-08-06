import { put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { StartupActions } from '../../reducers/startupReducer';
import { TeamActions } from '../../reducers/teamsReducer';

function* teamsStartupTask() {
  yield put(TeamActions.teamsQuery());
}

export default function* teamsStartupSaga() {
  yield takeLatest(getType(StartupActions.initialLoad), teamsStartupTask);
}
