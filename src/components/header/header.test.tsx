/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import { Header } from "./header";

describe("Given the header component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Header></Header>
          </Router>
        </Provider>
      );
    });
  });

  describe("When the header component is rendered", () => {
    test("Then it should contain the navigation role", () => {
      const elements = screen.getAllByRole("navigation");
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
