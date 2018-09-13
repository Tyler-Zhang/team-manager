import { normalize } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { teamSchema } from '../../../models';
import { TeamService } from '../../../services';
import alert from '../../../utils/alert';
import { OrmActions } from '../../reducers/ormReducer/ormReducer';
import { TeamActions } from '../../reducers/teamsReducer';

function* teamsPatchTask(action: ReturnType<typeof TeamActions['teamsPatch']>) {
  try {
    const teamsPatchResponse = yield call(TeamService.patch, action.payload);
    const { entities } = normalize(teamsPatchResponse.data, teamSchema);

    yield put(TeamActions.teamsPurge({ id: action.payload.id }));
    yield put(OrmActions.loadEntities({ entities }));
  } catch (e) {
    alert.error(e);
  }
}

export default function* teamsPatchSaga() {
  yield takeEvery(getType(TeamActions.teamsPatch), teamsPatchTask);
}
