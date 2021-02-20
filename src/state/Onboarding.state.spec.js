import * as OnboardingState from './Onboarding.state';
import * as AsyncStorage from '../services/AsyncStorage';
import {call, put, take} from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';

const {
  onboarding,
  actionCreators,
  SET_ONBOARDING_STATUS,
  SET_ONBOARDING_ERROR,
  RESET_ONBOARDING_STATUS,
  SKIP_ONBOARDING,
  ONBOARDING_STATUS,
  updateOnboardingStatus,
  handleOnboardingError,
  resetOnboardingStatus,
  skipOnboarding,
  onboardingSaga,
  getOnboarding,
} = OnboardingState;

describe('<onboarding> -reducer', () => {
  const mockState = {test: 'TEST'};
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('should call updateOnboardingStatus when it receives action.type SET_ONBOARDING_STATUS', () => {
    const mockUpdateOnboardingStatus = jest.fn();
    jest.spyOn(actionCreators, 'updateOnboardingStatus').mockImplementationOnce(mockUpdateOnboardingStatus);
    const mockAction = {type: SET_ONBOARDING_STATUS};
    onboarding(mockState, mockAction);
    expect(mockUpdateOnboardingStatus).toHaveBeenCalledTimes(1);
  });
  test('should call updateOnboardingStatus with state and action', () => {
    const mockUpdateOnboardingStatus = jest.fn();
    jest.spyOn(actionCreators, 'updateOnboardingStatus').mockImplementationOnce(mockUpdateOnboardingStatus);
    const mockAction = {type: SET_ONBOARDING_STATUS};
    onboarding(mockState, mockAction);
    expect(mockUpdateOnboardingStatus).toHaveBeenCalledWith(mockState, mockAction);
  });
  test('should call handleOnboardingError when it receives action.type SET_ONBOARDING_ERROR', () => {
    const mockHandleOnboardingError = jest.fn();
    jest.spyOn(actionCreators, 'handleOnboardingError').mockImplementationOnce(mockHandleOnboardingError);
    const mockAction = {type: SET_ONBOARDING_ERROR};
    onboarding(mockState, mockAction);
    expect(mockHandleOnboardingError).toHaveBeenCalledTimes(1);
  });
  test('should call handleOnboardingError with state and action', () => {
    const mockHandleOnboardingError = jest.fn();
    jest.spyOn(actionCreators, 'handleOnboardingError').mockImplementationOnce(mockHandleOnboardingError);
    const mockAction = {type: SET_ONBOARDING_ERROR};
    onboarding(mockState, mockAction);
    expect(mockHandleOnboardingError).toHaveBeenCalledWith(mockState, mockAction);
  });
  test('should call resetOnboardingStatus when it receives action.type RESET_ONBOARDING_STATUS', () => {
    const mockResetOnboardingStatus = jest.fn();
    jest.spyOn(actionCreators, 'resetOnboardingStatus').mockImplementationOnce(mockResetOnboardingStatus);
    const mockAction = {type: RESET_ONBOARDING_STATUS};
    onboarding(mockState, mockAction);
    expect(mockResetOnboardingStatus).toHaveBeenCalledTimes(1);
  });
  test('should call resetOnboardingStatus with state', () => {
    const mockResetOnboardingStatus = jest.fn();
    jest.spyOn(actionCreators, 'resetOnboardingStatus').mockImplementationOnce(mockResetOnboardingStatus);
    const mockAction = {type: RESET_ONBOARDING_STATUS};
    onboarding(mockState, mockAction);
    expect(mockResetOnboardingStatus).toHaveBeenCalledWith(mockState);
  });
  test('should return state when no action.type is matched', () => {
    const mockAction = {
      type: 'NOT_A_VALID_TYPE',
    };
    const output = onboarding(mockState, mockAction);
    expect(output).toEqual(mockState);
  });
});

describe('<actionCreators>', () => {
  describe('<updateOnboardingStatus>', () => {
    const mockState = {loading: true, error: null, onboardingStatus: null};
    test('should set loading to false ', () => {
      const mockAction = {onboardingStatus: 'TEST_ONBOARDING_STATUS'};
      const newState = actionCreators.updateOnboardingStatus(mockState, mockAction);
      expect(newState).toHaveProperty('loading', false);
    });
    test('should set onboardingStatus to action.onboardingStatus', () => {
      const mockAction = {onboardingStatus: 'TEST_ONBOARDING_STATUS'};
      const newState = actionCreators.updateOnboardingStatus(mockState, mockAction);
      expect(newState).toHaveProperty('onboardingStatus', mockAction.onboardingStatus);
    });
    test('should mutate loading and onboardingStatus props only', () => {
      const mockAction = {onboardingStatus: 'TEST_ONBOARDING_STATUS'};
      const newState = actionCreators.updateOnboardingStatus(mockState, mockAction);
      const expectedState = {...mockState, onboardingStatus: mockAction.onboardingStatus, loading: false};
      expect(newState).toEqual(expectedState);
    });
  });
  describe('<handleOnboardingError>', () => {
    const mockState = {loading: true, error: null, onboardingStatus: 'complete'};
    test('should set loading to false ', () => {
      const mockAction = {error: 'TEST_ERROR'};
      const newState = actionCreators.handleOnboardingError(mockState, mockAction);
      expect(newState).toHaveProperty('loading', false);
    });
    test('should set error to action.error', () => {
      const mockAction = {error: 'TEST_ERROR'};
      const newState = actionCreators.handleOnboardingError(mockState, mockAction);
      expect(newState).toHaveProperty('error', mockAction.error);
    });
    test('should mutate loading and error props only', () => {
      const mockAction = {error: 'TEST_ERROR'};
      const newState = actionCreators.handleOnboardingError(mockState, mockAction);
      const expectedState = {...mockState, error: mockAction.error, loading: false};
      expect(newState).toEqual(expectedState);
    });
  });
  describe('<resetOnboardingStatus>', () => {
    const mockState = {loading: true, error: null, onboardingStatus: 'complete'};
    test('should set loading to false ', () => {
      const newState = actionCreators.resetOnboardingStatus(mockState);
      expect(newState).toHaveProperty('loading', false);
    });
    test('should set onboardingStatus to incomplete', () => {
      const newState = actionCreators.resetOnboardingStatus(mockState);
      expect(newState).toHaveProperty('onboardingStatus', 'incomplete');
    });
    test('should mutate loading and error props only', () => {
      const newState = actionCreators.resetOnboardingStatus(mockState);
      const expectedState = {...mockState, loading: false, onboardingStatus: 'incomplete'};
      expect(newState).toEqual(expectedState);
    });
  });
});

describe('<Dispatches>', () => {
  describe('<updateOnboardingStatus>', () => {
    test('should dispatch SET_ONBOARDING_STATUS type', () => {
      const mockOnboardingStatus = 'MOCK_ONBOARDING_STATUS';
      const dispatch = updateOnboardingStatus(mockOnboardingStatus);
      expect(dispatch).toHaveProperty('type', SET_ONBOARDING_STATUS);
    });
    test('should dispatch onboardingStatus passed as argument', () => {
      const mockOnboardingStatus = 'MOCK_ONBOARDING_STATUS';
      const dispatch = updateOnboardingStatus(mockOnboardingStatus);
      expect(dispatch).toHaveProperty('onboardingStatus', mockOnboardingStatus);
    });
  });
  describe('<handleOnboardingError>', () => {
    test('should dispatch SET_ONBOARDING_ERROR type', () => {
      const mockError = 'MOCK_ERROR';
      const dispatch = handleOnboardingError(mockError);
      expect(dispatch).toHaveProperty('type', SET_ONBOARDING_ERROR);
    });
    test('should dispatch error passed as argument', () => {
      const mockError = 'MOCK_ERROR';
      const dispatch = handleOnboardingError(mockError);
      expect(dispatch).toHaveProperty('error', mockError);
    });
  });
  describe('<resetOnboardingStatus>', () => {
    test('should dispatch RESET_ONBOARDING_STATUS type', () => {
      const dispatch = resetOnboardingStatus();
      expect(dispatch).toHaveProperty('type', RESET_ONBOARDING_STATUS);
    });
  });
  describe('<skipOnboarding>', () => {
    test('should dispatch SKIP_ONBOARDING type', () => {
      const dispatch = skipOnboarding();
      expect(dispatch).toHaveProperty('type', SKIP_ONBOARDING);
    });
  });
});

describe('<Sagas>[Integration Tests]', () => {
  describe('<getOnboarding>', () => {
    describe('<Dispatches>', () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });
      test('should dispatch SET_ONBOARDING_STATUS and ONBOARDING_STATUS.incomplete', () => {
        jest.spyOn(AsyncStorage, 'getData').mockReturnValueOnce(null);
        return expectSaga(getOnboarding)
          .dispatch({type: SET_ONBOARDING_STATUS, onboardingStatus: ONBOARDING_STATUS.incomplete})
          .run();
      });
      test('should dispatch SET_ONBOARDING_STATUS and ONBOARDING_STATUS returned from getData', () => {
        const mockOnboardingStatus = 'MOCK_ONBOARDING_STATUS';
        jest.spyOn(AsyncStorage, 'getData').mockReturnValueOnce(mockOnboardingStatus);
        return expectSaga(getOnboarding)
          .dispatch({type: SET_ONBOARDING_STATUS, onboardingStatus: mockOnboardingStatus})
          .run();
      });
      test('should dispatch SET_ONBOARDING_ERROR and error returned from getData', () => {
        const mockError = new Error('Async error');
        jest.spyOn(AsyncStorage, 'getData').mockRejectedValueOnce(mockError);
        return expectSaga(getOnboarding).dispatch({type: SET_ONBOARDING_ERROR, error: mockError}).run();
      });
    });
    describe('<State>', () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });
      test('should set onboardingStatus as ONBOARDING_STATUS.incomplete and loading false if no value returned from AsyncStorage', () => {
        jest.spyOn(AsyncStorage, 'getData').mockReturnValueOnce(null);
        return expectSaga(getOnboarding)
          .withReducer(onboarding)
          .hasFinalState({
            loading: false,
            error: null,
            onboardingStatus: ONBOARDING_STATUS.incomplete,
          })
          .run();
      });
      test('should set onboardingStatus as with value returned from AsyncStorage and loading false if value returned from AsyncStorage', () => {
        const mockOnboardingStatus = 'MOCK_ONBOARDING_STATUS';
        jest.spyOn(AsyncStorage, 'getData').mockReturnValueOnce(mockOnboardingStatus);
        return expectSaga(getOnboarding)
          .withReducer(onboarding)
          .hasFinalState({
            loading: false,
            error: null,
            onboardingStatus: mockOnboardingStatus,
          })
          .run();
      });
      test('should set error and loading false if Error is thrown from getData ', () => {
        const mockError = new Error('Async error');
        jest.spyOn(AsyncStorage, 'getData').mockRejectedValueOnce(mockError);
        return expectSaga(getOnboarding)
          .withReducer(onboarding)
          .hasFinalState({
            loading: false,
            error: mockError,
            onboardingStatus: null,
          })
          .run();
      });
    });
  });
});
