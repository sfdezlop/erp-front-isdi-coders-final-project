/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import DetailPage from "./detail.page";

describe("Given the DetailPage component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <DetailPage></DetailPage>
          </Router>
        </Provider>
      );
    });
  });

  describe("When the DetailPage component is rendered", () => {
    test("Then it should contain the heading role", () => {
      const elements = screen.getAllByRole("heading");
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
