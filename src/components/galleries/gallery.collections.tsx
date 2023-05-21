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

  const recordsFieldsFunction = galleryCopy.map((item: number) => {
    return recordSchemaFieldsFunction(galleryCopy.indexOf(item));
  });

  const recordsDataFunction = galleryCopy.map((item: number) => {
    return recordSchemaDataFunction(galleryCopy.indexOf(item));
  });

  let recordsFieldsDataArray: {
    collection: string;
    record: number;
    fieldName: string;
    fieldType: string;
    data: string;
    galleryShow: number;
    htmlTag: string;
    relatedCollectionField: string;
  }[] = [];
  const recordsGalleryShowFunction = (
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

  const recordsHtmlTagFunction = (
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

  const recordsRelatedCollectionFieldFunction = (
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
        )[0].relatedCollectionField;
  };
  for (let i = 0; i < recordsFieldsFunction.length; i++) {
    for (let j = 0; j < recordsDataFunction[i].length; j++)
      recordsFieldsDataArray.push({
        collection: collectionState.queryInput.filterCollection,
        record: i,
        fieldName: recordsFieldsFunction[i][j],
        fieldType: "schema",
        data:
          recordsDataFunction[i][j].startsWith('"') &&
          recordsDataFunction[i][j].endsWith('"')
            ? //Defensive hardcode: JSON.stringify always return a " character when it starts with ", but we maintain this additional condition to take care about OS where the JSON.stringify does not work with ")
              recordsDataFunction[i][j].slice(
                1,
                recordsDataFunction[i][j].length - 1
              )
            : recordsDataFunction[i][j],
        galleryShow:
          1000 +
          1000 * i +
          Number(
            recordsGalleryShowFunction(
              collectionState.queryInput.filterCollection,
              recordsFieldsFunction[i][j]
            )
          ),

        htmlTag: recordsHtmlTagFunction(
          collectionState.queryInput.filterCollection,
          recordsFieldsFunction[i][j]
        ),
        relatedCollectionField: recordsRelatedCollectionFieldFunction(
          collectionState.queryInput.filterCollection,
          recordsFieldsFunction[i][j]
        ),
      });
  }
  console.log("recordsFieldsDataArray");
  console.table(recordsFieldsDataArray);

  const records =
    maximumValueOfAPropertyInAnArrayOfObjects(
      recordsFieldsDataArray as [],
      "record"
    ) + 1;

  console.log(records);

  const viewFields = collectionState.appCollectionFields.filter(
    (item) =>
      item.collectionName === collectionState.queryInput.filterCollection &&
      item.fieldType === "view"
  );

  console.table(viewFields);

  for (let i = 0; i < records; i++) {
    for (let j = 0; j < viewFields.length; j++) {
      recordsFieldsDataArray.push({
        collection: collectionState.queryInput.filterCollection,
        record: i,
        fieldName: viewFields[j].fieldName,
        fieldType: viewFields[j].fieldType,
        data: "",
        galleryShow: 1000 + 1000 * i + Number(viewFields[j].galleryShow),

        htmlTag: viewFields[j].htmlTag,
        relatedCollectionField: viewFields[j].relatedCollectionField,
      });
    }
  }

  const recordsFieldsDataArrayToShow: typeof recordsFieldsDataArray =
    orderByPropertyAnArrayOfObjects(
      recordsFieldsDataArray.filter(
        (item) => item.galleryShow % 1000 > 0
      ) as [],
      "galleryShow",
      "asc"
    );
  console.log("recordsFieldsDataArrayToShow");
  console.table(recordsFieldsDataArrayToShow);
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
            "_keyvalue" +
            recordsFieldsDataArrayFilteredByRecord.indexOf(item)
          }
        >
          <div className="collectionGalleryCard__fieldData">
            <div className="collectionGalleryCard__field">
              {translate(item.fieldName) + ": "}
            </div>
            {(() => {
              switch (item.htmlTag) {
                case "div":
                  return item.relatedCollectionField.split("_-_").length ===
                    2 ? (
                    <Link
                      to={encodeURI(
                        "/collections/readrecords/&collection=" +
                          item.relatedCollectionField.split("_-_")[0] +
                          "&filterfield=" +
                          item.relatedCollectionField.split("_-_")[1] +
                          "&filtervalue=&searchfield=" +
                          item.relatedCollectionField.split("_-_")[1] +
                          "&searchvalue=" +
                          item.data +
                          "&searchtype=Exact match&queryset=1&queryrecordsperset=" +
                          recordsPerSet[0] +
                          "&orderfield=" +
                          item.relatedCollectionField.split("_-_")[1] +
                          "&ordertype=asc&controlinfo="
                      )}
                      className="collectionGalleryCard__link"
                    >
                      <div
                        className="collectionGalleryCard__data"
                        onClick={handlerOnClickLinkedDiv}
                        aria-label={
                          "/collections/readrecords/&collection=" +
                          item.relatedCollectionField.split("_-_")[0] +
                          "&filterfield=" +
                          item.relatedCollectionField.split("_-_")[1] +
                          "&filtervalue=&searchfield=" +
                          item.relatedCollectionField.split("_-_")[1] +
                          "&searchvalue=" +
                          item.data +
                          "&searchtype=Exact match&queryset=1&queryrecordsperset=" +
                          recordsPerSet[0] +
                          "&orderfield=" +
                          item.relatedCollectionField.split("_-_")[1] +
                          "&ordertype=asc&controlinfo="
                        }
                      >
                        {item.data}
                      </div>
                    </Link>
                  ) : (
                    <div className="collectionGalleryCard__data">
                      {item.data}
                    </div>
                  );
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
                      {"Error: the htmlTag=" +
                        item.htmlTag +
                        " assign to this field is not supported at the app. Please, add a new case in the switch statement at gallery.collections.tsx or change the htmlTag value for the field `" +
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
