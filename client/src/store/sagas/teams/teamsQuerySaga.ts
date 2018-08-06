import { normalize } from 'normalizr';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { teamListSchema } from '../../../models';
import { TeamService } from '../../../services';
import { OrmActions } from '../../reducers/ormReducer/ormReducer';
import { TeamActions } from '../../reducers/teamsReducer';

function* teamsQueryTask() {
  try {
    yield put(TeamActions.teamsLoadStart());
    const teamsQueryResponse = yield call(TeamService.get);

    const { entities } = normalize(teamsQueryResponse.data, teamListSchema);

    yield put(OrmActions.loadEntities({ entities }));

    yield put(TeamActions.teamsLoadSuccess());
  } catch (e) {
    console.log(e);
    yield put(TeamActions.teamsLoadError(e));
  }
}

export default function* teamsQuerySaga() {
  yield takeLatest(getType(TeamActions.teamsQuery), teamsQueryTask);
}
