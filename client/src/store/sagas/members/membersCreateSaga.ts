import { normalize } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { memberSchema } from '../../../models';
import { MemberService } from '../../../services';
import { MemberActions } from '../../reducers/membersReducer';
import { OrmActions } from '../../reducers/ormReducer/ormReducer';

function* membersCreateTask(action: ReturnType<typeof MemberActions['membersCreate']>) {
  try {
    yield put(MemberActions.membersCreateStart());
    const membersCreateResponse = yield call(MemberService.create, action.payload.member);

    const { entities } = normalize(membersCreateResponse.data, memberSchema);

    yield put(OrmActions.loadEntities({ entities }));

    yield put(MemberActions.membersCreateSuccess());
  } catch (e) {
    yield put(MemberActions.membersCreateError(e));
  }
}

export default function* membersCreateSaga() {
  yield takeEvery(getType(MemberActions.membersCreate), membersCreateTask);
}
