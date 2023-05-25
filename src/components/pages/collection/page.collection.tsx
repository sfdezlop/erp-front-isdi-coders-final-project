import "./page.collection.css";
import { useEffect, useState } from "react";
import { Loader } from "../../loader/loader";
import { QueryCollection } from "../../queries/query.collection/query.collection";
import { CollectionsGallery } from "../../galleries/gallery.collections";
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

  const queryCollectionPropsInput =
    "collections/readrecords/&collection=" +
    collectionState.queryInput.filterCollection +
    "&filterfield=" +
    collectionState.queryInput.filterField +
    "&filtervalue=" +
    collectionState.queryInput.filterValue +
    "&searchfield=" +
    collectionState.queryInput.searchField +
    "&searchvalue=" +
    collectionState.queryInput.searchValue +
    "&searchtype=" +
    collectionState.queryInput.searchType +
    "&queryset=" +
    collectionState.queryInput.querySet +
    "&queryrecordsperset=" +
    collectionState.queryInput.queryRecordsPerSet +
    "&orderfield=" +
    collectionState.queryInput.orderField +
    "&ordertype=" +
    collectionState.queryInput.orderType +
    "&controlinfo=";

  const repoCollection = new CollectionsRepo();

  const {
    updateQueryFields,
    updateTranslations,
    updateAppCollectionFields,
    updateQueryInput,
  } = useCollections(repoCollection);

  useEffect(() => {
    if (renderNumber === 1) {
      updateQueryFields("componentFile_" + componentFile + "_line_61");
      updateTranslations("componentFile_" + componentFile + "_line_61");
      updateAppCollectionFields("componentFile_" + componentFile + "_line_61");
      updateQueryInput(
        collectionState.queryInput,
        "componentFile_" + componentFile + "_line_61"
      );
    }
    setRenderNumber(renderNumber + 1); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (renderNumber === 1) return <Loader></Loader>;

  if (
    collectionState.queryInput.filterCollection === "products" &&
    collectionState.queryInput.showFormat === "custom"
  )
    return (
      <>
        <div className="collectionPage">
          <QueryCollection
            queryCollectionProps={queryCollectionPropsInput}
          ></QueryCollection>
          {/* <CollectionsGallery></CollectionsGallery> */}
          <ProductsGallery></ProductsGallery>
        </div>
      </>
    );
  if (
    collectionState.queryInput.filterCollection === "productmovements" &&
    collectionState.queryInput.showFormat === "custom"
  )
    return (
      <>
        <div className="collectionPage">
          <QueryCollection
            queryCollectionProps={queryCollectionPropsInput}
          ></QueryCollection>
          {/* <CollectionsGallery></CollectionsGallery> */}
          <ProductMovementsGallery></ProductMovementsGallery>
        </div>
      </>
    );

  return (
    <>
      <div
        className="collectionPage"
        key={"div" + collectionState.queryInput.filterCollection}
      >
        <QueryCollection
          queryCollectionProps={queryCollectionPropsInput}
          key={"QueryCollection" + collectionState.queryInput.filterCollection}
        ></QueryCollection>
        <CollectionsGallery
          key={
            "CollectionsGallery" + collectionState.queryInput.filterCollection
          }
        ></CollectionsGallery>
      </div>
    </>
  );
}
