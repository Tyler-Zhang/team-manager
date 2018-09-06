import { normalize } from 'normalizr';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { OrganizationListSchema } from '../../../models';
import { OrganizationService } from '../../../services';
import alert from '../../../utils/alert';
import { AuthActions } from '../../reducers/authReducer';
import { OrmActions } from '../../reducers/ormReducer/ormReducer';

function* organizationAuthSuccessTask() {
  try {
    const OrganizationsQueryResponse = yield call(OrganizationService.get);

    const { entities } = normalize(OrganizationsQueryResponse.data, OrganizationListSchema);

    yield put(OrmActions.loadEntities({ entities }));

  } catch (e) {
    alert.error(e);
  }
}

export default function* organizationsAuthSaga() {
  yield takeLatest(getType(AuthActions.authSuccess), organizationAuthSuccessTask);
}
