import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./home.page.css";

export default function HomePage() {
  const userLoggedObject = useSelector(
    (state: RootState) => state.userState.userLogged
  );

  const userLoggedToken = useSelector(
    (state: RootState) => state.userState.userLoggedToken
  );
  localStorage.setItem("tokenERP", userLoggedToken);
  useEffect(() => {
    localStorage.setItem("tokenERP", userLoggedToken);
  }, []);

  return (
    <>
      <div className="homePage__container">
        <h2>Bienvenido a ERP</h2>
        <section className="userLogged_profile">
          <h3>
            Nombre:{" "}
            {userLoggedObject.firstName + " " + userLoggedObject.lastName}
          </h3>
          <p>Email: {userLoggedObject.email}</p>
          <p>Rol: {userLoggedObject.role}</p>
          <p>Token en estado del usuario: {userLoggedToken}</p>
          <p>Token en localStorage: {localStorage.getItem("tokenERP")}</p>

          <article className="userLogged_menuOptions"></article>
          <article className="userLogged_permissions"></article>
        </section>
      </div>
    </>
  );
}
