import { AppState } from 'redux/store.type';

export const getLocationsFromState = (state: AppState) => state.locations;
