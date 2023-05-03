import "./collection.page.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../../../hooks/use.products";
import { ProductsRepo } from "../../../services/repositories/product.repo";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../loader/loader";
import { QueryCollection } from "../../query.collection/query.collection";

export default function CollectionPage() {
  const [renderNumber, setRenderNumber] = useState(1);

  const queryInput = useSelector(
    (state: RootState) => state.collectionState.queryInput
  );

  const repoProduct = new ProductsRepo();
  const { readDetailById, createSample, deleteById, gallery } =
    useProducts(repoProduct);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setRenderNumber(renderNumber + 1);
  }, []);

  const navigate = useNavigate();

  if (renderNumber === 1) return <Loader></Loader>;
  let params = "productmovements";

  switch (params) {
    case "products":
      return (
        <>
          <div className="collectionPage">
            <h2 className="collection__heading">{params}</h2>
            <QueryCollection collectionName="products"></QueryCollection>
          </div>
        </>
      );
      break;
    case "productmovements":
      return (
        <>
          <div className="collectionPage">
            <h2 className="collection__heading">{params}</h2>
            <QueryCollection collectionName="productmovements"></QueryCollection>
          </div>
        </>
      );
      break;
    default:
      return (
        <>
          <div className="collectionPage">
            <h2 className="collection__heading">{params}</h2>
          </div>
        </>
      );
  }
}
