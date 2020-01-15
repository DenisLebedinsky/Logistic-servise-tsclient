import { Reducer } from 'redux';

import { PackageType, PackagesActionTypes } from './types';

const initialState: PackageType = {
  loading: false,
  error: false,
  packages: []
};

const reducer: Reducer<PackageType> = (
  state: PackageType = initialState,
  action
) => {
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
