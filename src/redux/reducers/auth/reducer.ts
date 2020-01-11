import { Reducer } from 'redux';

import { Auth, AuthActionTypes } from './types';

const localUserJSON = localStorage.getItem('user') ;
const localToken = localUserJSON ? JSON.parse(localUserJSON).token: '';

const initialState: Auth = {
  loading: false,
  user: {
    username: '',
    token: localToken,
    role: '',
    locationId: '',
    id: ''
  },
  error: false
};

const reducer: Reducer<Auth> = (state: Auth = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AuthActionTypes.LOG_IN:
      return state;
    case AuthActionTypes.LOG_IN_SUCCESS:
      return { ...state, ...payload };
    case AuthActionTypes.LOG_IN_FAIL:
      return { ...state, error: true };
    case AuthActionTypes.LOG_OUT:
        const newState = {...initialState}
        newState.user.token = '';
       return state;
    default:
      return state;
  }
};

export default reducer;
