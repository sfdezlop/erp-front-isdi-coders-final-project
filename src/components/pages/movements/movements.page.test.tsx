/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../../store/store";
import MovementsPage from "./movements.page";

describe("Given the MovementsPage component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <MovementsPage></MovementsPage>
          </Router>
        </Provider>
      );
    });
  });

  describe("When the MovementsPage component is rendered", () => {
    test("Then it should contain the combobox role", () => {
      const elements = screen.getAllByRole("combobox");
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
