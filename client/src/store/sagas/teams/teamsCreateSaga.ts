import { normalize } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { teamSchema } from '../../../models';
import { TeamService } from '../../../services';
import { OrmActions } from '../../reducers/ormReducer/ormReducer';
import { TeamActions } from '../../reducers/teamsReducer';

function* teamsCreateTask(action: ReturnType<typeof TeamActions['teamsCreate']>) {
  try {
    yield put(TeamActions.teamsCreateStart());
    const teamsCreateResponse = yield call(TeamService.create, action.payload.team);

    const { entities } = normalize(teamsCreateResponse.data, teamSchema);

    yield put(OrmActions.loadEntities({ entities }));

    yield put(TeamActions.teamsCreateSuccess());
  } catch (e) {
    yield put(TeamActions.teamsCreateError(e));
  }
}

export default function* teamsCreateSaga() {
  yield takeEvery(getType(TeamActions.teamsCreate), teamsCreateTask);
}
