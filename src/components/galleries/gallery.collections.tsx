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
  const galleryCopy = Object.assign(collectionState.queryOutput.gallery);

  const recordSchemaFieldsFunction = (i: number): string[] => {
    return Object.keys(galleryCopy[i]);
  };

  const recordSchemaDataFunction = (i: number): string[] => {
    return Object.values(galleryCopy[i]).map((item) => JSON.stringify(item));
    //Defensive: JSON.stringify for cases when data is an object or contains objects
  };

  const recordsSchemaFieldsFunction = galleryCopy.map((item: number) => {
    return recordSchemaFieldsFunction(galleryCopy.indexOf(item));
  });

  const recordsSchemaDataFunction = galleryCopy.map((item: number) => {
    return recordSchemaDataFunction(galleryCopy.indexOf(item));
  });

  let recordsFieldsDataSchemaFieldsArray: {
    collection: string;
    record: number;
    fieldName: string;
    fieldType: string;
    data: string;
    galleryShow: number;
    htmlTag: string;
    relatedInfo: string;
  }[] = [];
  const recordsGallerySchemaFieldsShowFunction = (
    collection: string,
    fieldName: string
  ): string => {
    return collectionState.appCollectionFields.filter(
      (item) =>
        item.collectionName === collection && item.fieldName === fieldName
    ).length === 0
      ? "000"
      : collectionState.appCollectionFields.filter(
          (item) =>
            item.collectionName === collection && item.fieldName === fieldName
        )[0].galleryShow;
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
        fieldType: "schema",
        data:
          recordsSchemaDataFunction[i][j].startsWith('"') &&
          recordsSchemaDataFunction[i][j].endsWith('"')
            ? //Defensive hardcode: JSON.stringify always return a " character when it starts with ", but we maintain this additional condition to take care about OS where the JSON.stringify does not work with ")
              recordsSchemaDataFunction[i][j].slice(
                1,
                recordsSchemaDataFunction[i][j].length - 1
              )
            : recordsSchemaDataFunction[i][j],
        galleryShow:
          1000 +
          1000 * i +
          Number(
            recordsGallerySchemaFieldsShowFunction(
              collectionState.queryInput.filterCollection,
              recordsSchemaFieldsFunction[i][j]
            )
          ),

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

  const records =
    maximumValueOfAPropertyInAnArrayOfObjects(
      recordsFieldsDataSchemaFieldsArray as [],
      "record"
    ) + 1;
  const recordsFieldsDataSchemaFieldsArraySnapshot =
    recordsFieldsDataSchemaFieldsArray.map((item) => item);

  //Adding view fields
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
        fieldType: viewFields[j].fieldType,
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

        galleryShow: 1000 + 1000 * i + Number(viewFields[j].galleryShow),

        htmlTag: viewFields[j].htmlTag,
        relatedInfo: viewFields[j].relatedInfo,
      });
    }
  }

  //Adding measure fields
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
        fieldType: measureFields[j].fieldType,
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
        galleryShow: 1000 + 1000 * i + Number(measureFields[j].galleryShow),

        htmlTag: measureFields[j].htmlTag,
        relatedInfo: measureFields[j].relatedInfo,
      });
    }
  }

  //Adding calculated fields
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
        fieldType: calculatedFields[j].fieldType,
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
        galleryShow: 1000 + 1000 * i + Number(calculatedFields[j].galleryShow),

        htmlTag: calculatedFields[j].htmlTag,
        relatedInfo: calculatedFields[j].relatedInfo,
      });
    }
  }

  const recordsFieldsDataArrayToShow: typeof recordsFieldsDataSchemaFieldsArray =
    orderByPropertyAnArrayOfObjects(
      recordsFieldsDataSchemaFieldsArray.filter(
        (item) => item.galleryShow % 1000 > 0
      ) as [],
      "galleryShow",
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
      primaryKey: "",
      primaryKeyValue: "",
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
              title={item.galleryShow.toString()}
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

// Example of JSX Element with for
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
