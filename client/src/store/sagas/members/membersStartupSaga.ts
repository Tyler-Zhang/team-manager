import { put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { MemberActions } from '../../reducers/membersReducer';
import { StartupActions } from '../../reducers/startupReducer';

function* membersStartupTask() {
  yield put(MemberActions.membersQuery());
}

export default function* membersStartupSaga() {
  yield takeLatest(getType(StartupActions.dashboardLoad), membersStartupTask);
}
