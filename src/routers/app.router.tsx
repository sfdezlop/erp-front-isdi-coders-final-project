import { Route, Routes } from "react-router-dom";
import { MenuOption } from "../components/menu/menu";
import { Login } from "../components/login/login";
import DetailPage from "../components/pages/detail/detail.page";
import HomePage from "../components/pages/home/home.page";
import MovementsPage from "../components/pages/movements/movements.page";
import ProductsPage from "../components/pages/products/products.page";
import { ErrorLog } from "../components/errorlog/errorlog";
import DashboardPage from "../components/pages/dashboard/dashboard.page";

// import { lazy, Suspense } from "react";
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
