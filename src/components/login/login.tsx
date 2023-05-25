/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { UserStructure } from "../../models/collections.model";
import { UsersRepo } from "../../services/repositories/user.repo";
import "./login.css";
import { initialState as initialUserState } from "../../reducers/user.slice";

export function Login() {
  const repoUser = useMemo(() => new UsersRepo(), []);

  const navigate = useNavigate();

  const { userLogin, userLoginWithToken } = useUsers(repoUser);

  useEffect(() => {
    if (localStorage.tokenERP !== initialUserState.userLoggedToken) {
      userLoginWithToken(localStorage.tokenERP, "users/login-with-token");
      navigate("/home");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //The test loops when the deps array is removed, even if it is void

  const handlerSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formUSer = event.currentTarget;

    const loginForm: Partial<UserStructure> = {
      email: (formUSer.elements[0] as HTMLFormElement).value,
      passwd: (formUSer.elements[1] as HTMLFormElement).value,
    };

    const saveTokenAtLocalStorage = (formUSer.elements[2] as HTMLFormElement)
      .checked;

    await userLogin(loginForm, saveTokenAtLocalStorage);

    navigate("/home");

    //Making handler async, the performance of the app is better, solving the problem of render the token al localStorage in /home. I have change it to async following recommendation of sonar to solve bug
  };
  return (
    <div className="login">
      <form onSubmit={handlerSubmit} className="login__form">
        <h1 className="login__title">Log In to ERP</h1>
        <label className="login__label">
          <div className="login__label">
            Email (try with sfdezlop@gmail.com)
          </div>
          <input
            type="email"
            name="email"
            placeholder="Enter your corporative email address"
            className="login__input"
            autoComplete=""
            required
          />
        </label>
        <label className="login__label">
          <div className="login__label"> Password (try with santiago)</div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login__input"
            autoComplete=""
            required
            role="textbox"
          />
        </label>
        <div className="login__keepCheckbox">
          <label>
            <input type="checkbox" defaultChecked />
            Remind me for 24 hours
          </label>
        </div>

        <button type="submit" className="login__button">
          Log In
        </button>
      </form>
    </div>
  );
}
