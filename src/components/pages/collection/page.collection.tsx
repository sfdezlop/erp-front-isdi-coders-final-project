import "./page.collection.css";
import { useEffect, useState } from "react";
import { Loader } from "../../loader/loader";
import { QueryCollection } from "../../queries/query.collection/query.collection";
import CollectionsGallery from "../../galleries/gallery.collections";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ProductsGallery } from "../../galleries/gallery.products";
import { ProductMovementsGallery } from "../../galleries/gallery.productmovements";
import { useCollections } from "../../../hooks/use.collections";
import { CollectionsRepo } from "../../../services/repositories/collection.repo";

const componentFile = "page.collection.tsx";
export default function CollectionPage() {
  const [renderNumber, setRenderNumber] = useState(1);

  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const repoCollection = new CollectionsRepo();

  const { updateQueryFields, updateTranslations, updateAppCollectionFields } =
    useCollections(repoCollection);

  useEffect(() => {
    if (renderNumber === 1) {
      updateQueryFields("componentFile_" + componentFile + "_line_27");
      updateTranslations("componentFile_" + componentFile + "_line_27");
      updateAppCollectionFields("componentFile_" + componentFile + "_line_27");
    }

    setRenderNumber(renderNumber + 1); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (renderNumber === 1) return <Loader></Loader>;

  if (
    collectionState.queryInput.filterCollection === "products" &&
    collectionState.queryOutput.galleryInterface === "custom"
  )
    return (
      <>
        <div className="collectionPage">
          <QueryCollection collectionName="products"></QueryCollection>
          {/* <CollectionsGallery></CollectionsGallery> */}
          <ProductsGallery></ProductsGallery>
        </div>
      </>
    );
  if (
    collectionState.queryInput.filterCollection === "productmovements" &&
    collectionState.queryOutput.galleryInterface === "custom"
  )
    return (
      <>
        <div className="collectionPage">
          <QueryCollection collectionName="products"></QueryCollection>
          {/* <CollectionsGallery></CollectionsGallery> */}
          <ProductMovementsGallery></ProductMovementsGallery>
        </div>
      </>
    );

  return (
    <>
      <div className="collectionPage">
        <QueryCollection collectionName="products"></QueryCollection>
        <CollectionsGallery></CollectionsGallery>
      </div>
    </>
  );
}
