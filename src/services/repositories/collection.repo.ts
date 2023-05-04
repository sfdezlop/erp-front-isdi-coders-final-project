import { url_def } from "../../config";
import {
  CollectionStructure,
  QueryInputCollectionStructure,
} from "../../models/collections.model";

export class CollectionsRepo {
  url: string;

  constructor() {
    this.url = url_def;
  }

  async read(
    queryInput: QueryInputCollectionStructure,
    token: string
  ): Promise<Partial<CollectionStructure>[]> {
    const url = encodeURI(
      this.url +
        "/collections/read/&collection=" +
        queryInput.filterCollection +
        "&filterfield=" +
        queryInput.filterField +
        "&filtervalue=" +
        queryInput.filterValue +
        "&searchfield=" +
        queryInput.searchField +
        "&searchvalue=" +
        queryInput.searchValue +
        "&searchtype=" +
        queryInput.searchType +
        "&queryset=" +
        queryInput.querySet +
        "&queryrecordsperset=" +
        queryInput.queryRecordsPerSet +
        "&orderfield=" +
        queryInput.orderField +
        "&ordertype=" +
        queryInput.orderType
    );

    console.log(url);
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading collection ${queryInput.filterCollection}: ${resp.status} ${resp.statusText}`
      );

    const data: Partial<CollectionStructure>[] = await resp.json();

    return data;
  }
}
