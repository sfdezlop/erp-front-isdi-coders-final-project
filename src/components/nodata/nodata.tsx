import { useRef, useState } from "react";
import "./nodata.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { initialState as initialUserState } from "../../reducers/user.slice";
import { Link } from "react-router-dom";
export function NoData() {
  // const [noDataMessage, setNoDataMessage] = useState(
  //   "Sorry, we haven`t found the data you are looking for. Please change the arguments of your query."
  // );

  const noDataMessageVar = useRef(
    "Sorry, we haven`t found the data you are looking for. Please change the arguments of your query."
  );

  const userState = useSelector((state: RootState) => state.userState);
  if (userState.userLoggedToken === initialUserState.userLoggedToken)
    noDataMessageVar.current = "Please login to see data";
  // setNoDataMessage("Please login to see data");

  return (
    <>
      <div className={"noData__container"}>
        <img
          className={"noData__image"}
          src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1684516984~exp=1684517584~hmac=5f4ebde1ef5d6ae87fad3f1da34b98e6ea6eae54187e048053d42b90dcc4194f"
          alt="no data"
        />

        <div className={"noData__message"}>{noDataMessageVar.current}</div>
        {userState.userLoggedToken === initialUserState.userLoggedToken ? (
          <Link to="/">
            <button className="noData__button">Go to Login form</button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
