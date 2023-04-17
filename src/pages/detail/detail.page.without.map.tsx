import "./detail.page.css";
import { SyntheticEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../../hooks/use.products";
import { ProductsRepo } from "../../services/repositories/product.repo";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function DetailPageWithoutMap() {
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
  const { detail, addSampleProducts, deleteByIdProducts } =
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
    navigate("/products");
  };

  const handlerDelete = (event: SyntheticEvent) => {
    detailProductData[0].brand === "Fake"
      ? deleteByIdProducts(detailProductData[0].id)
      : navigate("/products");
    navigate("/products");
  };
  const handlerUpdate = (event: SyntheticEvent) => {
    navigate("/products");
  };
  return (
    <>
      <h2 className="detail__header">Detalle del Producto sin Mapping</h2>
      <article key={detailProductData[0].id}>
        <div className="detail__container">
          <div className="detail__imageContainer">
            <img
              className="detail__image"
              src={detailProductData[0].image}
              alt={`${detailProductData[0].shortDescription} card`}
            ></img>
          </div>
          <div className="detail__dataContainer">
            <div>Marca: {detailProductData[0].brand}</div>
            <div>ID: {detailProductData[0].id}</div>
            <div>SKU: {detailProductData[0].sku}</div>
            <div>EAN: {detailProductData[0].ean}</div>
            <div>Coste (€): {detailProductData[0].costPerUnit}</div>
            <div>Precio (€): {detailProductData[0].pricePerUnit}</div>
            <div>
              Creado por:
              {userCreatorFullNames.filter(
                (item) => item.email === detailProductData[0].userCreatorEmail
              )[0].firstName +
                " " +
                userCreatorFullNames.filter(
                  (item) => item.email === detailProductData[0].userCreatorEmail
                )[0].lastName}
            </div>
          </div>
          <div className="detail__descriptionContainer">
            <div className="detail__shortDescription">
              Descripción en tarifa: {detailProductData[0].shortDescription}
            </div>
            <div className="detail__shortDescriptionInput"></div>
            <div className="detail__longDescription">
              Descripción en catálogo: {detailProductData[0].longDescription}
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

      <button className="detail__addButton" onClick={handlerAdd}>
        Add a Fake Product
      </button>
      <button className="detail__deleteButton" onClick={handlerDelete}>
        Delete a Fake Product
      </button>
    </>
  );
}
