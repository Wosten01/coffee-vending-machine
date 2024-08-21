import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardAcceptorState {
  statusMessage: string;
}

const initialState: CardAcceptorState = {
  statusMessage: 'Приложите карту для оплаты.',
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
    },
  },
});

export const { setStatusMessage, resetCardAcceptor } =
  cardAcceptorSlice.actions;
export default cardAcceptorSlice.reducer;
