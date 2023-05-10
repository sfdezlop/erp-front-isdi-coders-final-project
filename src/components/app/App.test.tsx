import { render } from "@testing-library/react";
import { AppRouter } from "../../routers/app.router";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";

jest.mock("../header/header");
jest.mock("../footer/footer");
jest.mock("../../routers/app.router");
jest.mock("../query.collection/query.collection");

describe("Given the App component", () => {
  describe("When it is rendered", () => {
    test("Then it should call components Header, Footer and AppRouter", () => {
      render(
        <Provider store={store}>
          <Router>
            <App></App>
          </Router>
        </Provider>
      );
      expect(Header).toHaveBeenCalled();
      expect(Footer).toHaveBeenCalled();
      expect(AppRouter).toHaveBeenCalled();
    });
  });
});
