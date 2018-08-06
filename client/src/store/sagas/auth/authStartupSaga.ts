import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { AuthenticationService } from '../../../services';
import { AuthActions } from '../../reducers/authReducer';
import { StartupActions } from '../../reducers/startupReducer';

function* authStartupTask() {
  /**
   * We attempt to "reauthenticate". If there is a cookie saved on
   * the current browser, the server will respond with the necessary
   * authentication details. Otherwise, we will need to login again
   */
  try {
    const response = yield call(AuthenticationService.reauthenticate);
    yield put(AuthActions.authSuccess(response.data));
  } catch (e) {
    /**
     * Couldn't reauthenticate which means we shouldn't be on
     * the dashboard
     */
    yield put(push('/login'));
  }
}

export default function* authStartupSaga() {
  yield takeLatest(getType(StartupActions.dashboardLoad), authStartupTask);
}
