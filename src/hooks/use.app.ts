import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addErrorLog, updateUrlPage } from "../reducers/app.slice";
import { useNavigate } from "react-router-dom";

export function useApp() {
  const navigate = useNavigate();
  const userLoggedData = useSelector(
    (state: RootState) => state.userState.userLogged
  );

  const dispatch = useDispatch<AppDispatch>();

  const addError = (error: Error, origin: string) => {
    dispatch(
      addErrorLog({
        date: new Date().toString(),
        user: userLoggedData.email,
        origin: origin,
        errorName: error.name,
        errorStack: "" + error.stack,
        errorMessage: error.message,
        errorCause: "" + error.cause,
      })
    );
    navigate("/errorlog");
  };

  const updateUrl = (url: string) => {
    dispatch(updateUrlPage(url));
  };

  return {
    addError,
    updateUrl,
    addErrorLog,
    updateUrlPage,
  };
}
