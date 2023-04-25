/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import { ErrorLog } from "./errorlog";

describe("Given the errorlog component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <ErrorLog></ErrorLog>
          </Router>
        </Provider>
      );
    });
  });

  describe("When the errorlog component is rendered", () => {
    test("Then it should contain the link role", () => {
      const elements = screen.getAllByRole("link");
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
