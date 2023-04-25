/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import { Loader } from "./loader";

describe("Given the loader component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Loader></Loader>
          </Router>
        </Provider>
      );
    });
  });

  describe("When the loader component is rendered", () => {
    test("Then it should contain the image role", () => {
      const elements = screen.getAllByRole("img");
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
