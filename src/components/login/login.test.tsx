/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import { Login } from "./login";

describe("Given the login component", () => {
  beforeEach(async () => {
    await act(async () => {
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
});
