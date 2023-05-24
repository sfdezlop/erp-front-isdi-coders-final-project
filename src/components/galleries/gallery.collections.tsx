import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./gallery.collections.css";
import { CollectionsRepo } from "../../services/repositories/collection.repo";
import { useCollections } from "../../hooks/use.collections";
import {
  maximumValueOfAPropertyInAnArrayOfObjects,
  orderByPropertyAnArrayOfObjects,
} from "../../services/helpers/functions";
import { Link, useNavigate } from "react-router-dom";
import { SyntheticEvent } from "react";
import { QueryInputCollectionStructure } from "../../models/collections.model";
import { navigationURIToQueryPage } from "../queries/query.collection/query.collection";
import { recordsPerSet } from "../../reducers/collection.slice";
import { stringSeparator } from "../../config";
import { MicroServiceViewCollection } from "../microservices/microservices.collection/microservice.view.collection";
import { MicroServiceMeasureCollection } from "../microservices/microservices.collection/microservice.measure.collection";
import { MicroServiceCalculatedCollection } from "../microservices/microservices.collection/microservice.calculated.collection";

const componentFile = "gallery.collections.tsx";
//To control the file and line of code where Hook functions are called

export function CollectionsGallery() {
  const navigate = useNavigate();
  const repoCollection = new CollectionsRepo();
  const { translate, updateQueryInput } = useCollections(repoCollection);

  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  let showOrderToUse = "";
  switch (collectionState.queryInput.showType) {
    case "create":
      showOrderToUse = "createShow";
      break;
    case "detail":
      showOrderToUse = "detailShow";
      break;
    case "gallery":
      showOrderToUse = "galleryShow";
      break;
    case "update":
      showOrderToUse = "updateShow";
      break;
    default:
      showOrderToUse = "galleryShow";
  }

  if (collectionState.queryOutput.gallery.length === 0)
    return (
      <>
        <div className={"collectionsGallery__noDataContainer"}>
          <img
            className={"collectionsGallery__noDataImage"}
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1684516984~exp=1684517584~hmac=5f4ebde1ef5d6ae87fad3f1da34b98e6ea6eae54187e048053d42b90dcc4194f"
            alt="no data"
          />

          <div className={"collectionsGallery__noDataText"}>
            Sorry, we haven`t found the data you are looking for. Please change
            the arguments of your query.
          </div>
        </div>
      </>
    );

  //Defensive code when queryOutput.gallery have no records so it is not possible to their Object.keys and Object.values

  const galleryCopy = Object.assign(collectionState.queryOutput.gallery);
  //Mutable copy of collectionState.queryOutput.gallery

  const recordSchemaFieldsFunction = (i: number): string[] => {
    return Object.keys(galleryCopy[i]);
  };
  const recordsSchemaFieldsFunction = galleryCopy.map((item: number) => {
    return recordSchemaFieldsFunction(galleryCopy.indexOf(item));
  });
  /* For each record of collectionState.queryOutput.gallery the Object.keys are obtained in two steps, preventing the case of records at collectionState.queryOutput.gallery with different properties from one to another record (possible at non-relational database where the tabular schema of rows and columns is not used): 1) The recordSchemaFieldsFunction function returns the Object keys of each record of galleryCopy, 2) The recordsSchemaFieldsFunction array is generated with the set of arrays of Object key of each record at galleryCopy.

  E.g.:
  galleryCopy =
      [
        {
          sku: 'YT2201',
          shortDescription: 'Classic BIO 17x2.2 g',
          longDescription: 'Infusión Biológica en Bolsitas Classic 17x2.2 g',
          ean: '4012824400047',
          brand: 'Yogi Tea',
          image: 'https://www.mcph.es/code/erp/products/yogi-tea/4012824400047-001.jpg',
          userCreatorEmail: 'juliaroberts@sample.com',
          costPerUnit: 0,
          pricePerUnit: 2.55,
          id: '641900273cdabdb1c8fd17ce'
        },
        {
          sku: 'YT2202',
          shortDescription: 'Himalaya BIO 17x2 g',
          longDescription: 'Infusión Biológica en Bolsitas Himalaya 17x2 g',
          ean: '4012824400092',
          brand: 'Yogi Tea',
          image: 'https://www.mcph.es/code/erp/products/yogi-tea/4012824400092-001.jpg',
          userCreatorEmail: 'johnsmith@sample.com',
          costPerUnit: 2.04,
          pricePerUnit: 0,
          id: '641900273cdabdb1c8fd17cf'
        },
        {
          sku: 'YT2203',
          shortDescription: 'Choco Té BIO 17x2 g',
          longDescription: 'Infusión Biológica en Bolsitas Choco Té  17x2 g',
          ean: '4012824400146',
          brand: 'Yogi Tea',
          image: 'https://www.mcph.es/code/erp/products/yogi-tea/4012824400146-001.jpg',
          userCreatorEmail: 'sfdezlop@gmail.com',
          costPerUnit: 2.04,
          pricePerUnit: 2.55,
          id: '641900273cdabdb1c8fd17d0'
        },
        {
          sku: 'YT2204',
          shortDescription: 'Regaliz BIO 17x1.8 g',
          longDescription: 'Infusión Biológica en Bolsitas Regaliz 17x1.8 g',
          ean: '4012824400191',
          brand: 'Yogi Tea',
          image: 'https://www.mcph.es/code/erp/products/yogi-tea/4012824400191-001.jpg',
          userCreatorEmail: 'sfdezlop@gmail.com',
          costPerUnit: 2.04,
          pricePerUnit: 2.55,
          id: '641900273cdabdb1c8fd17df'
        }
      ]

  recordsSchemaFieldsFunction =
  [['sku', 'shortDescription', 'longDescription', 'ean', 'brand', 'image', 'userCreatorEmail', 'costPerUnit', 'pricePerUnit', 'id'], ['sku', 'shortDescription', 'longDescription', 'ean', 'brand', 'image', 'userCreatorEmail', 'costPerUnit', 'pricePerUnit', 'id'], ['sku', 'shortDescription', 'longDescription', 'ean', 'brand', 'image', 'userCreatorEmail', 'costPerUnit', 'pricePerUnit', 'id'], ['sku', 'shortDescription', 'longDescription', 'ean', 'brand', 'image', 'userCreatorEmail', 'costPerUnit', 'pricePerUnit', 'id']]
  */

  const recordSchemaDataFunction = (i: number): string[] => {
    return Object.values(galleryCopy[i]).map((item) => JSON.stringify(item));
    //Defensive: JSON.stringify for cases when data is an object or contains objects, because we want to save strings that are going to be render in following execution
  };
  const recordsSchemaDataFunction = galleryCopy.map((item: number) => {
    return recordSchemaDataFunction(galleryCopy.indexOf(item));
  });
  /*For each record of collectionState.queryOutput.gallery the Object.values are obtained in two steps, preventing the case of records at collectionState.queryOutput.gallery with different properties from one to another record (possible at non-relational database where the tabular schema of rows and columns is not used): 1) The recordSchemaDataFunction function returns the Object values of each record of galleryCopy, 2) The recordsSchemaDataFunction array is generated with the set of arrays of Object values of each record at galleryCopy.
  E.g.:
  recordsSchemaDataFunction =
  [['"YT2201"', '"Classic BIO 17x2.2 g"', '"Infusión Biológica en Bolsitas Classic 17x2.2 g"', '"4012824400047"', '"Yogi Tea"', '"https://www.mcph.es/code/erp/products/yogi-tea/4012824400047-001.jpg"', '"juliaroberts@sample.com"', '0', '2.55', '"641900273cdabdb1c8fd17ce"'], ['"YT2202"', '"Himalaya BIO 17x2 g"', '"Infusión Biológica en Bolsitas Himalaya 17x2 g"', '"4012824400092"', '"Yogi Tea"', '"https://www.mcph.es/code/erp/products/yogi-tea/4012824400092-001.jpg"', '"johnsmith@sample.com"', '2.04', '0', '"641900273cdabdb1c8fd17cf"'], ['"YT2203"', '"Choco Té BIO 17x2 g"', '"Infusión Biológica en Bolsitas Choco Té  17x2 g"', '"4012824400146"', '"Yogi Tea"', '"https://www.mcph.es/code/erp/products/yogi-tea/4012824400146-001.jpg"', '"sfdezlop@gmail.com"', '2.04', '2.55', '"641900273cdabdb1c8fd17d0"'], ['"YT2204"', '"Regaliz BIO 17x1.8 g"', '"Infusión Biológica en Bolsitas Regaliz 17x1.8 g"', '"4012824400191"', '"Yogi Tea"', '"https://www.mcph.es/code/erp/products/yogi-tea/4012824400191-001.jpg"', '"sfdezlop@gmail.com"', '2.04', '2.55', '"641900273cdabdb1c8fd17df"']]

  Please note how both arrays (recordsSchemaFieldsFunction and recordsSchemaDataFunction) are ordered in the same way (first by record and last by key) thanks to the to Object.key and Object.values and map methods used to create them, in order to assure the congruence of info in later steps.
  */

  let recordsFieldsDataSchemaFieldsArray: {
    collection: string;
    record: number;
    fieldName: string;
    data: string;
    fieldType: string;
    showOrder: number;
    htmlTag: string;
    relatedInfo: string;
  }[] = [];
  /*We are going to transform the array of objects collectionState.queryOutput.gallery in an 'agnostic collection' array of objects which are going to be render, 'exploding' each record of collectionState.queryOutput.gallery in their pair of key/value an adding them new properties that are going to be used in the UI component.
  This recordsFieldsDataSchemaFieldsArray is going to have a number of records of the Cartesian Product of sets A (records/elements of collectionState.queryOutput.gallery) and B (pairs of key/value for each records/elements)

  What do we need to render it?:
  A)
  - collection: collection where it belongs the record of collectionState.queryOutput.gallery
  - record: index of the record at collectionState.queryOutput.gallery
  - fieldName: name of the property of the record with index record at collectionState.queryOutput.gallery
  - data: value for the key fieldName at the record with index record of collectionState.queryOutput.gallery
  All above info is going to be provided, in a first instance (for those fieldType='schema'), by collectionState.queryOutput.gallery.

  B)
  - fieldType: type of field, depending if it is a field that comes from the 'schema' definition of the collection, from a 'calculated' field at the collection (e.g. the gross margin of a product calculated as the subtraction of the price and the cost ), from a 'view' of another collection (e.g. the name of the user at users collection which is related with the userEmailCreator field of a record at products collection) or from a defined 'measure' in the database (e.g. the stock of a product which is figured out using the productmovements collection).
  - showOrder: The order that is going to be used to render one element before each. Its also used to hide from the render those elements that are intended not to be shown.
  - htmlTag: type of html tag that we want to use in the render for this element
  - relatedInfo: structured string in a to allows the app to access to related info or show calculated data or measures previously defined. In coordination with fieldType it deploys enriched data to the render.
  All above info is going to be provided by a collection design for this purpose, the appcollectionfields collection which has the parametric properties of any field of the rest of collection to facilitate their render, and that it is loaded in the app state as appcollectionfields. E.g. for the products collection, the documents at appcollectionfields collection are:

appcollectionfields=
[
  {
        collectionName: 'products',
        fieldName: 'ean',
        fieldType: 'schema',
        fieldShortDescription: 'ean',
        filterable: false,
        searchable: true,
        orderable: true,
        htmlTag: 'div',
        mongoType: 'String',
        createShow: '010',
        detailShow: '010',
        galleryShow: '040',
        updateShow: '010',
        relatedInfo: '',
        id: '646cb5adf139924e09cf6f7f'
      },
      {
        collectionName: 'products',
        fieldName: 'costPerUnit',
        fieldType: 'schema',
        fieldShortDescription: 'cost per unit',
        filterable: false,
        searchable: false,
        orderable: true,
        htmlTag: 'div',
        mongoType: 'Double',
        createShow: '010',
        detailShow: '010',
        galleryShow: '070',
        updateShow: '010',
        relatedInfo: '',
        id: '646cb5adf139924e09cf6f84'
      },
      {
        collectionName: 'products',
        fieldName: 'userCreatorEmail',
        fieldType: 'schema',
        fieldShortDescription: 'user creator email',
        filterable: true,
        searchable: true,
        orderable: true,
        htmlTag: 'div',
        mongoType: 'String',
        createShow: '010',
        detailShow: '010',
        galleryShow: '090',
        updateShow: '010',
        relatedInfo: 'relation_-_products_-_userCreatorEmail_-_users_-_email',
        id: '646cb5adf139924e09cf6f83'
      },
      {
        collectionName: 'products',
        fieldName: 'pricePerUnit',
        fieldType: 'schema',
        fieldShortDescription: 'price per unit',
        filterable: false,
        searchable: false,
        orderable: true,
        htmlTag: 'div',
        mongoType: 'Double',
        createShow: '010',
        detailShow: '010',
        galleryShow: '080',
        updateShow: '010',
        relatedInfo: '',
        id: '646cb5adf139924e09cf6f86'
      },
      {
        collectionName: 'products',
        fieldName: 'longDescription',
        fieldType: 'schema',
        fieldShortDescription: 'long description',
        filterable: false,
        searchable: true,
        orderable: false,
        htmlTag: 'div',
        mongoType: 'String',
        createShow: '010',
        detailShow: '010',
        galleryShow: '060',
        updateShow: '010',
        relatedInfo: '',
        id: '646cb5adf139924e09cf6f81'
      },
      {
        collectionName: 'products',
        fieldName: 'id',
        fieldType: 'schema',
        fieldShortDescription: 'identifier',
        filterable: false,
        searchable: true,
        orderable: false,
        htmlTag: 'div',
        mongoType: 'ObjectId',
        createShow: '010',
        detailShow: '010',
        galleryShow: '010',
        updateShow: '010',
        relatedInfo: '',
        id: '646cb5adf139924e09cf6f7e'
      },
      {
        collectionName: 'products',
        fieldName: 'sku',
        fieldType: 'schema',
        fieldShortDescription: 'sku',
        filterable: true,
        searchable: true,
        orderable: true,
        htmlTag: 'div',
        mongoType: 'String',
        createShow: '010',
        detailShow: '010',
        galleryShow: '030',
        updateShow: '010',
        relatedInfo: '',
        id: '646cb5adf139924e09cf6f82'
      },
      {
        collectionName: 'products',
        fieldName: 'shortDescription',
        fieldType: 'schema',
        fieldShortDescription: 'short description',
        filterable: false,
        searchable: true,
        orderable: true,
        htmlTag: 'div',
        mongoType: 'String',
        createShow: '010',
        detailShow: '010',
        galleryShow: '050',
        updateShow: '010',
        relatedInfo: '',
        id: '646cb5adf139924e09cf6f80'
      },
      {
        collectionName: 'products',
        fieldName: 'brand',
        fieldType: 'schema',
        fieldShortDescription: 'brand',
        filterable: true,
        searchable: true,
        orderable: true,
        htmlTag: 'div',
        mongoType: 'String',
        createShow: '010',
        detailShow: '010',
        galleryShow: '020',
        updateShow: '010',
        relatedInfo: 'relation_-_products_-_brand_-_brands_-_brandName',
        id: '646cb5adf139924e09cf6f8d'
      },
      {
        collectionName: 'products',
        fieldName: 'image',
        fieldType: 'schema',
        fieldShortDescription: 'image',
        filterable: false,
        searchable: true,
        orderable: false,
        htmlTag: 'img',
        mongoType: 'String',
        createShow: '010',
        detailShow: '010',
        galleryShow: '100',
        updateShow: '010',
        relatedInfo: '',
        id: '646cb5adf139924e09cf6f89'
      },
      {
        collectionName: 'products',
        fieldName: 'stock (units)',
        fieldType: 'measure',
        fieldShortDescription: 'stock in units',
        filterable: false,
        searchable: false,
        orderable: false,
        htmlTag: 'div',
        mongoType: 'Number',
        createShow: '000',
        detailShow: '000',
        galleryShow: '500',
        updateShow: '000',
        relatedInfo: 'measure_-_productstockunitsbysku_-_products_-_sku_-_productmovements_-_productSku',
        id: '646cb5adf139924e09cf6fb3'
      },
      {
        collectionName: 'products',
        fieldName: 'user creator name',
        fieldType: 'view',
        fieldShortDescription: 'name of the user that has created the document',
        filterable: false,
        searchable: false,
        orderable: false,
        htmlTag: 'div',
        mongoType: 'String',
        createShow: '000',
        detailShow: '000',
        galleryShow: '490',
        updateShow: '000',
        relatedInfo: 'view_-_products_-_userCreatorEmail_-_users_-_email_-_users_-_firstName',
        id: '646cf2d494896b39fedaae8b'
      },
      {
        collectionName: 'products',
        fieldName: 'grossMarginPerUnit (€)',
        fieldType: 'calculated',
        fieldShortDescription: 'difference between the price per unit and the cost per unit in €',
        filterable: false,
        searchable: false,
        orderable: false,
        htmlTag: 'div',
        mongoType: 'Number',
        createShow: '000',
        detailShow: '000',
        galleryShow: '495',
        updateShow: '000',
        relatedInfo: 'calculated_-_subtraction_-_products_-_pricePerUnit_-_costPerUnit',
        id: '646d118194896b39fedaae90'
      },
      {
        collectionName: 'products',
        fieldName: 'grossMarginPerUnit (% over costPerUnit)',
        fieldType: 'calculated',
        fieldShortDescription: '% over the cost per unit of the difference between the price per unit and the cost per unit in €',
        filterable: false,
        searchable: false,
        orderable: false,
        htmlTag: 'div',
        mongoType: 'Number',
        createShow: '000',
        detailShow: '000',
        galleryShow: '496',
        updateShow: '000',
        relatedInfo: 'calculated_-_percentageoversecondoperand_-_products_-_pricePerUnit_-_costPerUnit',
        id: '646dd664a3c3c7ea125f8d4b'
      },
      {
        collectionName: 'products',
        fieldName: 'grossMarginPerUnit (% over pricePerUnit)',
        fieldType: 'calculated',
        fieldShortDescription: '% over the price per unit of the difference between the price per unit and the cost per unit in €',
        filterable: false,
        searchable: false,
        orderable: false,
        htmlTag: 'div',
        mongoType: 'Number',
        createShow: '000',
        detailShow: '000',
        galleryShow: '497',
        updateShow: '000',
        relatedInfo: 'calculated_-_percentageoverfirstoperand_-_products_-_pricePerUnit_-_costPerUnit',
        id: '646ddd89a3c3c7ea125f8d4c'
      },
    ]
  */

  //Adding 'schema' fields, using appcollectionfields collection. Here are the functions that are going to complete the info at recordsFieldsDataSchemaFieldsArray:
  const recordsGallerySchemaFieldsShowOrderFunction = (
    collection: string,
    fieldName: string
  ): string => {
    if (
      collectionState.appCollectionFields.filter(
        (item) =>
          item.collectionName === collection && item.fieldName === fieldName
      ).length === 0
    ) {
      return "000";
      //If we forget to add the field to appcollectionfields collection, the function gives a "000" value to this field, which is used to hide the field (see below)
    } else {
      switch (showOrderToUse) {
        case "createShow":
          return collectionState.appCollectionFields.filter(
            (item) =>
              item.collectionName === collection && item.fieldName === fieldName
          )[0].createShow;
        case "detailShow":
          return collectionState.appCollectionFields.filter(
            (item) =>
              item.collectionName === collection && item.fieldName === fieldName
          )[0].detailShow;
        case "galleryShow":
          return collectionState.appCollectionFields.filter(
            (item) =>
              item.collectionName === collection && item.fieldName === fieldName
          )[0].galleryShow;
        case "updateShow":
          return collectionState.appCollectionFields.filter(
            (item) =>
              item.collectionName === collection && item.fieldName === fieldName
          )[0].updateShow;
        default:
          return "000";
      }
    }
  };

  const recordsHtmlTagSchemaFieldsFunction = (
    collection: string,
    fieldName: string
  ): string => {
    return collectionState.appCollectionFields.filter(
      (item) =>
        item.collectionName === collection && item.fieldName === fieldName
    ).length === 0
      ? "div"
      : collectionState.appCollectionFields.filter(
          (item) =>
            item.collectionName === collection && item.fieldName === fieldName
        )[0].htmlTag;
  };

  const recordsRelatedInfoSchemaFieldsFunction = (
    collection: string,
    fieldName: string
  ): string => {
    return collectionState.appCollectionFields.filter(
      (item) =>
        item.collectionName === collection && item.fieldName === fieldName
    ).length === 0
      ? ""
      : collectionState.appCollectionFields.filter(
          (item) =>
            item.collectionName === collection && item.fieldName === fieldName
        )[0].relatedInfo;
  };
  for (let i = 0; i < recordsSchemaFieldsFunction.length; i++) {
    for (let j = 0; j < recordsSchemaDataFunction[i].length; j++)
      recordsFieldsDataSchemaFieldsArray.push({
        collection: collectionState.queryInput.filterCollection,
        record: i,
        fieldName: recordsSchemaFieldsFunction[i][j],
        data:
          recordsSchemaDataFunction[i][j].startsWith('"') &&
          recordsSchemaDataFunction[i][j].endsWith('"')
            ? //Defensive hardcode: JSON.stringify always return a " character when it starts with ", but we maintain this additional condition to take care about OS where the JSON.stringify does not work with ")
              recordsSchemaDataFunction[i][j].slice(
                1,
                recordsSchemaDataFunction[i][j].length - 1
              )
            : recordsSchemaDataFunction[i][j],
        fieldType: "schema",
        showOrder:
          1000 +
          1000 * i +
          Number(
            recordsGallerySchemaFieldsShowOrderFunction(
              collectionState.queryInput.filterCollection,
              recordsSchemaFieldsFunction[i][j]
            )
          ),

        //Please note that if we give a value of '000' (value to hide the field) to the e.g. galleryShow field of appcollectionfields collection, this field is going to have a showOrder multiple of 1000 for all the records, which is going to be the condition (see below) to hide the field.
        htmlTag: recordsHtmlTagSchemaFieldsFunction(
          collectionState.queryInput.filterCollection,
          recordsSchemaFieldsFunction[i][j]
        ),
        relatedInfo: recordsRelatedInfoSchemaFieldsFunction(
          collectionState.queryInput.filterCollection,
          recordsSchemaFieldsFunction[i][j]
        ),
      });
  }

  /*As result of the code above, recordsFieldsDataSchemaFieldsArray has this content (in console.table format):
(index)	collection	record	fieldName	data	fieldType	showOrder	htmlTag	relatedInfo
0	'products'	0	'sku'	'YT2201'	'schema'	1030	'div'	''
1	'products'	0	'shortDescription'	'Classic BIO 17x2.2 g'	'schema'	1050	'div'	''
2	'products'	0	'longDescription'	'Infusión Biológica en Bolsitas Classic 17x2.2 g'	'schema'	1060	'div'	''
3	'products'	0	'ean'	'4012824400047'	'schema'	1040	'div'	''
4	'products'	0	'brand'	'Yogi Tea'	'schema'	1020	'div'	'relation_-_products_-_brand_-_brands_-_brandName'
5	'products'	0	'image'	'https://www.mcph.es/code/erp/products/yogi-tea/4012824400047-001.jpg'	'schema'	1100	'img'	''
6	'products'	0	'userCreatorEmail'	'juliaroberts@sample.com'	'schema'	1090	'div'	'relation_-_products_-_userCreatorEmail_-_users_-_email'
7	'products'	0	'costPerUnit'	'0'	'schema'	1070	'div'	''
8	'products'	0	'pricePerUnit'	'2.55'	'schema'	1080	'div'	''
9	'products'	0	'id'	'641900273cdabdb1c8fd17ce'	'schema'	1010	'div'	''
10	'products'	1	'sku'	'YT2202'	'schema'	2030	'div'	''
11	'products'	1	'shortDescription'	'Himalaya BIO 17x2 g'	'schema'	2050	'div'	''
12	'products'	1	'longDescription'	'Infusión Biológica en Bolsitas Himalaya 17x2 g'	'schema'	2060	'div'	''
13	'products'	1	'ean'	'4012824400092'	'schema'	2040	'div'	''
14	'products'	1	'brand'	'Yogi Tea'	'schema'	2020	'div'	'relation_-_products_-_brand_-_brands_-_brandName'
15	'products'	1	'image'	'https://www.mcph.es/code/erp/products/yogi-tea/4012824400092-001.jpg'	'schema'	2100	'img'	''
16	'products'	1	'userCreatorEmail'	'johnsmith@sample.com'	'schema'	2090	'div'	'relation_-_products_-_userCreatorEmail_-_users_-_email'
17	'products'	1	'costPerUnit'	'2.04'	'schema'	2070	'div'	''
18	'products'	1	'pricePerUnit'	'0'	'schema'	2080	'div'	''
19	'products'	1	'id'	'641900273cdabdb1c8fd17cf'	'schema'	2010	'div'	''
20	'products'	2	'sku'	'YT2203'	'schema'	3030	'div'	''
21	'products'	2	'shortDescription'	'Choco Té BIO 17x2 g'	'schema'	3050	'div'	''
22	'products'	2	'longDescription'	'Infusión Biológica en Bolsitas Choco Té 17x2 g'	'schema'	3060	'div'	''
23	'products'	2	'ean'	'4012824400146'	'schema'	3040	'div'	''
24	'products'	2	'brand'	'Yogi Tea'	'schema'	3020	'div'	'relation_-_products_-_brand_-_brands_-_brandName'
25	'products'	2	'image'	'https://www.mcph.es/code/erp/products/yogi-tea/4012824400146-001.jpg'	'schema'	3100	'img'	''
26	'products'	2	'userCreatorEmail'	'sfdezlop@gmail.com'	'schema'	3090	'div'	'relation_-_products_-_userCreatorEmail_-_users_-_email'
27	'products'	2	'costPerUnit'	'2.04'	'schema'	3070	'div'	''
28	'products'	2	'pricePerUnit'	'2.55'	'schema'	3080	'div'	''
29	'products'	2	'id'	'641900273cdabdb1c8fd17d0'	'schema'	3010	'div'	''
30	'products'	3	'sku'	'YT2204'	'schema'	4030	'div'	''
31	'products'	3	'shortDescription'	'Regaliz BIO 17x1.8 g'	'schema'	4050	'div'	''
32	'products'	3	'longDescription'	'Infusión Biológica en Bolsitas Regaliz 17x1.8 g'	'schema'	4060	'div'	''
33	'products'	3	'ean'	'4012824400191'	'schema'	4040	'div'	''
34	'products'	3	'brand'	'Yogi Tea'	'schema'	4020	'div'	'relation_-_products_-_brand_-_brands_-_brandName'
35	'products'	3	'image'	'https://www.mcph.es/code/erp/products/yogi-tea/4012824400191-001.jpg'	'schema'	4100	'img'	''
36	'products'	3	'userCreatorEmail'	'sfdezlop@gmail.com'	'schema'	4090	'div'	'relation_-_products_-_userCreatorEmail_-_users_-_email'
37	'products'	3	'costPerUnit'	'2.04'	'schema'	4070	'div'	''
38	'products'	3	'pricePerUnit'	'2.55'	'schema'	4080	'div'	''
39	'products'	3	'id'	'641900273cdabdb1c8fd17df'	'schema'	4010	'div'	''
*/

  //Now is time to work out the number of records (using a helper function), as the maximum value of property record in the array of objects recordsFieldsDataSchemaFieldsArray and to make an snapshot of it to the subsequent steps. Please note that we can also obtain the number of records asking for the length of collectionState.queryOutput.gallery.

  const records =
    maximumValueOfAPropertyInAnArrayOfObjects(
      recordsFieldsDataSchemaFieldsArray as [],
      "record"
    ) + 1;
  const recordsFieldsDataSchemaFieldsArraySnapshot =
    recordsFieldsDataSchemaFieldsArray.map((item) => item);

  //Adding 'view' fields defined in appcollectionfields collection by pushing records to recordsFieldsDataSchemaFieldsArray. Please note that in data we are going to load info that is going to be used in subsequent steps to show info of other collections thanks to the MicroServiceViewCollection UI component.
  const viewFields = collectionState.appCollectionFields.filter(
    (item) =>
      item.collectionName === collectionState.queryInput.filterCollection &&
      item.fieldType === "view"
  );

  for (let i = 0; i < records; i++) {
    for (let j = 0; j < viewFields.length; j++) {
      recordsFieldsDataSchemaFieldsArray.push({
        collection: viewFields[j].collectionName,
        record: i,
        fieldName: viewFields[j].fieldName,
        data:
          viewFields[j].relatedInfo.split(stringSeparator)[0] +
          stringSeparator +
          viewFields[j].relatedInfo.split(stringSeparator)[1] +
          stringSeparator +
          viewFields[j].relatedInfo.split(stringSeparator)[2] +
          stringSeparator +
          recordsFieldsDataSchemaFieldsArraySnapshot.filter(
            (item) =>
              item.record === i &&
              item.fieldName ===
                viewFields[j].relatedInfo.split(stringSeparator)[2]
          )[0].data +
          stringSeparator +
          viewFields[j].relatedInfo.split(stringSeparator)[3] +
          stringSeparator +
          viewFields[j].relatedInfo.split(stringSeparator)[4] +
          stringSeparator +
          recordsFieldsDataSchemaFieldsArraySnapshot.filter(
            (item) =>
              item.record === i &&
              item.fieldName ===
                viewFields[j].relatedInfo.split(stringSeparator)[2]
          )[0].data +
          stringSeparator +
          viewFields[j].relatedInfo.split(stringSeparator)[5] +
          stringSeparator +
          viewFields[j].relatedInfo.split(stringSeparator)[6],
        fieldType: viewFields[j].fieldType,
        showOrder: 1000 + 1000 * i + Number(viewFields[j].galleryShow),
        htmlTag: viewFields[j].htmlTag,
        relatedInfo: viewFields[j].relatedInfo,
      });
    }
  }

  //Adding 'measure' fields defined in appcollectionfields collection by pushing records to recordsFieldsDataSchemaFieldsArray. Please note that in data we are going to load info that is going to be used in subsequent steps to show info of measures defined in the database thanks to the MicroServiceMeasureCollection UI component.
  const measureFields = collectionState.appCollectionFields.filter(
    (item) =>
      item.collectionName === collectionState.queryInput.filterCollection &&
      item.fieldType === "measure"
  );

  for (let i = 0; i < records; i++) {
    for (let j = 0; j < measureFields.length; j++) {
      recordsFieldsDataSchemaFieldsArray.push({
        collection: measureFields[j].collectionName,
        record: i,
        fieldName: measureFields[j].fieldName,
        data:
          measureFields[j].relatedInfo.split(stringSeparator)[0] +
          stringSeparator +
          measureFields[j].relatedInfo.split(stringSeparator)[1] +
          stringSeparator +
          measureFields[j].relatedInfo.split(stringSeparator)[2] +
          stringSeparator +
          measureFields[j].relatedInfo.split(stringSeparator)[3] +
          stringSeparator +
          recordsFieldsDataSchemaFieldsArraySnapshot.filter(
            (item) =>
              item.record === i &&
              item.fieldName ===
                measureFields[j].relatedInfo.split(stringSeparator)[3]
          )[0].data +
          stringSeparator +
          measureFields[j].relatedInfo.split(stringSeparator)[4] +
          stringSeparator +
          measureFields[j].relatedInfo.split(stringSeparator)[5] +
          stringSeparator +
          recordsFieldsDataSchemaFieldsArraySnapshot.filter(
            (item) =>
              item.record === i &&
              item.fieldName ===
                measureFields[j].relatedInfo.split(stringSeparator)[3]
          )[0].data,
        fieldType: measureFields[j].fieldType,
        showOrder: 1000 + 1000 * i + Number(measureFields[j].galleryShow),
        htmlTag: measureFields[j].htmlTag,
        relatedInfo: measureFields[j].relatedInfo,
      });
    }
  }

  //Adding 'calculated' fields defined in appcollectionfields collection by pushing records to recordsFieldsDataSchemaFieldsArray. Please note that in data we are going to load info that is going to be used in subsequent steps to show info of calculated fields defined for the collection thanks to the MicroServiceCalculatedCollection UI component.
  const calculatedFields = collectionState.appCollectionFields.filter(
    (item) =>
      item.collectionName === collectionState.queryInput.filterCollection &&
      item.fieldType === "calculated"
  );

  for (let i = 0; i < records; i++) {
    for (let j = 0; j < calculatedFields.length; j++) {
      recordsFieldsDataSchemaFieldsArray.push({
        collection: calculatedFields[j].collectionName,
        record: i,
        fieldName: calculatedFields[j].fieldName,
        data:
          calculatedFields[j].relatedInfo.split(stringSeparator)[0] +
          stringSeparator +
          calculatedFields[j].relatedInfo.split(stringSeparator)[1] +
          stringSeparator +
          calculatedFields[j].relatedInfo.split(stringSeparator)[2] +
          stringSeparator +
          calculatedFields[j].relatedInfo.split(stringSeparator)[3] +
          stringSeparator +
          calculatedFields[j].relatedInfo.split(stringSeparator)[4] +
          stringSeparator +
          recordsFieldsDataSchemaFieldsArraySnapshot.filter(
            (item) => item.record === i && item.fieldName === "id"
          )[0].data,
        fieldType: calculatedFields[j].fieldType,
        showOrder: 1000 + 1000 * i + Number(calculatedFields[j].galleryShow),
        htmlTag: calculatedFields[j].htmlTag,
        relatedInfo: calculatedFields[j].relatedInfo,
      });
    }
  }

  //Now is time to order all the fields using a helper function. Here it is also the condition to hide the fields by filtering them by non 1000 multiples
  const recordsFieldsDataArrayToShow: typeof recordsFieldsDataSchemaFieldsArray =
    orderByPropertyAnArrayOfObjects(
      recordsFieldsDataSchemaFieldsArray.filter(
        (item) => item.showOrder % 1000 > 0
      ) as [],
      "showOrder",
      "asc"
    );

  const handlerOnClickLinkedDiv = (event: SyntheticEvent<HTMLDivElement>) => {
    const clickedDiv = event.currentTarget;
    const clickedDivAriaLabel = clickedDiv.ariaLabel ?? "";

    const queryObject: QueryInputCollectionStructure = {
      filterCollection: clickedDivAriaLabel
        .split("/collections/readrecords/&collection=")[1]
        .split("&filterfield=")[0],
      filterField: clickedDivAriaLabel
        .split("&filterfield=")[1]
        .split("&filtervalue=")[0],
      filterValue: clickedDivAriaLabel
        .split("&filtervalue=")[1]
        .split("&searchfield=")[0],
      searchField: clickedDivAriaLabel
        .split("&searchfield=")[1]
        .split("&searchvalue=")[0],
      searchType: clickedDivAriaLabel
        .split("&searchtype=")[1]
        .split("&queryset=")[0],
      searchValue: clickedDivAriaLabel
        .split("&searchvalue=")[1]
        .split("&searchtype=")[0],
      orderField: clickedDivAriaLabel
        .split("&orderfield=")[1]
        .split("&ordertype=")[0],
      orderType: clickedDivAriaLabel
        .split("&ordertype=")[1]
        .split("&controlinfo=")[0],
      queryRecordsPerSet: Number(
        clickedDivAriaLabel
          .split("&queryrecordsperset=")[1]
          .split("&orderfield=")[0]
      ),
      querySet: Number(
        clickedDivAriaLabel
          .split("&queryset=")[1]
          .split("&queryrecordsperset=")[0]
      ),
      showType: collectionState.queryInput.showType,
      showFormat: collectionState.queryInput.showFormat,
    };
    updateQueryInput(
      queryObject,
      "componentFile_" + componentFile + "_line_149"
    );
    navigate(navigationURIToQueryPage(queryObject));
  };

  const recordJSX = (i: number) => {
    let tempArray = [<div key="elementToBeShifted"></div>];

    const recordsFieldsDataArrayFilteredByRecord =
      recordsFieldsDataArrayToShow.filter((item) => item.record === i);

    recordsFieldsDataArrayFilteredByRecord.forEach((item) =>
      tempArray.push(
        <div
          key={
            "record-" +
            i +
            "_keyvalue_" +
            recordsFieldsDataArrayFilteredByRecord.indexOf(item)
          }
        >
          <div className="collectionGalleryCard__fieldData">
            <div
              className="collectionGalleryCard__field"
              title={item.showOrder.toString()}
            >
              {translate(item.fieldName) + ": "}
            </div>
            {(() => {
              switch (item.htmlTag) {
                case "div":
                  switch (
                    item.fieldType +
                    stringSeparator +
                    item.relatedInfo.split(stringSeparator)[0]
                  ) {
                    case "schema" + stringSeparator:
                      //Case of div fieldType=schema with non related info. When the string is empty, split() returns an array containing an empty string, instead of an empty array.

                      return (
                        <div className="collectionGalleryCard__data">
                          {item.data}
                        </div>
                      );
                    case "schema" + stringSeparator + "relation":
                      //Case of div fieldType=schema with related info
                      return (
                        <Link
                          to={encodeURI(
                            "/collections/readrecords/&collection=" +
                              item.relatedInfo.split("_-_")[3] +
                              "&filterfield=" +
                              item.relatedInfo.split("_-_")[4] +
                              "&filtervalue=&searchfield=" +
                              item.relatedInfo.split("_-_")[4] +
                              "&searchvalue=" +
                              item.data +
                              "&searchtype=Exact match&queryset=1&queryrecordsperset=" +
                              recordsPerSet[0] +
                              "&orderfield=" +
                              item.relatedInfo.split("_-_")[4] +
                              "&ordertype=asc&controlinfo="
                          )}
                          className="collectionGalleryCard__link"
                        >
                          <div
                            className="collectionGalleryCard__data"
                            onClick={handlerOnClickLinkedDiv}
                            aria-label={
                              "/collections/readrecords/&collection=" +
                              item.relatedInfo.split("_-_")[3] +
                              "&filterfield=" +
                              item.relatedInfo.split("_-_")[4] +
                              "&filtervalue=&searchfield=" +
                              item.relatedInfo.split("_-_")[4] +
                              "&searchvalue=" +
                              item.data +
                              "&searchtype=Exact match&queryset=1&queryrecordsperset=" +
                              recordsPerSet[0] +
                              "&orderfield=" +
                              item.relatedInfo.split("_-_")[4] +
                              "&ordertype=asc&controlinfo="
                            }
                            title={item.relatedInfo}
                            // To better see the content of item.data which is responsible of passing info to Link and to the handlerOnClickLinkedDiv
                          >
                            {item.data}
                          </div>
                        </Link>
                      );
                    case "calculated" + stringSeparator + "calculated":
                      //Case of div fieldType=calculated
                      return (
                        <>
                          <div
                            className="collectionGalleryCard__data"
                            title={item.data}
                            // To better see the content of item.data which is responsible of passing props to the MicroServiceCalculatedCollection UI component
                          >
                            <MicroServiceCalculatedCollection
                              calculatedInputData={{
                                collection: item.data.split(stringSeparator)[2],
                                documentId: item.data.split(stringSeparator)[5],
                                operation: item.data.split(stringSeparator)[1],
                                firstOperandField:
                                  item.data.split(stringSeparator)[3],
                                secondOperandField:
                                  item.data.split(stringSeparator)[4],
                              }}
                              controlInfo=""
                            ></MicroServiceCalculatedCollection>
                          </div>
                        </>
                      );

                    case "measure" + stringSeparator + "measure":
                      //Case of div fieldType=measure
                      return (
                        <>
                          <div
                            className="collectionGalleryCard__data"
                            title={item.data}
                            // To better see the content of item.data which is responsible of passing props to the MicroServiceViewCollection UI component
                          >
                            <MicroServiceMeasureCollection
                              measureInputData={{
                                measure: item.data.split(stringSeparator)[1],
                                filterName: item.data.split(stringSeparator)[6],
                                filterValue:
                                  item.data.split(stringSeparator)[7],
                              }}
                              controlInfo=""
                            ></MicroServiceMeasureCollection>
                          </div>
                        </>
                      );
                    case "view" + stringSeparator + "view":
                      //Case of div fieldType=view with related info
                      return (
                        <>
                          <div
                            className="collectionGalleryCard__data"
                            title={item.data}
                            // To better see the content of item.data which is responsible of passing props to the MicroServiceViewCollection UI component
                          >
                            <MicroServiceViewCollection
                              viewInputData={{
                                collection: item.data.split(stringSeparator)[4],
                                searchField:
                                  item.data.split(stringSeparator)[5],
                                searchValue:
                                  item.data.split(stringSeparator)[6],
                                outputFieldName:
                                  item.data.split(stringSeparator)[8],
                              }}
                              controlInfo=""
                            ></MicroServiceViewCollection>
                          </div>
                        </>
                      );
                    default:
                      return (
                        <div>
                          {"UI component error: the case " +
                            item.htmlTag +
                            "&&" +
                            item.fieldType +
                            stringSeparator +
                            item.relatedInfo.split(stringSeparator)[0] +
                            " is not supported at the app. Please, add a new case in the switch statement at file `gallery.collections.tsx` or change the relatedInfo value `" +
                            item.relatedInfo +
                            "` for field `" +
                            item.fieldName +
                            "` of collection `" +
                            item.collection +
                            "` at database collection `appcollectionfields`."}
                        </div>
                      );
                  }

                case "img":
                  return (
                    <div className="collectionGalleryCard__dataImageContainer">
                      <img
                        src={item.data}
                        alt={item.data + "" + item.data}
                        className="collectionGalleryCard__dataImage"
                      ></img>
                    </div>
                  );
                case "a":
                  return (
                    <a
                      className="collectionGalleryCard__data"
                      href={item.data}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.data}
                    </a>
                  );
                default:
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  return (
                    <div>
                      {"UI component error: the htmlTag=" +
                        item.htmlTag +
                        " assign to this field is not supported at the app. Please, add a new case in the switch statement at file `gallery.collections.tsx` or change the htmlTag value for the field `" +
                        item.fieldName +
                        "` of collection `" +
                        item.collection +
                        "` at database collection `appcollectionfields`."}
                    </div>
                  );
              }
            })()}
          </div>
        </div>
      )
    );

    tempArray.shift();
    return <li className="collectionGalleryCard">{tempArray}</li>;
  };

  const recordsJSX = () => {
    let tempArray = [<div key="elementToBeShifted"></div>];

    galleryCopy.forEach((element: any) => {
      tempArray = tempArray.concat(recordJSX(galleryCopy.indexOf(element)));
    });

    tempArray.shift();
    return tempArray;
  };

  return (
    <>
      <div className="collectionsGallery">
        <h2 className="collectionsGallery__heading">
          {translate(collectionState.queryInput.filterCollection)}
        </h2>

        <div className="collectionsGallery__container">
          <ul className="collectionsGallery__list">{recordsJSX()}</ul>
        </div>
      </div>
    </>
  );
}

// Example of JSX Element with for statement
// <div>
//   {(() => {
//     let records = [<div></div>];
//     for (let i = 0; i < 10; i++) {
//       records.push(
//         <div>
//           {recordsFieldsDataArray[i].field +
//             ": " +
//             recordsFieldsDataArray[i].data}
//         </div>
//       );
//     }
//     records.shift();
//     return records;
//   })()}
// </div>;
