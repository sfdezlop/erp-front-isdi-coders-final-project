/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import { Footer } from "./footer";

describe("Given the footer component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Footer></Footer>
          </Router>
        </Provider>
      );
    });
  });

  describe("When the footer component is rendered", () => {
    test("Then it should contain the heading role", () => {
      const elements = screen.getAllByRole("heading");
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
