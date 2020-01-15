import { Reducer } from 'redux';

import { UserType, UsersActionTypes } from './types';

const initialState: UserType = {
  loading: false,
  error: false,
  users: []
};

const reducer: Reducer<UserType> = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UsersActionTypes.GET_USERS:
      return state;
    case UsersActionTypes.GET_USERS_SUCCESS:
      return { ...state, ...payload };
    case UsersActionTypes.GET_USERS_FAIL:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducer;
