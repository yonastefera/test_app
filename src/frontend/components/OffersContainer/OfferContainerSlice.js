import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { requestStatusTypes } from '../../Constants/RequestStatusTypes';
import { offersAPI } from '../../API/OffersAPI';

const initialState = {
  request: {
    status: requestStatusTypes.IDLE,
    errorMessage: null,
  },
  offers: [],
};

export const getOffersAsync = createAsyncThunk(
  'OffersContainer/getOffersAsync',
  async (id, thunkAPI) => {
    const response = await offersAPI.getOffers();

    if (response.status !== 200) {
      return Promise.reject('offers is not loaded');
    }

    const offers = await response.json();

    thunkAPI.dispatch(SET_OFFERS(offers.objects));
  }
);

export const OffersSlice = createSlice({
  name: 'OffersContainer',
  initialState,
  reducers: {
    SET_OFFERS: (state, action) => {
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOffersAsync.fulfilled, (state, action) => {
      state.request.status = requestStatusTypes.SUCCEEDED;
    });
    builder.addCase(getOffersAsync.pending, (state, action) => {
      state.request.status = requestStatusTypes.LOADING;
    });
    builder.addCase(getOffersAsync.rejected, (state, action) => {
      state.request.status = requestStatusTypes.FAILED;
      state.request.errorMessage = action.error.message;
    });
  },
});

export const { SET_OFFERS } = OffersSlice.actions;

export const selectOffers = (state) => JSON.parse(JSON.stringify(state.offersContainer.offers));
export const selectRequest = (state) => state.offersContainer.request;

export default OffersSlice.reducer;
