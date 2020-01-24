export type Location = {
  _id: string;
  title: string;
  created: string;
};

export interface Locations {
  loading: boolean;
  error: boolean;
  locations: Location[];
}

export interface AddLocation {
  title: string;
}

export interface UpdateLocation {
  id: string;
  title: string;
}

export enum LocationsActionTypes {
  GET_LOCATIONS = '@@LOCATIONS/GET_LOCATIONS',
  GET_LOCATIONS_SUCCESS = '@@LOCATIONS/GET_LOCATIONS_SUCCESS',
  GET_LOCATIONS_FAIL = '@@LOCATIONS/GET_LOCATIONS_FAIL',

  ADD_LOCATION = '@@LOCATIONS/ADD_LOCATION',
  ADD_LOCATION_SUCCESS = '@@LOCATIONS/ADD_LOCATION_SUCCESS',
  ADD_LOCATION_FAIL = '@@LOCATIONS/ADD_LOCATION_FAIL',

  UPDATE_LOCATION = '@@LOCATIONS/UPDATE_LOCATION',
  UPDATE_LOCATION_SUCCESS = '@@LOCATIONS/UPDATE_LOCATION_SUCCESS',
  UPDATE_LOCATION_FAIL = '@@LOCATIONS/UPDATE_LOCATION_FAIL',

  DELETE_LOCATION = '@@LOCATIONS/DELETE_LOCATION',
  DELETE_LOCATION_SUCCESS = '@@LOCATIONS/DELETE_LOCATION_SUCCESS',
  DELETE_LOCATION_FAIL = '@@LOCATIONS/DELETE_LOCATION_FAIL'
}
