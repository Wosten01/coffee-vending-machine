import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CashAcceptorState {
  status: 'idle' | 'processing' | 'error';
}

const initialState: CashAcceptorState = {
  status: 'idle',
};

const cashAcceptorSlice = createSlice({
  name: 'cashAcceptor',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<CashAcceptorState['status']>) => {
      state.status = action.payload;
    },
    setProcessing: (state) => {
      state.status = 'processing';
    },
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
});

export const { setStatus, setProcessing, resetStatus } =
  cashAcceptorSlice.actions;
export default cashAcceptorSlice.reducer;
