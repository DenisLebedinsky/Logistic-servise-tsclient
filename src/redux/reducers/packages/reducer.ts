import { Reducer } from 'redux';

import { PackageType, PackagesActionTypes } from './types';

const initialState: PackageType = {
  loading: false,
  error: false,
  packages: [],
  count: 0,
  addedPackage: null,
  updatedPackage: null
};

const reducer: Reducer<PackageType> = (
  state: PackageType = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case PackagesActionTypes.GET_PACKAGES:
      return { ...state, error: false, loading: false }; ///test
    case PackagesActionTypes.GET_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        packages: payload.data,
        count: payload.count
      };
    case PackagesActionTypes.GET_PACKAGES_FAIL:
      return { ...state, error: true, loading: false };
    case PackagesActionTypes.ADD_PACKAGE_SUCCESS:
      return { ...state, addedPackage: payload };

    default:
      return state;
  }
};

export default reducer;
