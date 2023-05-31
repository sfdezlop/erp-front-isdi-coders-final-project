import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./page.home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomePage() {
  const userState = useSelector((state: RootState) => state.userState);
  const [tokenERP, setTokenERP] = useState("No Token");

  useEffect(() => {
    setTokenERP(localStorage.tokenERP);
  }, []);

  return (
    <>
      <div className="homePage">
        <h2 className="homePage__heading">Welcome to ERP app</h2>
        <div className="homePage__container">
          <section className="homePage__userLoggedProfile">
            Logged user profile
            <div>
              First name: {userState.userLogged.firstName ?? "No user logged"}
            </div>
            <div>Last name: {userState.userLogged.lastName ?? ""}</div>
            <div>Email: {userState.userLogged.email ?? ""}</div>
            <div>Language: {userState.userLogged.language ?? ""}</div>
            <div>Rol: {userState.userLogged.role ?? ""}</div>
            <div className="homePage__token">
              Token at userState: {userState.userLoggedToken}
            </div>
            <div className="homePage__token">
              Token at localStorage: {tokenERP}
            </div>
          </section>{" "}
          {userState.userLogged.email ? (
            <></>
          ) : (
            <Link to="/">
              <button className="homePage__button">Go to Login form</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
