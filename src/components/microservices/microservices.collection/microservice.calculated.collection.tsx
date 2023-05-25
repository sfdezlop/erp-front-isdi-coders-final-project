import "./microservice.calculated.collection.css";
import { useCollections } from "../../../hooks/use.collections";
import { useEffect, useState } from "react";
import { CollectionsRepo } from "../../../services/repositories/collection.repo";
import { CalculatedQueryCollectionStructure } from "../../../models/collections.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { roundToDecimals } from "../../../services/helpers/functions";
import { roundedDecimals } from "../../../config";

export type MicroServiceCalculatedCollectionProps = {
  calculatedInputData: CalculatedQueryCollectionStructure;
  controlInfo: string;
};

export function MicroServiceCalculatedCollection({
  calculatedInputData,
  controlInfo,
}: MicroServiceCalculatedCollectionProps) {
  const repoCollection = new CollectionsRepo();
  const { calculate } = useCollections(repoCollection);
  const [valueToShow, setValueToShow] = useState("Initializing...");
  const [renderNumber, setRenderNumber] = useState(1);
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );
  useEffect(() => {
    const promiseToEvaluate = calculate(calculatedInputData, controlInfo);
    promiseToEvaluate.then(async (promiseValue) => {
      promiseValue === undefined
        ? await setValueToShow("Info not found (frontend)")
        : //Defensive hardcode because the measure method always return a value at the backend
          await setValueToShow(promiseValue);
      await setRenderNumber(2);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionState.queryOutput.gallery]);

  //Important: include the collectionState.queryOutput.gallery in dep array. Otherwise the data shown in the UI component is not updated correctly when render.

  if (renderNumber === 1) {
    return (
      <div className="microserviceCalculatedCollection__measuring">
        {"Calculating..."}
      </div>
    );
  } else {
    return (
      <div className="microserviceCalculatedCollection__valueToShow">
        {isNaN(Number(valueToShow))
          ? "not possible to calculate"
          : roundToDecimals(Number(valueToShow), roundedDecimals)}
        {/* Defensive code for cases of divide by zero where the result at backend is an string impossible to cast to a number */}
      </div>
    );
  }
}
