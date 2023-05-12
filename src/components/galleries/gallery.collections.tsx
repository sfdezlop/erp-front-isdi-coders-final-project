// PENDING: Strange behavior when deleting productmovements. Sometimes, the gallery updates correctly after deletions and other not when we use confirm(). If we don't use confirmation for the deletion, the gallery update is correct. To solve it its necessary to include a local state variable that changes when the deletion is confirmed.
// Anyway, even when the update of deletion is correct, the show value of the stock is cached at server when the filter does not change, showing not updated info about it. This is a pending issue. It also show update problems when the order field is id and the order type (asc/desc) is changed, because the gallery does not change properly in this case of usage

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

  const recordsFieldsFunction = galleryCopy.map((item: Number) => {
    return recordFieldsFunction(galleryCopy.indexOf(item));
  });

  const recordsDataFunction = galleryCopy.map((item: Number) => {
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
    let tempArray = [<div></div>];

    const recordsFieldsDataArrayFiltered = recordsFieldsDataArray.filter(
      (item) => item.record === i
    );
    for (let j = 0; j < recordsFieldsDataArrayFiltered.length; j++) {
      tempArray.push(
        <div key={"record-" + i + "_keyvalue" + j}>
          {recordsFieldsDataArrayFiltered[j].field +
            ": " +
            recordsFieldsDataArrayFiltered[j].data}
        </div>
      );
    }
    tempArray.shift();
    return <div className="collectionsGallery__records">{tempArray}</div>;
  };

  const recordsJSX = () => {
    let tempArray = [<div>Hola</div>];

    for (let i = 0; i < galleryCopy.length; i++) {
      tempArray = tempArray.concat(recordJSX(i));
    }
    tempArray.shift();
    return tempArray;
  };

  return (
    <>
      <div className="collectionsGallery">
        <h2 className="collectionsGallery__heading">
          {collectionState.queryInput.filterCollection}
        </h2>
        {/* <div>{recordJSX(0)}</div> */}

        <div className="collectionsGallery__recordsContainer">
          {recordsJSX()}
        </div>
      </div>
    </>
  );
}

//JSX with for loop
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

// return (
//   <>
//     <div className="collectionsGallery">
//       <h2 className="collectionsGallery__heading">
//         {collectionState.queryInput.filterCollection}
//       </h2>
//       <div className="collectionsGallery__recordsContainer">
//         {recordsFieldsDataArray.map((item) => (
//           <div
//             className="collectionsGallery__records"
//             key={recordsFieldsDataArray.indexOf(item)}
//           >
//             <div>{item.field}</div>
//             <div>{item.data}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </>
// );

// return (
//   <>
//     <div className="collectionsGallery">
//       <h2 className="collectionsGallery__heading">
//         {collectionState.queryInput.filterCollection}
//       </h2>
//       <div className="collectionsGallery__recordsContainer">
//         {galleryCopy.map((item: string) => (
//           <div
//             className="collectionsGallery__records"
//             key={galleryCopy.indexOf(item) + "_galleryCopy"}
//           >
//             <ul className="collectionsGallery__fieldsContainer">
//               {recordFields.map((item1) => (
//                 <li
//                   className="collectionsGallery__fields"
//                   key={recordFields.indexOf(item1) + "_recordFields"}
//                 >
//                   {item1}
//                 </li>
//               ))}
//             </ul>
//             <ul className="collectionsGallery__dataContainer">
//               {recordData.map((item2) => (
//                 <li
//                   className="collectionsGallery__data"
//                   key={recordData.indexOf(item2) + "_recordData"}
//                 >
//                   {item2}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   </>
// );