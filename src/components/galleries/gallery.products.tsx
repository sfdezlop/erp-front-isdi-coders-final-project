import "./gallery.products.css";
import { SyntheticEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../../hooks/use.products";
import { ProductStructure } from "../../models/collections.model";
import { ProductsRepo } from "../../services/repositories/product.repo";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { ProductStock } from "../microservices/product.stock/product.stock";

export function ProductsGallery() {
  const galleryArray = useSelector(
    (state: RootState) => state.collectionState.queryOutput.gallery
  );

  const repoProduct = new ProductsRepo();
  useEffect(() => {
    console.log("useEffect at gallery.products.tsx");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { detailCredentials } = useProducts(repoProduct);
  const navigate = useNavigate();

  const handlerClick = (event: SyntheticEvent) => {
    const valueToDetail = event.currentTarget.ariaLabel ?? "";
    const keyToDetail = "sku";

    detailCredentials(keyToDetail + "/" + valueToDetail);

    navigate("/products/details/" + valueToDetail);
  };

  return (
    <>
      <div className="productsGallery">
        <h2 className="productsGallery__heading">Products</h2>
        <div className="productsGallery__container">
          <ul className="productsGallery__list">
            {galleryArray.map((item: Partial<ProductStructure>) => (
              <li className="productsGalleryCard" key={"li" + item.id}>
                <div className="productsGalleryCard__imageContainer">
                  <img
                    className="productsGalleryCard__image"
                    src={item.image}
                    alt={`${item.shortDescription} card`}
                    aria-label={item.sku}
                    onClick={handlerClick}
                    title="click to see details"
                  ></img>
                </div>
                <div
                  className="productsGalleryCard__shortDescription"
                  key={"img" + item.id}
                >
                  {item.shortDescription}
                </div>

                <div className="productsGalleryCard__details">
                  <div>Brand: {item.brand}</div>
                  <div className="productsGalleryCard__skuContainer">
                    <p>SKU: </p>
                    <p
                      className="productsGalleryCard__sku"
                      aria-label={item.sku}
                      onClick={handlerClick}
                      title="click to see details"
                    >
                      {item.sku}
                    </p>
                  </div>

                  <div>EAN: {item.ean}</div>
                  <div>Cost (€): {item.costPerUnit}</div>
                  <div>Price (€): {item.pricePerUnit}</div>
                  <div
                    className="productsGalleryCard__stockContainer"
                    title="click to see details"
                  >
                    <div>{"Stock (units):"} </div>
                    <div>
                      <ProductStock sku={item.sku ?? ""}></ProductStock>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
