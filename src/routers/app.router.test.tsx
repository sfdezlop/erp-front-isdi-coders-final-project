import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { MenuOption } from "../components/menu/menu";
import { store } from "../store/store";
import { AppRouter } from "./app.router";

describe("Given the app router component", () => {
  const mockOptions: MenuOption[] = [
    { label: "Home", path: "/home" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Products", path: "/products" },
    { label: "Movements", path: "/productmovements" },
  ];

  const mockRouterFunctions = (num: number) => {
    render(
      <Provider store={store}>
        <Router
          initialEntries={[
            "/home",
            "/dashboard",
            "/products",
            "/productmovements",
          ]}
          initialIndex={num}
        >
          <AppRouter options={mockOptions}></AppRouter>
        </Router>
      </Provider>
    );
  };

  describe("When the route is Home", () => {
    test("Then it should go to /home and render it", async () => {
      await waitFor(async () => mockRouterFunctions(0));
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
      console.log(element.innerHTML);
      expect(element.innerHTML).toContain("ERP");
    });
  });

  describe("When the route is Dashboard", () => {
    test("Then it should go to /dashboard and render it", async () => {
      await waitFor(async () => mockRouterFunctions(1));
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
      console.log(element.innerHTML);
      expect(element.innerHTML).toContain("Dashboard");
    });
  });
});
