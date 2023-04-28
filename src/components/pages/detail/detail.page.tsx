import "./detail.page.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../../../hooks/use.products";
import { ProductsRepo } from "../../../services/repositories/product.repo";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { ProductStock } from "../../microservices/product.stock/product.stock";
import { Loader } from "../../loader/loader";
import MovementsPage from "../movements/movements.page";

export default function DetailPage() {
  const [renderNumber, setRenderNumber] = useState(1);

  const userCreatorFullNames = useSelector(
    (state: RootState) => state.userState.usersGallery
  );

  const userLoggedEmailData = useSelector(
    (state: RootState) => state.userState.userLogged.email
  );

  const detailProductData = useSelector(
    (state: RootState) => state.productState.detail
  );

  const detailCredentialsData = useSelector(
    (state: RootState) => state.productState.detailCredentials
  );
  const filteredGalleryData = useSelector(
    (state: RootState) => state.productState.filteredGallery
  );

  const repoProduct = new ProductsRepo();
  const { readDetailById, createSample, deleteById, gallery } =
    useProducts(repoProduct);

  useEffect(() => {
    readDetailById(detailCredentialsData);
    setRenderNumber(2);
  }, [renderNumber]);

  const navigate = useNavigate();
  const valueOfDetailCredentialsData = detailCredentialsData.split("/")[1];
  const dynamicSampleToAddBaseObject = filteredGalleryData.filter(
    (item) => item.sku === valueOfDetailCredentialsData
  )[0];
  const handlerAdd = () => {
    const dynamicSampleOfProductToAdd = {
      sku: dynamicSampleToAddBaseObject.sku + "_fake",
      shortDescription: dynamicSampleToAddBaseObject.shortDescription + "_fake",
      longDescription: dynamicSampleToAddBaseObject.longDescription + "_fake",
      ean: dynamicSampleToAddBaseObject.ean + "_fake",
      brand: "Fake",
      image: "https://facecrooks.com/wp-content/uploads/2017/03/fake_stamp.jpg",
      userCreatorEmail: userLoggedEmailData,
      costPerUnit: dynamicSampleToAddBaseObject.costPerUnit,
      pricePerUnit: dynamicSampleToAddBaseObject.pricePerUnit,
    };

    createSample(dynamicSampleOfProductToAdd);
    gallery();
    navigate("/products");
  };

  const handlerDelete = (event: SyntheticEvent) => {
    if (detailProductData[0] === undefined) {
      gallery();
      navigate("/products");
    }

    if (detailProductData[0].brand === "Fake") {
      deleteById(detailProductData[0].id);
      gallery();
      navigate("/products");
    }
    navigate("/products");
  };

  if (renderNumber === 1) {
    return <Loader></Loader>;
  } else {
    return (
      <>
        <div className="detailPage">
          <h2 className="detail__heading">Product Details</h2>
          {detailProductData.map((item) => (
            <article key={item.id} className="detail__article">
              <div className="detail__container">
                <div className="detail__imageContainer">
                  <img
                    className="detail__image"
                    src={item.image}
                    alt={`${item.shortDescription} card`}
                  ></img>
                </div>
                <div className="detail__dataContainer">
                  <div>Brand: {item.brand}</div>
                  <div>ID: {item.id}</div>
                  <div>SKU: {item.sku}</div>
                  <div>EAN: {item.ean}</div>
                  <div>Cost (€): {item.costPerUnit}</div>
                  <div>Price (€): {item.pricePerUnit}</div>
                  {/* <div className="detail__stock">
                Stock of {item.sku} loaded to productMovementState (units):
                {" " +
                  stockArrayData.filter(
                    (item) => item._id === detailProductData[0].sku
                  )[0].stock}
              </div> */}
                  <div className="detail__microServiceStock">
                    <div>{"Stock (units):"}</div>
                    <div>
                      <ProductStock sku={item.sku}></ProductStock>
                    </div>
                  </div>
                  <div>
                    Created by:
                    {" " +
                      userCreatorFullNames.filter(
                        (item) =>
                          item.email === detailProductData[0].userCreatorEmail
                      )[0].firstName +
                      " " +
                      userCreatorFullNames.filter(
                        (item) =>
                          item.email === detailProductData[0].userCreatorEmail
                      )[0].lastName}
                  </div>
                </div>
                <div className="detail__descriptionContainer">
                  <div className="detail__shortDescription">
                    Short Description: {item.shortDescription}
                  </div>
                  <div className="detail__shortDescriptionInput"></div>
                  <div className="detail__longDescription">
                    Long Description: {item.longDescription}
                  </div>

                  <div>
                    <div className="detail__longDescriptionInput"></div>
                  </div>
                </div>
                <div className="detail__buttonsContainer">
                  <button className="detail__addButton" onClick={handlerAdd}>
                    Add a Fake Product
                  </button>
                  {item.brand === "Fake" ? (
                    <button
                      className="detail__deleteButton"
                      onClick={handlerDelete}
                    >
                      Delete a Fake Product
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </>
    );
  }
}
