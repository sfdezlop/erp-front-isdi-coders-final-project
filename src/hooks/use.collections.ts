import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { queryInput, queryOutput } from "../reducers/collection.slice";
import { useApp } from "./use.app";
import { CollectionsRepo } from "../services/repositories/collection.repo";
import {
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
} from "../models/collections.model";

export function useCollections(repo: CollectionsRepo) {
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const userState = useSelector((state: RootState) => state.userState);
  const appState = useSelector((state: RootState) => state.appState);
  const dispatch = useDispatch<AppDispatch>();
  const tokenAtUserState = userState.userLoggedToken;
  const tokenToUse = tokenAtUserState;

  const { addError } = useApp();

  const updateQueryInput = async (
    queryInputFormObject: QueryInputCollectionStructure
  ) => {
    try {
      await repo.read(queryInputFormObject, tokenToUse);
      await dispatch(queryInput(queryInputFormObject));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, appState.urlPage);
    }
  };

  const updateQueryOutput = async (
    queryOutputData: QueryOutputCollectionStructure
  ) => {
    try {
      await dispatch(queryOutput(queryOutputData));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, appState.urlPage);
    }
  };

  return {
    updateQueryInput,
    updateQueryOutput,
    queryInput,
    queryOutput,
  };
}
