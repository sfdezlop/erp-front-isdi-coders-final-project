import { url_def } from "../../config";
import { StoreLogServerResponseType } from "../../models/serverresponse.model";
import { StoreLogStructure } from "../../models/storelog.model";

export class StoreLogRepo {
  url: string;
  constructor() {
    this.url = url_def;
  }

  async create(
    token: string,
    newStoreLog: Partial<StoreLogStructure>
  ): Promise<StoreLogServerResponseType> {
    const url = this.url + "/storelog";

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newStoreLog),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http adding a store log: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }
}
