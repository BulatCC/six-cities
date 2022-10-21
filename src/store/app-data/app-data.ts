import { createReducer } from '@reduxjs/toolkit';
import { actionCreator } from '../actions';
import { CityNames, SortType } from '../../consts';
import { Offer } from '../../types/offers';
import { updateFavoriteData } from '../../services/utils';

export type AppData = {
  selectedCity: string,
  defaultOffers: Offer[],
  isDataLoaded: boolean,
  currentSortType: string,
  isNeedCommentUpdate: boolean,
  UpdateFavoriteId: number | null,
  isNeedUpdateFavoriteButton: boolean,
};

export const initialState: AppData = {
  selectedCity: CityNames.Paris,
  defaultOffers: [],
  isDataLoaded: false,
  currentSortType: SortType.Popular,
  isNeedCommentUpdate: false,
  UpdateFavoriteId: null,
  isNeedUpdateFavoriteButton: false,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(actionCreator.сhangeSelectedCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(actionCreator.loadOffers, (state, action) => {
      state.defaultOffers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(actionCreator.changeSortType, (state, action) => {
      state.currentSortType = action.payload;
    })
    .addCase(actionCreator.isNeedUpdateComment, (state, action) => {
      state.isNeedCommentUpdate = action.payload;
    })
    .addCase(actionCreator.updateFavoriteId, (state, action) => {
      state.defaultOffers = updateFavoriteData(state.defaultOffers, action.payload);
    });
});

export { appData };
