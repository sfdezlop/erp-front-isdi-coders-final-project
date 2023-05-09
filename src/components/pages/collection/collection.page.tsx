import "./collection.page.css";
import { useEffect, useState } from "react";

import { Loader } from "../../loader/loader";
import { QueryCollection } from "../../query.collection/query.collection";
import ProductsGallery from "../../galleries/products.gallery";

export default function CollectionPage() {
  const [renderNumber, setRenderNumber] = useState(1);

  useEffect(() => {
    setRenderNumber(renderNumber + 1); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (renderNumber === 1) return <Loader></Loader>;
  let params = "products";

  switch (params) {
    case "products":
      return (
        <>
          <div className="collectionPage">
            {/* <h2 className="collection__heading">{params}</h2> */}
            <QueryCollection collectionName="products"></QueryCollection>
            <ProductsGallery></ProductsGallery>
          </div>
        </>
      );

    case "productmovements":
      return (
        <>
          <div className="collectionPage">
            {/* <h2 className="collection__heading">{params}</h2> */}
            <QueryCollection collectionName="productmovements"></QueryCollection>
          </div>
        </>
      );

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
