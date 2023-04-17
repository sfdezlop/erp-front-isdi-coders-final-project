import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./errorlog.css";
import { Link } from "react-router-dom";
import { initialState as initialUserState } from "../../reducers/user.slice";

export function ErrorLog() {
  const errorLogArray = useSelector(
    (state: RootState) => state.appState.errorLog
  );

  const userLoggedTokenData = useSelector(
    (state: RootState) => state.userState.userLoggedToken
  );

  if (userLoggedTokenData === initialUserState.userLoggedToken) {
    return (
      <>
        <Link to="/">Please login to see data</Link>
      </>
    );
  } else {
    return (
      <>
        <div className="errorLog_errorContainer">
          <p className="errorLog__error">
            {"User: " + errorLogArray[errorLogArray.length - 1].user}
          </p>
          <p className="errorLog__error">
            <Link to={errorLogArray[errorLogArray.length - 1].origin}>
              {"Origin: " + errorLogArray[errorLogArray.length - 1].origin}
            </Link>
          </p>
          <p className="errorLog__error">
            {"Error Date: " + errorLogArray[errorLogArray.length - 1].date}
          </p>
          <p className="errorLog__error">
            {"Error Name: " + errorLogArray[errorLogArray.length - 1].errorName}
          </p>
          <p className="errorLog__error">
            {"Error Message: " +
              errorLogArray[errorLogArray.length - 1].errorMessage}
          </p>
          <p className="errorLog__error">
            {"Error Cause: " +
              errorLogArray[errorLogArray.length - 1].errorCause}
          </p>
          <p className="errorLog__error">
            {"Error Stack: " +
              errorLogArray[errorLogArray.length - 1].errorStack}
          </p>
        </div>
      </>
    );
  }
}
