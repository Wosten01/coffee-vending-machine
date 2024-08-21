import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardAcceptorState {
  statusMessage: string;
  isProcessing: boolean;
}

const initialState: CardAcceptorState = {
  statusMessage: 'Приложите карту для оплаты.',
  isProcessing: false,
};

const cardAcceptorSlice = createSlice({
  name: 'cardAcceptor',
  initialState,
  reducers: {
    setStatusMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.statusMessage = action.payload.message;
    },
    resetCardAcceptor: (state) => {
      state.statusMessage = 'Приложите карту для оплаты.';
      state.isProcessing = false;
    },
    setProcessing: (state, action: PayloadAction<{ status: boolean }>) => {
      state.isProcessing = action.payload.status;
    },
  },
});

export const { setStatusMessage, resetCardAcceptor, setProcessing } =
  cardAcceptorSlice.actions;
export default cardAcceptorSlice.reducer;
