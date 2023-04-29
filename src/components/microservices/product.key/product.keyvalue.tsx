import { useProducts } from "../../../hooks/use.products";
import "./product.keyvalue.css";

import { ProductsRepo } from "../../../services/repositories/product.repo";
import { useEffect, useState } from "react";

export type ProductKeyProps = {
  urlExtraPathId: string;
};

export function ProductKeyValue({ urlExtraPathId }: ProductKeyProps) {
  //This components returns the value of the key for any record at products collection, passing as arguments of the function 1) the unique 'sku' value of the record (sku argument) and 2) the name of the key ('key' argument) that you want to show. If the record does not exists on products collection, its return "" to simulate the behavior of an inner left join query in related databases from the data collection that calls the component to the product collection.
  const repo = new ProductsRepo();
  const { microserviceQueryByKeyValue } = useProducts(repo);
  const [valueToShow, setValueToShow] = useState("");
  const [renderNumber, setRenderNumber] = useState(1);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const promiseToEvaluate = microserviceQueryByKeyValue(urlExtraPathId);
    promiseToEvaluate.then((promiseValue) => {
      promiseValue === undefined
        ? setValueToShow("Info not found")
        : setValueToShow(promiseValue);
      setRenderNumber(2);
    });
  });

  if (renderNumber === 1) {
    return <div className="productKeyValue__container">{"Processing..."}</div>;
  } else if (valueToShow.includes("https://")) {
    return (
      <img
        className="productKeyValue__imageContainer"
        src={valueToShow}
        alt=""
      ></img>
    );
  }
  return <div className="productKeyValue__container">{valueToShow}</div>;
}
