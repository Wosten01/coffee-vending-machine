import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  step: number;
  selectedProduct: number | null;
  paymentMethod: string | null;
}

const initialState: AppState = {
  step: 1,
  selectedProduct: null,
  paymentMethod: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    selectProduct: (state, action: PayloadAction<number>) => {
      state.selectedProduct = action.payload;
      state.step = 2;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      state.step = 3;
    },
    resetApp: (state) => {
      state.step = 1;
      state.selectedProduct = null;
      state.paymentMethod = null;
    },
  },
});

export const { setStep, selectProduct, setPaymentMethod, resetApp } =
  appSlice.actions;

export default appSlice.reducer;
