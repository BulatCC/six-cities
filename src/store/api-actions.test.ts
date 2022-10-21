import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import { State } from './root-reducer';
import { ApiRoute, AuthorizationStatus } from '../consts';
import { fetchOffers, getAuthStatus, postReview, loginAction, logoutAction } from './api-actions';
import { actionCreator } from './actions';
import { mockOffer } from '../services/mock';

describe('async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const FAKE_ARRAY_LENGTH = 3;
  const fakeUserData = {
    email: '343232@jklbnl.ru',
    avatarUrl: 'https://fakeurl.com/avatar/8.jpg',
    token: 'secret',
  };

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  test('should load offers', async () => {
    const store = mockStore();
    const offers = new Array(FAKE_ARRAY_LENGTH).fill(mockOffer);
    mockApi.onGet(ApiRoute.Offers).reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffers());

    expect(store.getActions()).toEqual([
      actionCreator.loadOffers(offers),
    ]);
  });

  test('should сheck and set authorization status "NO_AUTH"', async () => {
    const store = mockStore();
    mockApi.onGet(ApiRoute.Login).reply(401);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(getAuthStatus());

    expect(store.getActions()).toEqual([
      actionCreator.changeAuthStatus(AuthorizationStatus.NoAuth),
    ]);
  });

  test('should set authorization status "AUTH" and add user email and avatar link', async () => {
    const store = mockStore();
    mockApi.onGet(ApiRoute.Login).reply(200, fakeUserData);

    await store.dispatch(getAuthStatus());

    expect(store.getActions()).toEqual([
      actionCreator.changeAuthStatus(AuthorizationStatus.Auth),
      actionCreator.setUserData(fakeUserData),
    ]);
  });

  test('should login user and save user data to local storage', async () => {
    const fakeUser = {email: 'test@test.ru', password: '123456'};
    Storage.prototype.setItem = jest.fn();
    const store = mockStore();

    mockApi.onPost(ApiRoute.Login).reply(200, fakeUserData);

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      actionCreator.changeAuthStatus(AuthorizationStatus.Auth),
      actionCreator.setUserData(fakeUserData),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  test('should logout user and remove user data from local storage', async () => {
    Storage.prototype.removeItem = jest.fn();
    const store = mockStore();

    mockApi.onDelete(ApiRoute.Logout).reply(204);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      actionCreator.changeAuthStatus(AuthorizationStatus.NoAuth),
      actionCreator.setUserData({email: '', avatarUrl: ''}),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  test('should post review', async () => {
    const fakeComment = {
      comment: 'fake comment',
      rating: '4',
      id: '2',
    };
    const store = mockStore();
    mockApi.onPost(`${ApiRoute.Comments}/${'2'}`).reply(200, fakeComment);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postReview(fakeComment));

    expect(store.getActions()).toEqual([
      actionCreator.isNeedUpdateComment(true),
    ]);
  });
});
