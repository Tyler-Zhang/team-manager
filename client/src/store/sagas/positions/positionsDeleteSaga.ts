import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { PositionService } from '../../../services';
import alert from '../../../utils/alert';
import { PositionActions } from '../../reducers/positionsReducer';

function* positionsDeleteTask(action: ReturnType<typeof PositionActions['positionsDelete']>) {
  try {
    yield call(PositionService.remove, action.payload.id);

    yield put(PositionActions.positionsDeleteSuccess(action.payload));
  } catch (e) {
    yield put(PositionActions.positionsDeleteError(action.payload));
    alert.error(e);
  }
}

export default function* positionsDeleteSaga() {
  yield takeEvery(getType(PositionActions.positionsDelete), positionsDeleteTask);
}
