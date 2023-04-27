import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProductMovements } from "../../../hooks/use.productmovements";
import { ProductMovementsRepo } from "../../../services/repositories/productmovement.repo";
import { RootState } from "../../../store/store";
import "./movements.page.css";
import { FilterProductMovements } from "../../filter.productmovements/filter.productmovements";

export default function MovementsPage() {
  const filteredGalleryData = useSelector(
    (state: RootState) => state.productMovementState.filteredGallery
  );

  const filterData = useSelector(
    (state: RootState) => state.productMovementState.filter
  );

  const pageNumber = useSelector(
    (state: RootState) => state.productMovementState.filteredPage
  );

  const repoProductMovement = new ProductMovementsRepo();
  const { galleryProductMovement } = useProductMovements(repoProductMovement);

  useEffect(() => {
    galleryProductMovement();
  }, [filterData, pageNumber]);

  const handlerDelete = () => {};

  return (
    <>
      <FilterProductMovements></FilterProductMovements>
      <div className="productMovementsPage__container">
        <div className="productMovementsPage__fieldContainer">
          <div className="productMovementsPage__field">Date</div>
          <div className="productMovementsPage__field">SKU</div>
          <div className="productMovementsPage__field">Batch</div>{" "}
          <div className="productMovementsPage__field">Store</div>
          <div className="productMovementsPage__field">Units</div>
          <div className="productMovementsPage__field">Type</div>
          <div className="productMovementsPage__field">Type ID</div>
          <div className="productMovementsPage__field">Cost/unit</div>
          <div className="productMovementsPage__field">Price/unit</div>
          <div className="productMovementsPage__field">Delete</div>
        </div>
        <div className="productMovementsPage__dataContainer">
          {filteredGalleryData.map((item) => (
            <li className="productMovementsPage__dataRow" key={item.id}>
              <div className="productMovementsPage__data">{item.date}</div>{" "}
              <div className="productMovementsPage__data">
                {item.productSku}
              </div>
              <div className="productMovementsPage__data">{item.batch}</div>{" "}
              <div className="productMovementsPage__data">{item.store}</div>
              <div className="productMovementsPage__data">{item.units}</div>
              <div className="productMovementsPage__data">{item.type}</div>
              <div className="productMovementsPage__data">{item.typeId}</div>
              <div className="productMovementsPage__data">
                {item.costPerUnit}
              </div>
              <div className="productMovementsPage__data">
                {item.pricePerUnit}
              </div>
              <div className="productMovementsPage__data productMovementsPage__delete">
                <button aria-label={item.id} onClick={handlerDelete}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
