import { combineReducers } from 'redux';

import auth from './auth/reducer';
import packages from './packages/reducer';
import qrCode from './qrCode/reducer';
import users from './users/reducer';
import locations from './locations/reducer';

export default combineReducers({
  auth,
  packages,
  qrCode,
  users,
  locations
});
