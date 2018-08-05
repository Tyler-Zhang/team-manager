import { normalize } from 'normalizr';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { memberListSchema } from '../../../models';
import { MemberService } from '../../../services';
import { MemberActions } from '../../reducers/membersReducer';

function* membersQueryTask() {
  try {
    yield put(MemberActions.membersLoadStart());
    const membersQueryResponse = yield call(MemberService.get);

    const entities = normalize(membersQueryResponse.data, memberListSchema);

    console.log(entities);

    yield put(MemberActions.membersLoadSuccess());
  } catch (e) {
    yield put(MemberActions.membersLoadError(e));
  }
}

export default function* membersQuerySaga() {
  yield takeLatest(getType(MemberActions.membersQuery), membersQueryTask);
}
