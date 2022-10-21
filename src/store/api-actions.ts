import { ThunkActionResult } from '../types/actions';
import { ReviewBackend } from '../types/reviews';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offers';
import { ApiRoute, AuthorizationStatus } from '../consts';
import { actionCreator } from './actions';
import { saveToken, dropToken, Token } from '../services/token';
import { AxiosResponse } from 'axios';

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);
    dispatch(actionCreator.loadOffers(data));
  };

export const getAuthStatus = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(ApiRoute.Login)
      .then((response) => {
        dispatch(actionCreator.changeAuthStatus(AuthorizationStatus.Auth));
        dispatch(actionCreator.setUserData(response.data));
      })
      .catch(() => dispatch(actionCreator.changeAuthStatus(AuthorizationStatus.NoAuth)));
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data }: AxiosResponse = await api.post<{ token: Token }>(ApiRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(actionCreator.changeAuthStatus(AuthorizationStatus.Auth));
    dispatch(actionCreator.setUserData(data));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(actionCreator.changeAuthStatus(AuthorizationStatus.NoAuth));
    dispatch(actionCreator.setUserData({
      email: '',
      avatarUrl: '',
    }));
  };

export const postReview = ({ rating, comment, id }: ReviewBackend): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post(`${ApiRoute.Comments}/${id}`, { rating, comment });
    dispatch(actionCreator.isNeedUpdateComment(true));
  };
