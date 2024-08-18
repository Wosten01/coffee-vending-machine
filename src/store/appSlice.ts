import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  selectedProduct: number | null;
  paymentMethod: string | null;
}

const initialState: AppState = {
  selectedProduct: null,
  paymentMethod: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<number>) => {
      state.selectedProduct = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    resetApp: (state) => {
      state.selectedProduct = null;
      state.paymentMethod = null;
    },
  },
});

export const { selectProduct, setPaymentMethod, resetApp } = appSlice.actions;

export default appSlice.reducer;
