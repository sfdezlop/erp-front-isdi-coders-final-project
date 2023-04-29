/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../../store/store";
import { ProductKeyValue } from "./product.keyvalue";

describe("Given the ProductKeyValue component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <ProductKeyValue urlExtraPathId="/sku-brand/mockSku"></ProductKeyValue>
          </Router>
        </Provider>
      );
    });
  });

  describe("When it is rendered", () => {
    test("Then it should contain the text 'Processing...'", () => {
      const element = screen.getByText("Processing...");
      expect(element).toBeInTheDocument();
    });
  });
});
