import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';
import { UserData } from '../types/user';

export enum ActionType {
  ChangeAuthStatus = 'user/ChangeAuthStatus',
  SetUserData = 'user/SetUserData',
  ChangeSelectedCity = 'data/ChangeSelectedCity',
  LoadOffers = 'data/LoadOffers',
  ChangeSortType = 'data/ChangeSortType',
  IsNeedUpdateComment = 'data/IsNeedUpdateComment',
  UpdateFavoriteId = 'data/UpdateFavoriteId',
  IsNeedUpdateFavoriteButton = 'data/IsNeedUpdateFavoriteButton',
}

export const actionCreator = {
  сhangeSelectedCity: createAction(
    ActionType.ChangeSelectedCity,
    (city: string) => ({
      payload: city,
    }),
  ),
  loadOffers: createAction(
    ActionType.LoadOffers,
    (offers: Offer[]) => ({
      payload: offers,
    }),
  ),
  changeSortType: createAction(
    ActionType.ChangeSortType,
    (sortType: string) => ({
      payload: sortType,
    }),
  ),

  isNeedUpdateComment: createAction(
    ActionType.IsNeedUpdateComment,
    (isNeed: boolean) => ({
      payload: isNeed,
    }),
  ),

  updateFavoriteId: createAction(
    ActionType.UpdateFavoriteId,
    (UpdateFavoriteId: number) => ({
      payload: UpdateFavoriteId,
    }),
  ),

  changeAuthStatus: createAction(
    ActionType.ChangeAuthStatus,
    (authStatus: string) => ({
      payload: authStatus,
    }),
  ),

  setUserData: createAction(
    ActionType.SetUserData,
    (userData: UserData) => ({
      payload: userData,
    }),
  ),
};
