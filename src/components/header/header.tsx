import { Menu } from "../menu/menu";
import "./header.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { menuOptions } from "../../components/menu/menu";
import { SyntheticEvent } from "react";
import { useUsers } from "../../hooks/use.users";
import { UsersRepo } from "../../services/repositories/user.repo";
import { Link, useNavigate } from "react-router-dom";
import { initialState as initialUserState } from "../../reducers/user.slice";

export function Header() {
  const repoUser = new UsersRepo();
  const { userLogout } = useUsers(repoUser);
  const navigate = useNavigate();

  const userState = useSelector((state: RootState) => state.userState);

  const handlerClick = (event: SyntheticEvent) => {
    userLogout();
    navigate("/");
  };

  return (
    <header className="header">
      <div>
        <h1 className="header__logoCompany">
          <Link to="/">ERP</Link>
        </h1>
      </div>
      <nav className="header__menu">
        <Menu options={menuOptions}></Menu>
      </nav>
      <div className="header__initialAndLogout">
        <div className="header__userLoggedInitials">
          {userState.userLogged.firstName +
            " (" +
            userState.userLogged.language +
            ")"}
        </div>

        {userState.userLoggedToken !== initialUserState.userLoggedToken ||
        localStorage.tokenERP !== initialUserState.userLoggedToken ? (
          <div className="header__logout" onClick={handlerClick}>
            logout
          </div>
        ) : (
          <div className="header__login" onClick={handlerClick}>
            login
          </div>
        )}
      </div>
    </header>
  );
}
