import { useProductMovements } from "../../../hooks/use.productmovements";
import "./product.stock.css";

import { ProductMovementsRepo } from "../../../services/repositories/productmovement.repo";
import { useEffect, useState } from "react";

export type ProductStockProps = {
  sku: string;
};

export function ProductStock({ sku }: ProductStockProps) {
  const repo = new ProductMovementsRepo();
  const { showStockBySku } = useProductMovements(repo);
  const [stockToShow, setStockToShow] = useState(0);
  const [renderNumber, setRenderNumber] = useState(1);
  useEffect(() => {
    const promiseToEvaluate = showStockBySku(sku);
    promiseToEvaluate.then((promiseValue) => {
      promiseValue === undefined
        ? setStockToShow(0)
        : setStockToShow(promiseValue);
      setRenderNumber(2);
    });
  }, []);

  if (renderNumber === 1) {
    return <div className="stock__container">{"Calculating..."}</div>;
  } else {
    return <div className="stock__container">{stockToShow}</div>;
  }
}
