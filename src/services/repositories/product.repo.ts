import { ProductStructure } from "../../models/collections.model";

import { ProductServerResponseType } from "../../models/serverresponse.model";
import { url_def } from "../../config";

export type Filter = {
  filterField?: string;
  filterValue?: string;
  filterSet?: number;
  filterRecordsPerSet?: number;
  orderField?: string;
  orderType?: string;
};

export class ProductsRepo {
  url: string;
  constructor() {
    this.url = url_def;
  }

  async readFilteredGallery(
    token: string,
    urlExtraPath: string,
    filter: Filter
  ): Promise<ProductServerResponseType> {
    const url = this.url + "/" + urlExtraPath;
    let filterObject;
    filter.filterValue === "(select all)"
      ? (filterObject = {
          filterSet: filter.filterSet,
          filterRecordsPerSet: filter.filterRecordsPerSet,
          orderField: filter.orderField,
          orderType: filter.orderType,
        })
      : (filterObject = {
          filterField: filter.filterField,
          filterValue: filter.filterValue,
          filterSet: filter.filterSet,
          filterRecordsPerSet: filter.filterRecordsPerSet,
          orderField: filter.orderField,
          orderType: filter.orderType,
        });

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(filterObject),
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading products gallery: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readFilteredCount(
    token: string,
    urlExtraPath: string,
    filter: Filter
  ): Promise<number> {
    const url = this.url + "/" + urlExtraPath;
    let filterObject;
    filter.filterValue === "(select all)"
      ? (filterObject = {})
      : (filterObject = {
          filterField: filter.filterField,
          filterValue: filter.filterValue,
        });

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(filterObject),
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading the filtered count of products: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readDetailById(
    token: string,
    urlExtraPath: string
  ): Promise<ProductServerResponseType> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http reading product detail by id: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readDetailByKeyValue(
    token: string,
    urlExtraPathId: string
  ): Promise<ProductServerResponseType> {
    const url = this.url + "/" + urlExtraPathId;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http reading product detail by key value: ${resp.status} ${resp.statusText}`
      );

    const data: ProductServerResponseType = await resp.json();

    return data;
  }

  async readGroupsByField(
    token: string,
    urlExtraPath: string,
    field: string
  ): Promise<ProductServerResponseType> {
    const url = this.url + "/" + urlExtraPath + "/" + field;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading product detail: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async create(
    token: string,
    newProduct: Partial<ProductStructure>
  ): Promise<ProductServerResponseType> {
    const url = this.url + "/products";

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http adding a product: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async deleteByKey(
    tokenToUse: string,
    key: string,
    value: string
  ): Promise<void> {
    // When the key is id, its necessary to indicate _id in the fetch action
    const url = this.url + "/products/" + key + "/" + value;

    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenToUse,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http deleting a product: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async deleteById(tokenToUse: string, id: string): Promise<void> {
    const url = this.url + "/products/" + id;

    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenToUse,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http deleting a product: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async microserviceQueryByKeyValue(
    token: string,
    urlExtraPathId: string
  ): Promise<string[]> {
    const url = this.url + "/" + urlExtraPathId;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http reading product detail by key value: ${resp.status} ${resp.statusText}`
      );

    const data: ProductServerResponseType = await resp.json();

    return data.results;
  }
}
