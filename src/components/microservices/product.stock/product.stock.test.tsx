/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../../store/store";
import { ProductStock } from "./product.stock";

describe("Given the ProductStock component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <ProductStock sku="mockSku"></ProductStock>
          </Router>
        </Provider>
      );
    });
  });

  describe("When it is rendered", () => {
    test("Then it should contain the text 'Calculating...'", () => {
      const element = screen.getByText("Calculating...");
      expect(element).toBeInTheDocument();
    });
  });
});
