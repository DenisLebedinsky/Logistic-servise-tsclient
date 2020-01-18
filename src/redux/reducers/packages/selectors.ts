import { AppState } from 'redux/store.type';

export const getPackagesFromState = (state: AppState) => state.packages;
