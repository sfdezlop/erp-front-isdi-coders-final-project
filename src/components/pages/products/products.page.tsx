import "./products.page.css";
import { SyntheticEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../../../hooks/use.products";
import { ProductStructure } from "../../../models/product.model";
import { ProductsRepo } from "../../../services/repositories/product.repo";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { FilterProducts } from "../../filter.products/filter.products";
import { ProductStock } from "../../microservices/product.stock/product.stock";

export default function ProductsPage() {
  const galleryArray = useSelector(
    (state: RootState) => state.productState.filteredGallery
  );

  const filterData = useSelector(
    (state: RootState) => state.productState.filter
  );

  const pageNumber = useSelector(
    (state: RootState) => state.productState.filteredPage
  );

  const repoProduct = new ProductsRepo();
  const { gallery } = useProducts(repoProduct);
  useEffect(() => {
    gallery(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, pageNumber]);

  const { detailCredentials } = useProducts(repoProduct);
  const navigate = useNavigate();

  const handlerClick = (event: SyntheticEvent) => {
    const valueToDetail =
      event.currentTarget.ariaLabel === null
        ? ""
        : event.currentTarget.ariaLabel;
    const keyToDetail = "sku";

    detailCredentials(keyToDetail + "/" + valueToDetail);

    navigate("/products/details/" + valueToDetail);
  };

  return (
    <>
      <div className="productsPage">
        <h2 className="productsPage__heading">Products</h2>
        <FilterProducts></FilterProducts>
        <div className="productsPage__container">
          <ul className="productsPage__list">
            {galleryArray.map((item: Partial<ProductStructure>) => (
              <li className="productsPageCard" key={"li" + item.id}>
                <div className="productsPageCard__imageContainer">
                  <img
                    className="productsPageCard__image"
                    src={item.image}
                    alt={`${item.shortDescription} card`}
                    aria-label={item.sku}
                    onClick={handlerClick}
                    title="click to see details"
                  ></img>
                </div>
                <div
                  className="productsPageCard__shortDescription"
                  key={"img" + item.id}
                >
                  {item.shortDescription}
                </div>

                <div className="productsPageCard__details">
                  <div>Brand: {item.brand}</div>
                  <div className="productsPageCard__skuContainer">
                    <p>SKU: </p>
                    <p
                      className="productsPageCard__sku"
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
                    className="productsPageCard__stockContainer"
                    title="click to see details"
                  >
                    <div>{"Stock (units):"} </div>
                    <div>
                      <ProductStock
                        sku={item.sku ? item.sku : ""}
                      ></ProductStock>
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
