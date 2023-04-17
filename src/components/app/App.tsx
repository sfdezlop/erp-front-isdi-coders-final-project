import { menuOptions } from "../../components/menu/menu";
import { AppRouter } from "../../routers/app.router";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { Login } from "../login/login";
// import { Menu } from "../menu/menu";
import "./App.css";

export function App() {
  return (
    <>
      <div className="App">
        <Header></Header>
        <div className="approuter_container">
          <AppRouter options={menuOptions}></AppRouter> {/* <Login></Login> */}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
