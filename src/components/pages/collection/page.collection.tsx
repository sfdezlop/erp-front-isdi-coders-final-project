import "./page.collection.css";
import { useEffect, useState } from "react";
import { Loader } from "../../loader/loader";
import { QueryCollection } from "../../queries/query.collection/query.collection";
import { CollectionsGallery } from "../../galleries/gallery.collections";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCollections } from "../../../hooks/use.collections";
import { CollectionsRepo } from "../../../services/repositories/collection.repo";
import { useLocation } from "react-router-dom";
import {
  navigationURIToQueryPage,
  queryInputForANavigationURI,
} from "../../../services/helpers/functions";
import { initialState as initialUserState } from "../../../reducers/user.slice";
import { UsersRepo } from "../../../services/repositories/user.repo";
import { useUsers } from "../../../hooks/use.users";

const componentFile = "page.collection.tsx";
export default function CollectionPage() {
  const location = useLocation();
  const [renderNumber, setRenderNumber] = useState(1);

  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const userState = useSelector((state: RootState) => state.userState);

  const queryCollectionPropsInput = navigationURIToQueryPage(
    collectionState.queryInput
  );

  const repoCollection = new CollectionsRepo();

  const {
    updateQueryFields,
    updateTranslations,
    updateAppCollectionFields,
    updateQueryInput,
  } = useCollections(repoCollection);

  const repoUser = new UsersRepo();

  const { userLoginWithToken } = useUsers(repoUser);

  // To warranty navigation throw pages fetching a new query to the server on each render. If there is no synchronization between location.pathname and collectionState.queryInput, it force to update collectionState.queryInput to the correspondent parameters if location.pathname.
  if (
    location.pathname === navigationURIToQueryPage(collectionState.queryInput)
  ) {
  } else {
    if (
      renderNumber <= 2 &&
      userState.userLoggedToken !== initialUserState.userLoggedToken
    )
      // userLoginWithToken(localStorage.tokenERP, "users/login-with-token");
      updateQueryInput(
        queryInputForANavigationURI(location.pathname),
        "synchronization"
      );
  }

  useEffect(() => {
    if (renderNumber === 1) {
      updateQueryFields("componentFile_" + componentFile + "_line_61");
      updateTranslations("componentFile_" + componentFile + "_line_61");
      updateAppCollectionFields("componentFile_" + componentFile + "_line_61");
      updateQueryInput(
        collectionState.queryInput,
        "componentFile_" + componentFile + "_line_61"
      );
    }
    setRenderNumber(renderNumber + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (renderNumber === 1) return <Loader></Loader>;

  return (
    <>
      <div
        className="collectionPage"
        key={"div" + collectionState.queryInput.filterCollection}
      >
        <QueryCollection
          queryCollectionProps={queryCollectionPropsInput}
          key={"QueryCollection" + collectionState.queryInput.filterCollection}
        ></QueryCollection>
        {/* <div>{location.pathname}</div>
        <div>{navigationURIToQueryPage(collectionState.queryInput)}</div>
        <div>{updatedData}</div> */}
        <CollectionsGallery
          key={
            "CollectionsGallery" + collectionState.queryInput.filterCollection
          }
        ></CollectionsGallery>
      </div>
    </>
  );
}
