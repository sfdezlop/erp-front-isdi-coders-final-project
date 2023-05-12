import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./page.home.css";

export default function HomePage() {
  const userLoggedObject = useSelector(
    (state: RootState) => state.userState.userLogged
  );

  const userLoggedToken = useSelector(
    (state: RootState) => state.userState.userLoggedToken
  );

  return (
    <>
      <div className="homePage">
        <h2 className="homePage__heading">Welcome to ERP app</h2>
        <div className="homePage__container">
          <section className="homePage__userLoggedProfile">
            <div>
              User logged:{" "}
              {userLoggedObject.firstName + " " + userLoggedObject.lastName}
            </div>
            <div>Email: {userLoggedObject.email}</div>
            <div>Rol: {userLoggedObject.role}</div>
            <div className="homePage__token">
              Token at userState: {userLoggedToken}
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
