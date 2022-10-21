import { userData, initialState } from '../../store/user-data/user-data';
import { actionCreator } from '../actions';
import { AuthorizationStatus } from '../../consts';

const state = initialState;

describe('Reducer: userData', () => {
  test('should change auth status', () => {
    expect(userData(state, actionCreator.changeAuthStatus(AuthorizationStatus.Auth)))
      .toEqual({
        ...state,
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });

  test('should set user avatar and email', () => {
    expect(userData(state, actionCreator.setUserData({
      email: 'fake@mail.gnu',
      avatarUrl: 'fakepath',
    })))
      .toEqual({
        ...state,
        userData: {
          email: 'fake@mail.gnu',
          avatarUrl: 'fakepath',
        },
      });
  });
});

