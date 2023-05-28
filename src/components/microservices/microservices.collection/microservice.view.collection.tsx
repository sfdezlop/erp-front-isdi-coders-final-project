import "./microservice.view.collection.css";
import { useCollections } from "../../../hooks/use.collections";
import { useEffect, useState } from "react";
import { CollectionsRepo } from "../../../services/repositories/collection.repo";
import { ReadRecordFieldValueStructure } from "../../../models/collections.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export type MicroServiceViewCollectionProps = {
  viewInputData: ReadRecordFieldValueStructure;
  controlInfo: string;
};

export function MicroServiceViewCollection({
  viewInputData,
  controlInfo,
}: MicroServiceViewCollectionProps) {
  const repoCollection = new CollectionsRepo();
  const { view } = useCollections(repoCollection);
  const [valueToShow, setValueToShow] = useState("Initializing...");
  const [renderNumber, setRenderNumber] = useState(1);
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );
  useEffect(() => {
    const promiseToEvaluate = view(viewInputData, controlInfo);
    promiseToEvaluate.then((promiseValue) => {
      promiseValue === undefined
        ? setValueToShow("Info not found")
        : //Defensive hardcode because the readRecordFieldValue method always return a value at the backend
          setValueToShow(promiseValue);
      setRenderNumber(2);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionState.queryOutput.gallery]);

  //Important: include the collectionState.queryOutput.gallery in dep array. Otherwise the data shown in the UI component is not updated correctly when render.

  if (renderNumber === 1) {
    return (
      <div className="microserviceViewCollection__viewing">{"Viewing..."}</div>
    );
  } else {
    return (
      <div className="microserviceViewCollection__valueToShow">
        {valueToShow}
      </div>
    );
  }
}
