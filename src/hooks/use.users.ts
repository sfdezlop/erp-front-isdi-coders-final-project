import { useDispatch, useSelector } from "react-redux";
import { UserStructure } from "../models/user.model";
import { UsersRepo } from "../services/repositories/user.repo";
import { AppDispatch, RootState } from "../store/store";
import {
  initialState as initialUserState,
  loginGallery,
  loginToken,
  loginUser,
  logoutToken,
} from "../reducers/user.slice";
import { useApp } from "./use.app";

export function useUsers(repo: UsersRepo) {
  const userLoggedToken = useSelector(
    (state: RootState) => state.userState.userLoggedToken
  );

  const dispatch = useDispatch<AppDispatch>();

  const { addError } = useApp();

  const userLogin = async (loginForm: Partial<UserStructure>) => {
    try {
      const serverLoginResponse: any = await repo.readTokenAndUser(
        loginForm,
        "users/login"
      );

      await dispatch(loginToken(serverLoginResponse.results[0]));
      await dispatch(loginUser(serverLoginResponse.results[1]));
      await localStorage.setItem("tokenERP", userLoggedToken);

      const serverGalleryResponse: any = await repo.readGallery(
        localStorage.token,
        "users"
      );
      await dispatch(loginGallery(serverGalleryResponse.results));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/home");
    }
  };

  const userLoginWithToken = async (
    tokenAtLocalStorage: string,
    urlExtraPath: string
  ) => {
    try {
      const serverResponse: any = await repo.loginWithToken(
        tokenAtLocalStorage,
        urlExtraPath
      );

      await dispatch(loginToken(serverResponse.results[0]));
      await dispatch(loginUser(serverResponse.results[1]));
      await localStorage.setItem("tokenERP", userLoggedToken);

      const serverGalleryResponse: any = await repo.readGallery(
        localStorage.token,
        "users"
      );
      await dispatch(loginGallery(serverGalleryResponse.results));
    } catch (error) {
      localStorage.setItem("tokenERP", initialUserState.userLoggedToken);
      console.error((error as Error).message);
      addError(error as Error, "/home");
    }
  };

  const userLogout = () => {
    try {
      dispatch(logoutToken(initialUserState.userLoggedToken));
      dispatch(loginUser(initialUserState.userLogged));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/home");
    }
  };

  return {
    loginToken,
    loginUser,
    loginGallery,
    logoutToken,
    userLogin,
    userLoginWithToken,
    userLogout,
  };
}
