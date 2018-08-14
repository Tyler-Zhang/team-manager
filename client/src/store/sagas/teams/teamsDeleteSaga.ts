import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { TeamService } from '../../../services';
import alert from '../../../utils/alert';
import { TeamActions } from '../../reducers/teamsReducer';

function* membersDeleteTask(action: ReturnType<typeof TeamActions['teamsDelete']>) {
  try {
    yield call(TeamService.remove, action.payload.id);

    yield put(TeamActions.teamsDeleteSuccess(action.payload));
  } catch (e) {
    yield put(TeamActions.teamsDeleteError(action.payload));
    alert.error(e);
  }
}

export default function* teamsDeleteSaga() {
  yield takeEvery(getType(TeamActions.teamsDelete), membersDeleteTask);
}
