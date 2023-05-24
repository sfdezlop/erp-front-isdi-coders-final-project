import "./footer.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { url_def } from "../../config";

export function Footer() {
  const errorLogData = useSelector(
    (state: RootState) => state.appState.errorLog
  );

  return (
    <>
      <div className="footer__container">
        <h2 className="footer__connectionServer">
          {"Connection Server: " + url_def}
        </h2>
        <div className="footer__error">
          <p>
            {"Last Server Error: " + errorLogData[errorLogData.length - 1].date}{" "}
          </p>
          <p>
            {"Server error message: " +
              errorLogData[errorLogData.length - 1].errorMessage}{" "}
          </p>
        </div>
      </div>
    </>
  );
}
