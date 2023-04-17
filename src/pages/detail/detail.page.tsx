import "./detail.page.css";
import { SyntheticEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../../hooks/use.products";
import { ProductsRepo } from "../../services/repositories/product.repo";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function DetailPage() {
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
  const { detail, addSampleProducts, deleteByIdProducts, galleryProduct } =
    useProducts(repoProduct);

  useEffect(() => {
    detail(detailCredentialsData);
  }, []);

  const navigate = useNavigate();
  // const fieldOfDetailCredentialsData = detailCredentialsData.split("/")[0];
  const valueOfDetailCredentialsData = detailCredentialsData.split("/")[1];
  const dynamicSampleToAddBaseObject = filteredGalleryData.filter(
    (item) => item.sku === valueOfDetailCredentialsData
  )[0];
  const handlerAdd = (event: SyntheticEvent) => {
    const dynamicSampleToAdd = {
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

    addSampleProducts(dynamicSampleToAdd);
    galleryProduct();
    navigate("/products");
  };

  const handlerDelete = (event: SyntheticEvent) => {
    if (detailProductData[0] === undefined) {
      // galleryProduct();
      navigate("/products");
    }

    if (detailProductData[0].brand === "Fake") {
      deleteByIdProducts(detailProductData[0].id);
      // galleryProduct();
      navigate("/products");
    }
    // galleryProduct();
    navigate("/products");
  };
  const handlerUpdate = (event: SyntheticEvent) => {
    navigate("/products");
  };
  return (
    <>
      <h2 className="detail__header">Product Details</h2>
      {detailProductData.map((item) => (
        <article key={item.id}>
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
            </div>{" "}
            {/* <button className="detail__updateButton" onClick={handlerUpdate}>
              Editar
            </button> */}
          </div>
        </article>
      ))}{" "}
      <button className="detail__addButton" onClick={handlerAdd}>
        Add a Fake Product
      </button>
      <button className="detail__deleteButton" onClick={handlerDelete}>
        Delete a Fake Product
      </button>
    </>
  );
}
