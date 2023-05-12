import { Route, Routes } from "react-router-dom";
import { MenuOption } from "../components/menu/menu";
import { Login } from "../components/login/login";
import DetailPage from "../components/pages/details/page.detail.product";
import HomePage from "../components/pages/home/page.home";
import MovementsPage from "../components/pages/productmovements/page.productmovements";
import ProductsPage from "../components/pages/products/page.products";
import { ErrorLog } from "../components/errorlog/errorlog";
import DashboardPage from "../components/pages/dashboard/page.dashboard";
import CollectionPage from "../components/pages/collection/page.collection";

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
      <Route path="/errorlog" element={<ErrorLog></ErrorLog>}></Route>{" "}
      <Route
        path="/collections/:collection"
        element={<CollectionPage></CollectionPage>}
      ></Route>
    </Routes>
    // </Suspense>
  );
}
