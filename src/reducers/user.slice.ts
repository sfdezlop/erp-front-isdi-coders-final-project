import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { menuOptions, MenuOption } from "../components/menu/menu";
import { UserStructure } from "../models/user.model";

export type UserStateStructure = {
  userLoggedToken: string;
  userLogged: UserStructure;
  userLoggedMenuOptions: MenuOption[];
  userLoggedInitials: string;
  usersGallery: UserStructure[];
};

export const initialState: UserStateStructure = {
  userLoggedToken: "No Token",
  userLogged: {} as UserStructure,
  userLoggedMenuOptions: menuOptions,
  userLoggedInitials: "",
  usersGallery: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginToken(state: UserStateStructure, action: PayloadAction<string>) {
      state.userLoggedToken = action.payload;
    },
    loginUser(state: UserStateStructure, action: PayloadAction<UserStructure>) {
      state.userLogged = action.payload;
    },
    loginGallery(
      state: UserStateStructure,
      action: PayloadAction<UserStructure[]>
    ) {
      state.usersGallery = action.payload;
    },
    logoutToken(state: UserStateStructure, action: PayloadAction<string>) {
      state.userLoggedToken = action.payload;
    },
  },
});

export const { loginToken, loginUser, loginGallery, logoutToken } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
