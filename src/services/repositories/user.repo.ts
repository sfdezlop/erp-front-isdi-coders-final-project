import { UserServerResponseType, UserStructure } from "../../models/user.model";
import { url_def } from "../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ProductStructure } from "../../models/product.model";

export class UsersRepo {
  url: string;
  constructor() {
    this.url = url_def;
  }

  async readTokenAndUser(
    loginForm: Partial<UserStructure>,
    urlExtraPath: string
  ): Promise<UserServerResponseType> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http reading user token and user data: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readGallery(
    token: string,
    urlExtraPath: string
  ): Promise<UserServerResponseType> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading user gallery: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async loginWithToken(
    tokenAtLocalStorage: string,
    urlExtraPath: string
  ): Promise<UserServerResponseType> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ token: tokenAtLocalStorage }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + tokenAtLocalStorage,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http trying to login with token: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }
}
