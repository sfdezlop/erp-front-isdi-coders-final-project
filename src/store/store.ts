import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/user.slice";
import { productReducer } from "../reducers/product.slice";
import { productMovementReducer } from "../reducers/productmovement.slice";
import { appReducer } from "../reducers/app.slice";
import { collectionReducer } from "../reducers/collection.slice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    productState: productReducer,
    productMovementState: productMovementReducer,
    appState: appReducer,
    collectionState: collectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
