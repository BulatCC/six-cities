import { appData, AppData, initialState } from './app-data';
import { actionCreator } from '../actions';
import { CityNames, SortType } from '../../consts';
import { mockOffer } from '../../services/mock';
import { updateFavoriteData } from '../../services/utils';

const FAKE_ARRAY_LENGTH = 3;
const FAKE_FAVORITE_ID = 2;
const state = initialState;

describe('Reducer: appData', () => {
  test('should change selected city', () => {
    expect(appData(state, actionCreator.сhangeSelectedCity(CityNames.Brussels)))
      .toEqual({
        ...state,
        selectedCity: CityNames.Brussels,
      });
  });

  test('should load offers and set isDataLoaded: true', () => {
    const offers = new Array(FAKE_ARRAY_LENGTH).fill(mockOffer);
    expect(appData(state, actionCreator.loadOffers(offers)))
      .toEqual({
        ...state,
        defaultOffers: offers,
        isDataLoaded: true,
      });
  });

  test('should change sort type', () => {
    expect(appData(state, actionCreator.changeSortType(SortType.PriceLowToHigh)))
      .toEqual({
        ...state,
        currentSortType: SortType.PriceLowToHigh,
      });
  });

  test('check need update comment', () => {
    expect(appData(state, actionCreator.isNeedUpdateComment(true)))
      .toEqual({
        ...state,
        isNeedCommentUpdate: true,
      });
  });

  test('should update favorite id', () => {
    const offers = new Array(FAKE_ARRAY_LENGTH).fill(mockOffer);
    const stateTest: AppData = {
      ...initialState,
      defaultOffers: offers,
    };

    expect(appData(stateTest, actionCreator.updateFavoriteId(FAKE_FAVORITE_ID)))
      .toEqual({
        ...stateTest,
        defaultOffers: stateTest.defaultOffers = updateFavoriteData(stateTest.defaultOffers, FAKE_FAVORITE_ID),
      });
  });
});
