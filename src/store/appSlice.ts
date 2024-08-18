import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../data/products';

interface AppState {
  selectedProduct: Product | null;
  enteredAmount: number;
}

interface AmountPayload {
  amount: number;
}

const initialState: AppState = {
  selectedProduct: null,
  enteredAmount: 0,
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
    },
  },
});

export const { selectProduct, resetApp, addToAmount, resetAmount } =
  appSlice.actions;

export default appSlice.reducer;
