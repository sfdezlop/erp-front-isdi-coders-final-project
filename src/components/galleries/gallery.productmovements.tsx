// PENDING: Strange behavior when deleting productmovements. Sometimes, the gallery updates correctly after deletions and other not when we use confirm(). If we don't use confirmation for the deletion, the gallery update is correct. To solve it its necessary to include a local state variable that changes when the deletion is confirmed.
// Anyway, even when the update of deletion is correct, the show value of the stock is cached at server when the filter does not change, showing not updated info about it. This is a pending issue. It also show update problems when the order field is id and the order type (asc/desc) is changed, because the gallery does not change properly in this case of usage

import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProductMovements } from "../../hooks/use.productmovements";
import { ProductMovementsRepo } from "../../services/repositories/productmovement.repo";
import { RootState } from "../../store/store";
import "./gallery.productmovements.css";
import { ProductKeyValue } from "../microservices/product.key/product.keyvalue";
import { ProductStock } from "../microservices/product.stock/product.stock";
import { NoData } from "../nodata/nodata";

export function ProductMovementsGallery() {
  const filteredGalleryData = useSelector(
    (state: RootState) => state.collectionState.queryOutput.gallery
  );

  const repo = new ProductMovementsRepo();
  const { deleteByKey } = useProductMovements(repo);

  const [renderToAvoidConfirmMalfunction, setRenderToAvoidConfirmMalfunction] =
    useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerClick = (event: SyntheticEvent) => {
    const valueToDelete = event.currentTarget.ariaLabel ?? "";
    //Nullish coalescing operator
    const keyToDelete = "_id";
    // When the key is id, its necessary to indicate _id in the fetch action

    const query = { key: keyToDelete, value: valueToDelete };

    const confirmHandlerClick = () => {
      const confirmation = window.confirm(
        "Delete record with id  " +
          query.value +
          " at collection productmovements?"
      );

      if (confirmation) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        deleteByKey(query);
        setRenderToAvoidConfirmMalfunction(renderToAvoidConfirmMalfunction + 1);
      }
    };

    confirmHandlerClick();
  };

  return (
    <>
      <div className="productMovementsGallery">
        <h2 className="productMovementsGallery__heading">
          {"Product Movements"}
        </h2>
        <div className="productMovementsGallery__container">
          <div className="productMovementsGallery__fieldContainer">
            <div className="productMovementsGallery__field">Date</div>
            <div className="productMovementsGallery__field">SKU</div>
            <div className="productMovementsGallery__field">Brand</div>
            <div className="productMovementsGallery__field">Image</div>
            <div className="productMovementsGallery__field">Stock</div>
            <div className="productMovementsGallery__field">Batch</div>
            <div className="productMovementsGallery__field">Store</div>
            <div className="productMovementsGallery__field">Units</div>
            <div className="productMovementsGallery__field">Type</div>
            <div className="productMovementsGallery__field">TypeID</div>
            <div className="productMovementsGallery__field">Cost/unit</div>
            <div className="productMovementsGallery__field">Price/unit</div>
            <div className="productMovementsGallery__field">Delete</div>
          </div>
          <div className="productMovementsGallery__dataContainer">
            {filteredGalleryData.map((item) => (
              <li className="productMovementsGallery__dataRow" key={item.id}>
                <div className="productMovementsGallery__data">{item.date}</div>
                <div className="productMovementsGallery__data">
                  {item.productSku}
                </div>
                <div className="productMovementsGallery__data">
                  <ProductKeyValue
                    urlExtraPathId={
                      "microservices/inputkey-sku-outputkey-brand/inputvalue-" +
                      item.productSku
                    }
                  ></ProductKeyValue>
                </div>
                <div className="productMovementsGallery__data">
                  <ProductKeyValue
                    urlExtraPathId={
                      "microservices/inputkey-sku-outputkey-image/inputvalue-" +
                      item.productSku
                    }
                  ></ProductKeyValue>
                </div>{" "}
                <div className="productMovementsGallery__data">
                  <ProductStock sku={item.productSku ?? ""}></ProductStock>
                </div>
                <div className="productMovementsGallery__data">
                  {item.batch}
                </div>
                <div className="productMovementsGallery__data">
                  {item.store}
                </div>
                <div className="productMovementsGallery__data">
                  {item.units}
                </div>
                <div className="productMovementsGallery__data">{item.type}</div>
                <div className="productMovementsGallery__data">
                  {item.typeId}
                </div>
                <div className="productMovementsGallery__data">
                  {item.costPerUnit}
                </div>
                <div className="productMovementsGallery__data">
                  {item.pricePerUnit}
                </div>
                <div className="productMovementsGallery__data productMovementsGallery__delete">
                  <button
                    aria-label={item.id}
                    onClick={handlerClick}
                    title={"Delete id " + item.id}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>{" "}
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
