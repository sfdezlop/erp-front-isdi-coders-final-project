import { url_def } from "../../config";
import {
  CalculatedQueryCollectionStructure,
  GroupByQueryCollectionStructure,
  GroupBySetQueryCollectionStructure,
  MeasureQueryCollectionStructure,
  QueryInputCollectionStructure,
  ReadRecordFieldValueStructure,
} from "../../models/collections.model";

export class CollectionsRepo {
  url: string;

  constructor() {
    this.url = url_def;
  }

  async calculate(
    query: CalculatedQueryCollectionStructure,
    token: string,
    controlInfo: string
  ): Promise<{
    results: {
      collection: string;
      documentId: string;
      operation: string;
      firstOperandField: string;
      secondOperandField: string;
      result: string;
      resultStatus: string;
    }[];
  }> {
    const url = encodeURI(
      this.url +
        "/collections/calculations/&collection=" +
        query.collection +
        "&documentid=" +
        query.documentId +
        "&operation=" +
        query.operation +
        "&firstoperandfield=" +
        query.firstOperandField +
        "&secondtoperandfield=" +
        query.secondOperandField +
        "&controlinfo=" +
        controlInfo
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
        `Error http obtaining calculated field of ${query.operation} at collection ${query.collection}: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }
  async groupBy(
    query: GroupByQueryCollectionStructure,
    token: string,
    controlInfo: string
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
        query.aggregateSumField +
        "&controlinfo=" +
        controlInfo
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
    token: string,
    controlInfo: string
  ): Promise<{ results: string[] }> {
    const url = encodeURI(
      this.url +
        "/collections/groupbyset/&collection=" +
        query.filterCollection +
        "&groupbyfield=" +
        query.groupByField +
        "&controlinfo=" +
        controlInfo
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

  async measure(
    query: MeasureQueryCollectionStructure,
    token: string,
    controlInfo: string
  ): Promise<{
    results: {
      measure: string;
      measureDescription: string;
      measureLabel: string;
      measureInput: string;
      measureOutput: number;
      measureUnits: string;
      measureStatus: string;
    }[];
  }> {
    const url = encodeURI(
      this.url +
        "/collections/measures/&measure=" +
        query.measure +
        "&measureinput=" +
        query.measureInput +
        "&controlinfo=" +
        controlInfo
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
        `Error http obtaining the set of values of measure ${query.measure}: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readRecords(
    query: Partial<QueryInputCollectionStructure>,

    //Pending: review to a Total QueryInputCollectionStructure instead of Partial

    token: string,
    controlInfo: string
  ): Promise<{ results: [] }> {
    const url = encodeURI(
      this.url +
        "/collections/readrecords/&collection=" +
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
        query.orderType +
        "&controlinfo=" +
        controlInfo
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
        `Error http reading records at collection ${query.filterCollection}: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }
  async view(
    query: ReadRecordFieldValueStructure,
    token: string,
    controlInfo: string
  ): Promise<{
    results: {
      inputCollection: string;
      inputFieldName: string;
      inputFieldValue: string;
      outputFieldName: string;
      outputFieldValue: string;
      outputStatus: string;
    }[];
  }> {
    const url = encodeURI(
      this.url +
        "/collections/views/&collection=" +
        query.collection +
        "&searchfield=" +
        query.searchField +
        "&searchvalue=" +
        query.searchValue +
        "&outputfieldname=" +
        query.outputFieldName +
        "&controlinfo=" +
        controlInfo
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
        `Error http viewing record field value at collection ${query.collection} for field ${query.outputFieldName} corresponding to record where ${query.searchField} is equal to ${query.searchValue}: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }
}
