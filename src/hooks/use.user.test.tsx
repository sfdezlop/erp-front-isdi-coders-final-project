/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { UserStructure } from "../models/user.model";
import { UsersRepo } from "../services/repositories/user.repo";
import { store } from "../store/store";
import { useUsers } from "./use.users";

describe("Given the useUsers hook", () => {
  let mockPayload: UserStructure;
  let mockRepo: UsersRepo;

  beforeEach(async () => {
    mockPayload = {
      email: "test",
      passwd: "testPasswd",
    } as unknown as UserStructure;

    mockRepo = {
      readTokenAndUser: jest.fn(),
      readGallery: jest.fn(),
    } as unknown as UsersRepo;

    const TestComponent = function () {
      const { userLogin } = useUsers(mockRepo);

      return (
        <>
          <button onClick={() => userLogin(mockPayload)}>userLogin</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
  });

  describe("when the TestComponent is rendered", () => {
    test("then the button should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe("when the LOGIN button of TestComponent is called", () => {
    test("then the userLogin should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[0]));
      expect(mockRepo.readTokenAndUser).toHaveBeenCalled();
      expect(mockRepo.readGallery).toHaveBeenCalled();
    });
  });
});
