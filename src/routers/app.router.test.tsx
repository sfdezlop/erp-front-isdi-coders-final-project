import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { MenuOption } from "../components/menu/menu";
import { store } from "../store/store";
import { AppRouter } from "./app.router";

describe("Given the app router component", () => {
  const mockOptions: MenuOption[] = [
    { label: "Home", path: "/home" },
    { label: "Inventory", path: "/inventory" },
  ];

  const mockRouterFunctions = (num: number) => {
    render(
      <Provider store={store}>
        <Router initialEntries={["/home", "/inventory"]} initialIndex={num}>
          <AppRouter options={mockOptions}></AppRouter>
        </Router>
      </Provider>
    );
  };

  describe("when the route is HOME", () => {
    test("then it should go to /home and render it", async () => {
      await waitFor(async () => mockRouterFunctions(0));
      const element = await screen.findByRole("heading", {
        name: "HomePage",
      });
      expect(element).toBeInTheDocument();
    });
  });
});
