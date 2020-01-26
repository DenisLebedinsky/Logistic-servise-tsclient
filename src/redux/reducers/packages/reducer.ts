import { Reducer } from 'redux';

import { PackageType, PackagesActionTypes } from './types';
import { allColumns } from 'constants/packages';

let visibleColumns = allColumns;
const lcoalStorageColumns = localStorage.getItem('columns');
if (lcoalStorageColumns) {
  visibleColumns = JSON.parse(lcoalStorageColumns);
}

const initialState: PackageType = {
  loading: false,
  error: false,
  packages: [],
  count: 0,
  columns: visibleColumns,
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
    case PackagesActionTypes.CHANGE_COLUMNS_VISIBLE:
      return { ...state, columns: payload.columns };
    default:
      return state;
  }
};

export default reducer;
