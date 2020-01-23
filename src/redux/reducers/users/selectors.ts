import { AppState } from 'redux/store.type';

export const getUserFromState = (state: AppState) => state.users;
