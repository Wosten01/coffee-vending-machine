import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../data/products';

interface AppState {
  selectedProduct: Product | null;
  enteredAmount: number;
  isSuccessfulVend: boolean;
}

interface AmountPayload {
  amount: number;
}

const initialState: AppState = {
  selectedProduct: null,
  enteredAmount: 0,
  isSuccessfulVend: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToAmount: (state, action: PayloadAction<AmountPayload>) => {
      state.enteredAmount += action.payload.amount;
    },
    resetAmount: (state) => {
      state.enteredAmount = 0;
    },
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    resetApp: (state) => {
      state.selectedProduct = null;
      appSlice.caseReducers.resetAmount(state);
      state.isSuccessfulVend = true;
    },
    setVendStatus: (state, action: PayloadAction<{ status: boolean }>) => {
      state.isSuccessfulVend = action.payload.status;
    },
  },
});

export const {
  selectProduct,
  resetApp,
  addToAmount,
  resetAmount,
  setVendStatus,
} = appSlice.actions;

export default appSlice.reducer;
