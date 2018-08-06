import { normalize } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { memberSchema } from '../../../models';
import { TeamService } from '../../../services';
import { OrmActions } from '../../reducers/ormReducer/ormReducer';
import { TeamActions } from '../../reducers/teamsReducer';

function* membersCreateTask(action: ReturnType<typeof TeamActions['teamsCreate']>) {
  try {
    yield put(TeamActions.membersCreateStart());
    const membersCreateResponse = yield call(TeamService.create, action.payload.member);

    const { entities } = normalize(membersCreateResponse.data, memberSchema);

    yield put(OrmActions.loadEntities({ entities }));

    yield put(TeamActions.membersCreateSuccess());
  } catch (e) {
    yield put(TeamActions.membersCreateError(e));
  }
}

export default function* membersCreateSaga() {
  yield takeEvery(getType(TeamActions.membersCreate), membersCreateTask);
}
