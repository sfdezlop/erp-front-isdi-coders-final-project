// PENDING: Strange behavior when deleting productmovements. Sometimes, the gallery updates correctly after deletions and other not when we use confirm(). If we don't use confirmation for the deletion, the gallery update is correct. To solve it its necessary to include a local state variable that changes when the deletion is confirmed.
// Anyway, even when the update of deletion is correct, the show value of the stock is cached at server when the filter does not change, showing not updated info about it. This is a pending issue. It also show update problems when the order field is id and the order type (asc/desc) is changed, because the gallery does not change properly in this case of usage

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./collections.gallery.css";
import { CollectionsRepo } from "../../services/repositories/collection.repo";
import { Key } from "react";

export default function CollectionsGallery() {
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const galleryCopy = Object.assign(collectionState.queryOutput.gallery);

  if (galleryCopy.length === 0) return <>no data available for your query</>;

  const recordFields: string[] = Object.keys(galleryCopy[0]);
  const recordData: string[] = Object.values(galleryCopy[0]);
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

  console.log(recordsFieldsFunction);
  console.log(recordsDataFunction);

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

  console.table(recordsFieldsDataArray);

  const repo = new CollectionsRepo();
  // const {} = useCollections(repo);

  return (
    <>
      <div className="collectionsGallery">
        <h2 className="collectionsGallery__heading">
          {collectionState.queryInput.filterCollection}
        </h2>
        <div className="collectionsGallery__recordsContainer">
          {recordsFieldsDataArray.map((item) => (
            <div
              className="collectionsGallery__records"
              key={recordsFieldsDataArray.indexOf(item)}
            >
              <div>{item.field}</div>
              <div>{item.data}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

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
