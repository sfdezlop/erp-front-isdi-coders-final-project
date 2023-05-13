import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./gallery.collections.css";

export default function CollectionsGallery() {
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const galleryCopy = Object.assign(collectionState.queryOutput.gallery);

  if (galleryCopy.length === 0) return <>no data available for your query</>;

  const recordFieldsFunction = (i: number): string[] => {
    return Object.keys(galleryCopy[i]);
  };

  const recordDataFunction = (i: number): string[] => {
    return Object.values(galleryCopy[i]);
  };

  const recordsFieldsFunction = galleryCopy.map((item: number) => {
    return recordFieldsFunction(galleryCopy.indexOf(item));
  });

  const recordsDataFunction = galleryCopy.map((item: number) => {
    return recordDataFunction(galleryCopy.indexOf(item));
  });

  let recordsFieldsDataArray: {
    record: number;
    field: number;
    data: string;
  }[] = [];

  for (let i = 0; i < recordsFieldsFunction.length; i++) {
    for (let j = 0; j < recordsDataFunction[i].length; j++)
      recordsFieldsDataArray.push({
        record: i,
        field: recordsFieldsFunction[i][j],
        data: recordsDataFunction[i][j],
      });
  }

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
          className="collectionsGallery__fieldDataContainer"
        >
          {item.field + ": " + item.data}
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
    return (
      <div className="collectionsGallery__recordContainer">{tempArray}</div>
    );
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
          {collectionState.queryInput.filterCollection}
        </h2>

        <div className="collectionsGallery__recordsContainer">
          {recordsJSX()}
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
