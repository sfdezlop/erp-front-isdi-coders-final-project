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
        <div className="footer__connectionServer">
          {"Connection Server: " + url_def}
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
