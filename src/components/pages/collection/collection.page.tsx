import "./collection.page.css";
import { useEffect, useState } from "react";
import { Loader } from "../../loader/loader";
import { QueryCollection } from "../../queries/query.collection/query.collection";
import CollectionsGallery from "../../galleries/gallery.collections";

export default function CollectionPage() {
  const [renderNumber, setRenderNumber] = useState(1);

  useEffect(() => {
    setRenderNumber(renderNumber + 1); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (renderNumber === 1) return <Loader></Loader>;

  return (
    <>
      <div className="collectionPage">
        <QueryCollection collectionName="products"></QueryCollection>
        <CollectionsGallery></CollectionsGallery>
        {/* <ProductsGallery></ProductsGallery> */}
      </div>
    </>
  );
}
