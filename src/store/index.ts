import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import cashAcceptorReducer from './cashAcceptorSlice';
import cardAcceptorReducer from './cardAcceptorSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    cashAcceptor: cashAcceptorReducer,
    cardAcceptor: cardAcceptorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
