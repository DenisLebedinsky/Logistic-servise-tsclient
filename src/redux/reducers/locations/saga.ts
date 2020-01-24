import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from 'api';

import { LocationsActionTypes } from './types';

import {
  addLocation,
  addLocationFail,
  addLocationSuccess,
  deleteLocation,
  deleteLocationFail,
  deleteLocationSuccess,
  getLocations,
  getLocationsFail,
  getLocationsSuccess,
  updateLocation,
  updateLocationFail,
  updateLocationSuccess
} from './actions';

function* getLocationsSaga(action: ReturnType<typeof getLocations>) {
  try {
    const { token, skip, limit } = action.payload;

    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/locations/', { skip, limit });

    if (result) {
      throw new Error('error with get data');
    }

    yield put(getLocationsSuccess(result.data));
  } catch (error) {
    yield put(getLocationsFail(error));
  }
}

function* addLocationSaga(action: ReturnType<typeof addLocation>) {
  try {
    const { token, newLocation } = action.payload;

    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/location/create', newLocation);

    if (result) {
      throw new Error('error with get update');
    }

    yield put(addLocationSuccess(result.data));
  } catch (error) {
    yield put(addLocationFail(error));
  }
}

function* updateLocationSaga(action: ReturnType<typeof updateLocation>) {
  try {
    const { token, editedLocation } = action.payload;
    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/package/update/', editedLocation);

    if (result) {
      throw new Error('error with get data');
    }

    yield put(updateLocationSuccess(result.data));
  } catch (error) {
    yield put(updateLocationFail(error));
  }
}

function* deleteLocationSaga(action: ReturnType<typeof deleteLocation>) {
  try {
    const { token, id } = action.payload;
    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/package/delete', { id });

    if (!result) {
      throw new Error('error with get data');
    }

    yield put(deleteLocationSuccess(result.data));
  } catch (error) {
    yield put(deleteLocationFail(error));
  }
}

// watchers
function* watchGetLocationsSaga() {
  yield takeEvery(LocationsActionTypes.GET_LOCATIONS, getLocationsSaga);
}

function* watchAddLocationSaga() {
  yield takeEvery(LocationsActionTypes.ADD_LOCATION, addLocationSaga);
}

function* watchUpdateLocationSaga() {
  yield takeEvery(LocationsActionTypes.UPDATE_LOCATION, updateLocationSaga);
}

function* watchDeleteLocationSaga() {
  yield takeEvery(LocationsActionTypes.DELETE_LOCATION, deleteLocationSaga);
}
// main
function* locationsSaga() {
  yield all([
    fork(watchGetLocationsSaga),
    fork(watchAddLocationSaga),
    fork(watchUpdateLocationSaga),
    fork(watchDeleteLocationSaga)
  ]);
}

export default locationsSaga;
