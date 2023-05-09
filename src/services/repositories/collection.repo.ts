import { url_def } from "../../config";
import {
  CollectionStructure,
  GroupByQueryCollectionStructure,
  GroupBySetQueryCollectionStructure,
  QueryInputCollectionStructure,
} from "../../models/collections.model";

export class CollectionsRepo {
  url: string;

  constructor() {
    this.url = url_def;
  }

  async read(
    query: QueryInputCollectionStructure,
    token: string
  ): Promise<{ results: [] }> {
    const url = encodeURI(
      this.url +
        "/collections/read/&collection=" +
        query.filterCollection +
        "&filterfield=" +
        query.filterField +
        "&filtervalue=" +
        query.filterValue +
        "&searchfield=" +
        query.searchField +
        "&searchvalue=" +
        query.searchValue +
        "&searchtype=" +
        query.searchType +
        "&queryset=" +
        query.querySet +
        "&queryrecordsperset=" +
        query.queryRecordsPerSet +
        "&orderfield=" +
        query.orderField +
        "&ordertype=" +
        query.orderType
    );

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading collection ${query.filterCollection}: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async groupBy(
    query: GroupByQueryCollectionStructure,
    token: string
  ): Promise<{
    results: { _id: string; documents: number; aggregateSumValue: number }[];
  }> {
    const url = encodeURI(
      this.url +
        "/collections/groupby/&collection=" +
        query.filterCollection +
        "&firstgroupbyfield=" +
        query.firstGroupByField +
        "&secondgroupbyfield=" +
        query.secondGroupByField +
        "&searchfield=" +
        query.searchField +
        "&searchvalue=" +
        query.searchValue +
        "&searchtype=" +
        query.searchType +
        "&aggregatesumfield=" +
        query.aggregateSumField
    );

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http grouping by collection ${query.filterCollection}: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async groupBySet(
    query: GroupBySetQueryCollectionStructure,
    token: string
  ): Promise<{ results: string[] }> {
    const url = encodeURI(
      this.url +
        "/collections/groupbyset/&collection=" +
        query.filterCollection +
        "&groupbyfield=" +
        query.groupByField
    );

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http obtaining grouped set of values of collection ${query.filterCollection}: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }
}
