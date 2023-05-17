import { useDispatch } from "react-redux";
import {
  TranslationStructure,
  UserStructure,
} from "../models/collections.model";
import { CollectionStructure } from "../models/collections.model";
import { UsersRepo } from "../services/repositories/user.repo";
import { CollectionsRepo } from "../services/repositories/collection.repo";

import { AppDispatch } from "../store/store";
import {
  initialState as initialUserState,
  loginGallery,
  loginToken,
  loginUser,
  logoutToken,
} from "../reducers/user.slice";

// import {
//   initialState as initialCollectionState,
//   translations,
//   appCollectionFields,
// } from "../reducers/collection.slice";
import { useApp } from "./use.app";
// import { useCollections } from "./use.collections";

// const componentFile = "use.users.tsx";

export function useUsers(repo: UsersRepo) {
  // const repoCollection = new CollectionsRepo();
  // const { updateTranslations, updateAppCollectionFields } =
  //   useCollections(repoCollection);
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
      await localStorage.setItem("tokenERP", serverLoginResponse.results[0]);
      const serverGalleryResponse: any = await repo.readGallery(
        localStorage.token,
        "users"
      );
      await dispatch(loginGallery(serverGalleryResponse.results));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/home");
    }

    // updateTranslations("componentFile_" + componentFile + "_line_78");
    // updateAppCollectionFields("componentFile_" + componentFile + "_line_78");
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
      await localStorage.setItem("tokenERP", serverResponse.results[0]);

      await dispatch(loginGallery(serverResponse.results[2]));
    } catch (error) {
      localStorage.setItem("tokenERP", initialUserState.userLoggedToken);
      console.error((error as Error).message);
      addError(error as Error, "/home");
    }

    // updateTranslations("componentFile_" + componentFile + "_line_78");
    // updateAppCollectionFields("componentFile_" + componentFile + "_line_78");
  };

  const userLogout = () => {
    dispatch(logoutToken(initialUserState.userLoggedToken));
    dispatch(loginUser(initialUserState.userLogged));
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
