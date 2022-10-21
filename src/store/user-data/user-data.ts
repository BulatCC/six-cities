import { createReducer } from '@reduxjs/toolkit';
import { actionCreator } from '../actions';
import { UserData } from '../../types/user';
import { AuthorizationStatus } from '../../consts';

export type UserState = {
  authorizationStatus: string,
  userData: UserData,
}

export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    email: '',
    avatarUrl: '',
  },
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(actionCreator.changeAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(actionCreator.setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export { userData };
