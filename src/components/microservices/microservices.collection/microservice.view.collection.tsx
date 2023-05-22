import "./microservice.view.collection.css";
import { useCollections } from "../../../hooks/use.collections";
import { useEffect, useState } from "react";
import { CollectionsRepo } from "../../../services/repositories/collection.repo";
import { ReadRecordFieldValueStructure } from "../../../models/collections.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export type MicroServiceViewCollectionProps = {
  queryInputData: ReadRecordFieldValueStructure;
  controlInfo: string;
};

export function MicroServiceViewCollection({
  queryInputData,
  controlInfo,
}: MicroServiceViewCollectionProps) {
  //This components returns the value of the key for any record at products collection, passing as arguments of the function 1) the unique 'sku' value of the record (sku argument) and 2) the name of the key ('key' argument) that you want to show. If the record does not exists on products collection, its return "" to simulate the behavior of an inner left join query in related databases from the data collection that calls the component to the product collection.
  const repoCollection = new CollectionsRepo();
  const { readRecordFieldValue } = useCollections(repoCollection);
  const [valueToShow, setValueToShow] = useState("Initializing...");
  const [renderNumber, setRenderNumber] = useState(1);
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );
  useEffect(() => {
    const promiseToEvaluate = readRecordFieldValue(queryInputData, controlInfo);
    promiseToEvaluate.then((promiseValue) => {
      promiseValue === undefined
        ? setValueToShow("Info not found")
        : //Defensive hardcode because the readRecordFieldValue method always return a value at the backend
          setValueToShow(promiseValue);
      setRenderNumber(2);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionState.queryOutput.gallery]);

  //Important: include the collectionState.queryOutput.gallery in dep array. Otherwise the data shown in the UI component is not updated correctly.

  if (renderNumber === 1) {
    return (
      <div className="microserviceViewCollection__processing">
        {"Processing..."}
      </div>
    );
  } else {
    return (
      <div className="microserviceViewCollection__valueToShow">
        {valueToShow}
      </div>
    );
  }
}
