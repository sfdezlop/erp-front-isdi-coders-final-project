import "./footer.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { url_def } from "../../config";

export function Footer() {
  const firstName = useSelector(
    (state: RootState) => state.userState.userLogged.firstName
  );
  const lastName = useSelector(
    (state: RootState) => state.userState.userLogged.lastName
  );
  const page = useSelector((state: RootState) => state.appState.urlPage);
  const errorLogData = useSelector(
    (state: RootState) => state.appState.errorLog
  );

  return (
    <>
      <div className="footer__container">
        <div className="footer__connection">
          <h2 className="connection__user">
            {"User logged: " + firstName + " " + lastName}
          </h2>
          <p className="connection__server">{"Server: " + url_def}</p>
          <p className="connection__url">{"Page: " + page}</p>
        </div>
        <div className="footer__error">
          <p>
            {"Last Date Error: " + errorLogData[errorLogData.length - 1].date}{" "}
          </p>
          <p>
            {"Error: " + errorLogData[errorLogData.length - 1].errorMessage}{" "}
          </p>
        </div>
      </div>
    </>
  );
}
