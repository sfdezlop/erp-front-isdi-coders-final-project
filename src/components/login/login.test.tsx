/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
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
          <Router>
            <Login></Login>
          </Router>
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

  describe("When the login form is submitted", () => {
    test("Then the email and passwd should been sent", async () => {
      const mockRepo = {} as UsersRepo;

      const inputs = screen.getAllByRole("textbox");
      const fireButton = screen.getByRole("button");

      await userEvent.type(inputs[0], "email test");
      await userEvent.click(fireButton);
      expect(fireButton).toBeInTheDocument();
      expect(useUsers(mockRepo).userLogin).toBeCalledWith({
        email: "email test",
        passwd: "",
      });
    });
  });
});
