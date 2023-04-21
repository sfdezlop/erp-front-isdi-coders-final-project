import { useProductMovements } from "../../../hooks/use.productmovements";
import "./stock.css";

import { ProductMovementsRepo } from "../../../services/repositories/productmovement.repo";
import { useEffect, useState } from "react";

export type StockProps = {
  options: string;
};

export function Stock({ options }: StockProps) {
  const repo = new ProductMovementsRepo();
  const { showStockBySku } = useProductMovements(repo);
  const [stockToShow, setStockToShow] = useState(0);
  const [renderNumber, setRenderNumber] = useState(1);
  useEffect(() => {
    const promiseToEvaluate = showStockBySku(options);
    promiseToEvaluate.then((promiseValue) => {
      promiseValue === undefined
        ? setStockToShow(0)
        : setStockToShow(promiseValue);
      setRenderNumber(2);
    });
  }, []);

  if (renderNumber === 1) {
    return (
      <div className="stock__container">
        {"Stock of SKU " + options + " as microservice (units): Calculating..."}
      </div>
    );
  } else {
    return (
      <div className="stock__container">
        {"Stock of SKU " + options + " as microservice (units): " + stockToShow}
      </div>
    );
  }
}
