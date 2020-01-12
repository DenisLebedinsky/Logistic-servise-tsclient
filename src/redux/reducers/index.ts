import { combineReducers } from 'redux';

import auth from './auth/reducer';
import packages from './packages/reducer';

export default combineReducers({
  auth,
  packages
});
