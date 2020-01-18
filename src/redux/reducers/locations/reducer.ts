import { Reducer } from 'redux';

import { Locations, LocationsActionTypes,Location } from './types';

const initialState: Locations = {
  loading: false,
  error: false,
  locations: []
};

const reducer: Reducer<Locations> = (
  state: Locations = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case LocationsActionTypes.GET_LOCATIONS:
      return { ...state, error: true, loading: true };
    case LocationsActionTypes.GET_LOCATIONS_SUCCESS:
      return { loading: false, error: false, locations: payload };
    case LocationsActionTypes.GET_LOCATIONS_FAIL:
      return { ...state, error: true };

    default:
      return state;
  }
};

export default reducer;
