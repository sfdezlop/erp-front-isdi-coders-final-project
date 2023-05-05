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
      dispatch(queryInput(queryInputFormObject));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, appState.urlPage);
    }
  };

  const updateQueryOutput = (
    queryOutputData: QueryOutputCollectionStructure
  ) => {
    dispatch(queryOutput(queryOutputData));
  };

  return {
    updateQueryInput,
    updateQueryOutput,
    queryInput,
    queryOutput,
  };
}
