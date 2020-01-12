import { Reducer } from 'redux';

import { Packages, PackagesActionTypes } from './types';

const initialState: Packages = {
  loading: false,
  error: false,
  packages: []
};

const reducer: Reducer<Packages> = (state: Packages = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PackagesActionTypes.GET_PACKAGES:
      return { ...state, error: true, loading: true };
    case PackagesActionTypes.GET_PACKAGES_SUCCESS:
      return { loading: false, error: false, packages: payload };
    case PackagesActionTypes.GET_PACKAGES_FAIL:
      return { ...state, error: true };

    default:
      return state;
  }
};

export default reducer;
