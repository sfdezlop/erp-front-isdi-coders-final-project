/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { useUsers } from "../../hooks/use.users";
import { Login } from "./login";
import userEvent from "@testing-library/user-event";
import { UsersRepo } from "../../services/repositories/user.repo";

jest.mock("../../hooks/use.users");

describe("Given the login component", () => {
  beforeEach(async () => {
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        userLogin: jest.fn(),
        userLoginWithToken: jest.fn(),
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Login></Login>
          </MemoryRouter>
        </Provider>
      );
    });
  });

  describe("When the login component is rendered", () => {
    test("Then it should contain the heading role", () => {
      const elements = screen.getAllByRole("heading");
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe("When the login form is submitted without checking the checkbox of 'Remind me'", () => {
    test("Then the typed email and passwd and the false value of the checkbox should be sent to useUser hook", async () => {
      const mockRepo = {} as UsersRepo;

      const inputs = screen.getAllByRole("textbox");
      const checkboxes = screen.getAllByRole("checkbox");

      const fireButton = screen.getByRole("button");

      await act(async () => {
        await userEvent.type(inputs[0], "email test");
        await userEvent.type(inputs[1], "passwd test");
        await userEvent.click(checkboxes[0]);

        await userEvent.click(fireButton);
        /* fire events that update state */
      });

      expect(fireButton).toBeInTheDocument();
      expect(useUsers(mockRepo).userLogin).toBeCalledWith(
        {
          email: "email test",
          passwd: "passwd test",
        },
        false
      );
    });
  });
});
