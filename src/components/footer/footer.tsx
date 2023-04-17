import "./footer.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
        <p>{"Name: " + firstName + " " + lastName}</p>
        <p>{"Page: " + page}</p>
      </div>
    </>
  );
}
