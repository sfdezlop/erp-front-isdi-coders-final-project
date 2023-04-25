import { Route, Routes } from "react-router-dom";
// import { lazy, Suspense } from "react";
import { MenuOption } from "../components/menu/menu";
import { Login } from "../components/login/login";
import DashboardPage from "../pages/dashboard/dashboard.page";
import DetailPage from "../pages/detail/detail.page";
import HomePage from "../pages/home/home.page";
import MovementsPage from "../pages/movements/movements.page";
import ProductsPage from "../pages/products/products.page";
import { ErrorLog } from "../components/errorlog/errorlog";

// import { Filter } from "../pages/products/filter";

// const HomePage = lazy(() => import("../pages/home/home.page"));
// const DashboardPage = lazy(() => import("../pages/dashboard/dashboard.page"));
// const ProductsPage = lazy(() => import("../pages/products/products.page"));
// const MovementsPage = lazy(() => import("../pages/movements/movements.page"));
// const DetailPage = lazy(() => import("../pages/detail/detail.page"));

export type AppRouterProps = {
  options: MenuOption[];
};

export function AppRouter({ options }: AppRouterProps) {
  return (
    // <Suspense>
    <Routes>
      <Route path={"*"} element={<Login></Login>}></Route>

      <Route path={options[0].path} element={<HomePage></HomePage>}></Route>
      <Route
        path={options[1].path}
        element={<DashboardPage></DashboardPage>}
      ></Route>
      <Route
        path={options[2].path}
        element={<ProductsPage></ProductsPage>}
      ></Route>
      <Route
        path={options[3].path}
        element={<MovementsPage></MovementsPage>}
      ></Route>
      <Route
        path="/products/details/:productSEMDetails"
        element={<DetailPage></DetailPage>}
      ></Route>
      <Route path="/errorlog" element={<ErrorLog></ErrorLog>}></Route>
    </Routes>
    // </Suspense>
  );
}
