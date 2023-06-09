import "./microservice.measure.collection.css";
import { useCollections } from "../../../hooks/use.collections";
import { useEffect, useState } from "react";
import { CollectionsRepo } from "../../../services/repositories/collection.repo";
import { MeasureQueryCollectionStructure } from "../../../models/collections.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export type MicroServiceMeasureCollectionProps = {
  measureInputData: MeasureQueryCollectionStructure;
  controlInfo: string;
};

export function MicroServiceMeasureCollection({
  measureInputData,
  controlInfo,
}: MicroServiceMeasureCollectionProps) {
  const repoCollection = new CollectionsRepo();
  const { measure } = useCollections(repoCollection);
  const [valueToShow, setValueToShow] = useState("Initializing...");
  const [renderNumber, setRenderNumber] = useState(1);
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );
  useEffect(() => {
    const promiseToEvaluate = measure(measureInputData, controlInfo);
    promiseToEvaluate.then((promiseValue) => {
      promiseValue === undefined
        ? setValueToShow("Info not found (frontend)")
        : //Defensive hardcode because the measure method always return a value at the backend
          setValueToShow(promiseValue);
      setRenderNumber(2);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionState.queryOutput.gallery]);

  //Important: include the collectionState.queryOutput.gallery in dep array. Otherwise the data shown in the UI component is not updated correctly when render.

  if (renderNumber === 1) {
    return (
      <div className="microserviceMeasureCollection__measuring">
        {"Measuring..."}
      </div>
    );
  } else {
    return (
      <div className="microserviceMeasureCollection__valueToShow">
        {valueToShow}
      </div>
    );
  }
}
