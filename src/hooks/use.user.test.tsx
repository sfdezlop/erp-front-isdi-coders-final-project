/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { UsersRepo } from "../services/repositories/user.repo";
import { useUsers } from "./use.users";
import {
  UserStateStructure,
  initialState as initialUserState,
} from "../reducers/user.slice";
import { UserServerResponseType } from "../models/serverresponse.model";
import { store } from "../store/store";

describe("Given the useUsers hook", () => {
  let mockPayload: UserStateStructure;
  let mockRepo: UsersRepo;
  let mockResponse: UserServerResponseType;

  beforeEach(async () => {
    mockPayload = {
      userLoggedToken: "test",
      userLogged: {},
      userLoggedMenuOptions: [],
      userLoggedInitials: "",
      usersGallery: [],
    } as unknown as UserStateStructure;

    mockRepo = {
      readTokenAndUser: jest.fn(),
      readGallery: jest.fn(),
      loginWithToken: jest.fn(),
    } as unknown as UsersRepo;

    mockResponse = {
      results: ["mockToken", { id: "mockId" }, [], "", []],
    } as unknown as UserServerResponseType;

    const TestComponent = function () {
      const { userLogin, userLogout, userLoginWithToken } = useUsers(mockRepo);

      return (
        <>
          <button onClick={() => userLogin(mockPayload.userLogged, true)}>
            userLogin
          </button>
          <button
            onClick={() => userLoginWithToken(mockPayload.userLoggedToken, "")}
          >
            userLoginWithToken
          </button>
          <button onClick={() => userLogout()}>userLogout</button>
        </>
      );
    };

    await act(async () =>
      render(
        <>
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        </>
      )
    );
  });

  describe("When the TestComponent is rendered", () => {
    test("Then the 3 buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements.length).toEqual(3);
    });
  });

  describe("When the userLogin button of TestComponent is clicked", () => {
    test("Then the readTokenAndUser method of the repo should be called, and the value of userLoggedToken property of userState should be the mockToken", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.readTokenAndUser as jest.Mock).mockResolvedValueOnce(
        mockResponse
      );
      await act(async () => userEvent.click(elements[0]));
      const loginToken = store.getState().userState.userLoggedToken;

      expect(loginToken).toEqual("mockToken");
      expect(mockRepo.readTokenAndUser).toHaveBeenCalled();
    });
  });
  describe("When the userLoginWithToken button of TestComponent is clicked", () => {
    test("Then the loginWithToken method of the repo should be called and the value of userLogged property of userState should have its property id equal to mockId", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.loginWithToken as jest.Mock).mockResolvedValueOnce(
        mockResponse
      );
      const loginUser = store.getState().userState.userLogged;

      expect(loginUser.id).toEqual("mockId");
      await act(async () => userEvent.click(elements[1]));
      expect(mockRepo.loginWithToken).toHaveBeenCalled();
    });

    test("Then, if there is an error at the loginWithToken method of the repo, the property tokenERP of the localStorage should be equal to the initial value of the userLoggedToken property of userState", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.loginWithToken as jest.Mock).mockResolvedValueOnce([]);

      await act(async () => userEvent.click(elements[1]));
      expect(localStorage.getItem("tokenERP")).toBe(
        initialUserState.userLoggedToken
      );
    });
  });

  describe("When the userLogout button of TestComponent is clicked", () => {
    test("Then the logoutToken action should be dispatched changing the value of userLoggedToken property of userState to its initial value", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[2]));
      const logoutToken = store.getState().userState.userLoggedToken;

      const initialUserLoggedToken = initialUserState.userLoggedToken;
      expect(logoutToken).toEqual(initialUserLoggedToken);
    });
  });
});
