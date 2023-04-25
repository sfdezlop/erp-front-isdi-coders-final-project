import { menuOptions } from "../../components/menu/menu";
import { useApp } from "../../hooks/use.app";
import { AppRouter } from "../../routers/app.router";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { useLocation } from "react-router-dom";
import "./App.css";

export function App() {
  const location = useLocation();
  const { updateUrl } = useApp();
  updateUrl(location.pathname);
  return (
    <>
      <div className="App">
        <Header></Header>
        <div className="approuter_container">
          <AppRouter options={menuOptions}></AppRouter>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
