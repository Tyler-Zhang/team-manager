import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { MemberService } from '../../../services';
import alert from '../../../utils/alert';
import { MemberActions } from '../../reducers/membersReducer';

function* membersDeleteTask(action: ReturnType<typeof MemberActions['membersDelete']>) {
  try {
    yield call(MemberService.remove, action.payload.id);

    yield put(MemberActions.membersDeleteSuccess(action.payload));
  } catch (e) {
    yield put(MemberActions.membersDeleteCancel(action.payload));
    alert.error(e);
  }
}

export default function* membersDeleteSaga() {
  yield takeEvery(getType(MemberActions.membersDelete), membersDeleteTask);
}
