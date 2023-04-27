import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./home.page.css";

export default function HomePage() {
  const userLoggedObject = useSelector(
    (state: RootState) => state.userState.userLogged
  );

  const userLoggedToken = useSelector(
    (state: RootState) => state.userState.userLoggedToken
  );

  return (
    <>
      <div className="homePage__container">
        <h2>Welcome to ERP app</h2>
        <section className="homePage__userLoggedProfile">
          <div>
            Name: {userLoggedObject.firstName + " " + userLoggedObject.lastName}
          </div>
          <div>Email: {userLoggedObject.email}</div>
          <div>Rol: {userLoggedObject.role}</div>
          <div className="token">Token at userState: {userLoggedToken}</div>
          <div className="token">
            Token at localStorage: {localStorage.getItem("tokenERP")}
          </div>

          <article className="homePage__userLoggedMenuOptions">
            Menu Options:
          </article>
          <article className="homePage__userLoggedPermissions">
            Permissions:
          </article>
        </section>
      </div>
    </>
  );
}
