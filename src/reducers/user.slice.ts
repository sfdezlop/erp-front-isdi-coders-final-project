import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { menuOptions, MenuOption } from "../components/menu/menu";
import { UserStructure } from "../models/collections.model";

import { asyncLoadUsersGallery } from "./user.thunks";

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

  extraReducers(builder) {
    builder.addCase(asyncLoadUsersGallery.pending, (state) => {
      //To change state variables in async processes: state.loadingUsersStatus = "loading";
    });
    builder.addCase(asyncLoadUsersGallery.fulfilled, (state, action) => {
      state.usersGallery = action.payload.results[2];

      //To change state variables in async processes: state.loadingUsersStatus = "idle";
    });
    builder.addCase(asyncLoadUsersGallery.rejected, (state) => {
      //To change state variables in async processes: state.loadingUsersStatus = "error";
    });
  },
});

export const { loginToken, loginUser, loginGallery, logoutToken } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
