/**
 * @name Auth state
 * @description Sets out the actions, reducder and saga of authenticating a user
 */

import {call, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects';

import rsf from './Redux/Redux-Saga-Firebase';

/**
 * Actions
 */
export const SYNC_USER = 'SYNC_USER';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REQUEST_CODE = 'REQUEST_CODE';
export const SUBMIT_CODE = 'SUBMIT_CODE';

/**
 * Reducer
 */
const initialState = {
  loading: false,
  errorCode: null,
  isLoggedIn: false,
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SYNC_USER: {
      return actionCreators.syncUser(state, action);
    }
    case LOGIN: {
      return actionCreators.loginIn(state);
    }
    case LOGIN_SUCCESS: {
      return actionCreators.loginInSuccess(state);
    }
    case LOGIN_FAIL: {
      return actionCreators.loginInFail(state, action);
    }
    default:
      return actionCreators.default(state);
  }
};

/**
 * ActionCreators
 */
export const actionCreators = {
  default: (state) => {
    return state;
  },
  syncUser: (state, action) => {
    return {
      ...state,
      loading: false,
      isLoggedIn: !!action.user,
    };
  },
  loginIn: (state) => {
    return {
      ...state,
      isLoggedIn: false,
      loading: true,
    };
  },
  loginInSuccess: (state) => {
    return {
      ...state,
      loading: false,
      isLoggedIn: true,
    };
  },
  loginInFail: (state, action) => {
    return {
      ...state,
      loading: false,
      isLoggedIn: false,
      errorCode: action.errorCode,
    };
  },
};

/**
 * Dispatch
 */
export const syncUser = (user) => ({
  type: SYNC_USER,
  user,
});

export const loginIn = (phoneNumber) => ({
  type: LOGIN,
  phoneNumber,
});

export const submitCode = (verificationCode) => ({
  type: SUBMIT_CODE,
  verificationCode,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (errorCode) => ({
  type: LOGIN_FAIL,
  errorCode,
});

/**
 * Sagas
 */
export function* syncUserSaga() {
  const channel = yield call(rsf.auth.channel);

  while (true) {
    const {user} = yield take(channel);

    if (user) yield put(syncUser(user));
    else yield put(syncUser(null));
  }
}

export function* loginSaga(action) {
  try {
    const confirmationResult = yield call(rsf.auth.signInWithPhoneNumber, action.phoneNumber, null);

    yield put({type: SUBMIT_CODE});

    const {verificationCode} = yield take(SUBMIT_CODE);

    yield call([confirmationResult, confirmationResult.confirm], verificationCode);

    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFailure(error.code));
  }
}

export function* authSaga() {
  yield fork(syncUserSaga);
  yield takeEvery(LOGIN, loginSaga);
}
