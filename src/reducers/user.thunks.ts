import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersRepo } from "../services/repositories/user.repo";
import { UserServerResponseType } from "../models/serverresponse.model";

export const asyncLoadUsersGallery = createAsyncThunk<
  UserServerResponseType,
  { token: string; urlExtraPath: string; repo: UsersRepo }
>("user/loginGallery", async ({ token, urlExtraPath, repo }) => {
  const response = await repo.readGallery(token, urlExtraPath);
  // The value we return becomes the `fulfilled` action payload
  return response;
});
