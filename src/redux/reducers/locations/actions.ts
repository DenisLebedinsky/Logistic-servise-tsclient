import { action } from 'typesafe-actions';

import { Location, LocationsActionTypes } from './types';

// get
export const getLocations = (token: string, skip: number, limit: number) =>
  action(LocationsActionTypes.GET_LOCATIONS, { token, skip, limit });

export const getLOCATIONSSuccess = (locations: Location[]) =>
  action(LocationsActionTypes.GET_LOCATIONS_SUCCESS, locations);

export const getLocationsFail = (error: string) =>
  action(LocationsActionTypes.GET_LOCATIONS_FAIL, error);

// add
export const addLocation = (token: string, newLocation: Location) => {
  action(LocationsActionTypes.ADD_LOCATION, { token, newLocation });
};

export const addLocationSuccess = (newLocation: Location) => {
  action(LocationsActionTypes.ADD_LOCATION_SUCCESS, newLocation);
};

export const addLocationFail = (error: string) => {
  action(LocationsActionTypes.ADD_LOCATION_FAIL, error);
};

// update
export const updateLocation = (token: string, editedLocation: Location) => {
  action(LocationsActionTypes.UPDATE_LOCATION, { token, editedLocation });
};

export const updateLocationSuccess = (updatedLocation: Location) => {
  action(LocationsActionTypes.UPDATE_LOCATION_SUCCESS, updatedLocation);
};

export const updateLocationFail = (error: string) => {
  action(LocationsActionTypes.UPDATE_LOCATION_FAIL, error);
};

// delete
export const deleteLocation = (token: string, id: string) => {
  action(LocationsActionTypes.DELETE_LOCATION, { token, id });
};

export const deleteLocationSuccess = (deletedLocation: Location) => {
  action(LocationsActionTypes.DELETE_LOCATION_SUCCESS, deletedLocation);
};

export const deleteLocationFail = (error: string) => {
  action(LocationsActionTypes.DELETE_LOCATION_FAIL, error);
};
