import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./page.home.css";

export default function HomePage() {
  const userState = useSelector((state: RootState) => state.userState);

  return (
    <>
      <div className="homePage">
        <h2 className="homePage__heading">Welcome to ERP app</h2>
        <div className="homePage__container">
          <section className="homePage__userLoggedProfile">
            <div>
              User logged:{" "}
              {userState.userLogged.firstName +
                " " +
                userState.userLogged.lastName}
            </div>
            <div>Email: {userState.userLogged.email}</div>
            <div>Language: {userState.userLogged.language}</div>
            <div>Rol: {userState.userLogged.role}</div>
            <div className="homePage__token">
              Token at userState: {userState.userLoggedToken}
            </div>
            <div className="homePage__token">
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
      </div>
    </>
  );
}
