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

  return (
    <>
      <div className="footer">
        <h2>{"Name: " + firstName + " " + lastName}</h2>
        <p>{"Server: " + url_def}</p>
        <p>{"Page: " + page}</p>
      </div>
    </>
  );
}
