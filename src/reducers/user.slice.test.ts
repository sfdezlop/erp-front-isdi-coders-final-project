import { PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../models/collections.model";
import { userReducer, UserStateStructure } from "./user.slice";
import { MenuOption } from "../components/menu/menu";

const mockPasswd = "mockPasswd";

const mockInitialState: UserStateStructure = {
  userLoggedToken: "" as string,
  userLogged: {} as UserStructure,
  userLoggedMenuOptions: [] as MenuOption[],
  userLoggedInitials: "",
  usersGallery: [] as UserStructure[],
};

const mockFinalState: UserStateStructure = {
  userLoggedToken: "mockToken",
  userLogged: {
    id: "mockId",
    email: "mockEmail",
    passwd: mockPasswd,
    firstName: "mockFirstName",
    lastName: "mockLastName",
    role: "mockRole",
    image: "mockImage",
    lastLogging: "mockLastLogging",
    language: "es",
  },
  userLoggedMenuOptions: [
    { label: "mockLabel", path: "mockPath" },
  ] as MenuOption[],
  userLoggedInitials: "mockInitials",
  usersGallery: [
    {
      id: "mockId",
      email: "mockEmail",
      passwd: mockPasswd,
      firstName: "mockFirstName",
      lastName: "mockLastName",
      role: "mockRole",
      image: "mockImage",
      lastLogging: "mockLastLogging",
    },
  ] as UserStructure[],
};

describe("Given the userSlice", () => {
  describe("When the method loginToken is called", () => {
    test("Then it should update the userLoggedToken property of userState to the mock payload", () => {
      const mockAction: PayloadAction<string> = {
        type: "user/loginToken",
        payload: mockFinalState.userLoggedToken,
      };
      const element = userReducer(mockInitialState, mockAction);
      expect(element.userLoggedToken).toEqual(mockFinalState.userLoggedToken);
    });
  });

  describe("When the method loginUser is called", () => {
    test("Then it should update the userLogged property of userState to the mock payload", () => {
      const mockAction: PayloadAction<UserStructure> = {
        type: "user/loginUser",
        payload: mockFinalState.userLogged,
      };
      const element = userReducer(mockInitialState, mockAction);
      expect(element.userLogged).toEqual(mockFinalState.userLogged);
    });
  });

  describe("When the method loginGallery is called", () => {
    test("Then it should update the usersGallery property of userState to the mock payload", () => {
      const mockAction: PayloadAction<UserStructure[]> = {
        type: "user/loginGallery",
        payload: mockFinalState.usersGallery,
      };
      const element = userReducer(mockInitialState, mockAction);
      expect(element.usersGallery).toEqual(mockFinalState.usersGallery);
    });
  });

  describe("When the method logoutToken is called", () => {
    test("Then it should update the userLoggedToken property of userState to the mock payload", () => {
      const mockAction: PayloadAction<string> = {
        type: "user/logoutToken",
        payload: mockFinalState.userLoggedToken,
      };
      const element = userReducer(mockInitialState, mockAction);
      expect(element.userLoggedToken).toEqual(mockFinalState.userLoggedToken);
    });
  });
});
