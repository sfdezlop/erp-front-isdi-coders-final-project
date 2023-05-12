import "./collection.page.css";
import { useEffect, useState } from "react";
import { Loader } from "../../loader/loader";
import { QueryCollection } from "../../queries/query.collection/query.collection";
import CollectionsGallery from "../../galleries/gallery.collections";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ProductsGallery } from "../../galleries/gallery.products";
import { ProductMovementsGallery } from "../../galleries/gallery.productmovements";

export default function CollectionPage() {
  const [renderNumber, setRenderNumber] = useState(1);

  const filterCollection = useSelector(
    (state: RootState) => state.collectionState.queryInput.filterCollection
  );

  useEffect(() => {
    setRenderNumber(renderNumber + 1); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (renderNumber === 1) return <Loader></Loader>;

  if (filterCollection === "products")
    return (
      <>
        <div className="collectionPage">
          <QueryCollection collectionName="products"></QueryCollection>
          {/* <CollectionsGallery></CollectionsGallery> */}
          <ProductsGallery></ProductsGallery>
        </div>
      </>
    );

  return (
    <>
      <div className="collectionPage">
        <QueryCollection collectionName="products"></QueryCollection>
        {/* <CollectionsGallery></CollectionsGallery> */}
        <ProductMovementsGallery></ProductMovementsGallery>
      </div>
    </>
  );
}
