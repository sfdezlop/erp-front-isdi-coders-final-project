import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./gallery.collections.css";
import { CollectionsRepo } from "../../services/repositories/collection.repo";
import { useCollections } from "../../hooks/use.collections";

export default function CollectionsGallery() {
  const repoCollection = new CollectionsRepo();
  const { translate } = useCollections(repoCollection);

  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const galleryCopy = Object.assign(collectionState.queryOutput.gallery);

  if (galleryCopy.length === 0) return <>no data available for your query</>;

  const recordFieldsFunction = (i: number): string[] => {
    return Object.keys(galleryCopy[i]);
  };

  const recordDataFunction = (i: number): string[] => {
    return Object.values(galleryCopy[i]).map((item) => JSON.stringify(item));

    //Defensive: JSON.stringify for cases when data is an object or contains objects
  };

  const recordsFieldsFunction = galleryCopy.map((item: number) => {
    return recordFieldsFunction(galleryCopy.indexOf(item));
  });

  const recordsDataFunction = galleryCopy.map((item: number) => {
    return recordDataFunction(galleryCopy.indexOf(item));
  });

  let recordsFieldsDataArray: {
    record: number;
    field: string;
    data: string;
    galleryShow: string;
    htmlTag: string;
    relatedCollectionField: string;

    // htmlCloseTag: JsxOpeningElement;
  }[] = [];

  for (let i = 0; i < recordsFieldsFunction.length; i++) {
    for (let j = 0; j < recordsDataFunction[i].length; j++)
      recordsFieldsDataArray.push({
        record: i,
        field: recordsFieldsFunction[i][j],
        data:
          recordsDataFunction[i][j].startsWith('"') &&
          recordsDataFunction[i][j].endsWith('"')
            ? //Defensive hardcode: JSON.stringify always return a " character when it starts with ", but we maintain this additional condition to take care about OS where the JSON.stringify does not work with ")
              recordsDataFunction[i][j].slice(
                1,
                recordsDataFunction[i][j].length - 1
              )
            : recordsDataFunction[i][j],
        galleryShow: "010",
        htmlTag: recordsFieldsFunction[i][j] === "image" ? "img" : "div",
        relatedCollectionField: "",
      });
  }

  console.table(recordsFieldsDataArray);

  const recordJSX = (i: number) => {
    let tempArray = [<div key="elementToBeShifted"></div>];

    const recordsFieldsDataArrayFiltered = recordsFieldsDataArray.filter(
      (item) => item.record === i
    );

    recordsFieldsDataArrayFiltered.forEach((item) =>
      tempArray.push(
        <div
          key={
            "record-" +
            i +
            "_keyvalue" +
            recordsFieldsDataArrayFiltered.indexOf(item)
          }
        >
          <div className="collectionGalleryCard__fieldData">
            <div className="collectionGalleryCard__field">
              {translate(item.field) + ": "}
            </div>
            <div></div>
            {item.htmlTag === "img" ? (
              <div className="collectionGalleryCard__data">
                <img
                  src={item.data}
                  alt={item.data + "" + item.data}
                  className="collectionGalleryCard__dataImage"
                ></img>
              </div>
            ) : (
              <div className="collectionGalleryCard__data">{item.data}</div>
            )}
            {/* <div className="collectionGalleryCard__data">{item.data}</div> */}
          </div>
        </div>
      )
    );
    // Refactored code of:
    // for (let j = 0; j < recordsFieldsDataArrayFiltered.length; j++) {
    //   tempArray.push(
    //     <div key={"record-" + i + "_keyvalue" + j}>
    //       {recordsFieldsDataArrayFiltered[j].field +
    //         ": " +
    //         recordsFieldsDataArrayFiltered[j].data}
    //     </div>
    //   );
    // }
    tempArray.shift();
    return <li className="collectionGalleryCard">{tempArray}</li>;
  };

  const recordsJSX = () => {
    let tempArray = [<div key="elementToBeShifted"></div>];

    galleryCopy.forEach((element: any) => {
      tempArray = tempArray.concat(recordJSX(galleryCopy.indexOf(element)));
    });

    // Refactored code of:
    // for (let i = 0; i < galleryCopy.length; i++) {
    //   tempArray = tempArray.concat(recordJSX(i));
    // }

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
