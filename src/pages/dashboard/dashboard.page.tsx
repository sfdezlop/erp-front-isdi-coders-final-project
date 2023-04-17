import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProductMovements } from "../../hooks/use.productmovements";
import { ProductMovementsRepo } from "../../services/repositories/productmovement.repo";
import { RootState } from "../../store/store";
import "./dashboard.page.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BarChart } from "../../components/barchart/bar.chart";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const analyticsData = useSelector(
    (state: RootState) => state.productMovementState.analytics
  );

  const productUnFilteredCountData = useSelector(
    (state: RootState) => state.productState.unFilteredCount
  );

  const productMovementUnfilteredCountData = useSelector(
    (state: RootState) => state.productMovementState.unfilteredCount
  );

  const repoProductMovement = new ProductMovementsRepo();
  const { dashboardProductMovements } =
    useProductMovements(repoProductMovement);

  useEffect(() => {
    dashboardProductMovements();
  }, []);

  return (
    <>
      {analyticsData.map((item) => (
        <div className="dashboard__container" key={analyticsData.indexOf(item)}>
          <div className="dashboard__graph">
            <p className="dashboard__actualInventoryCostLabel">
              Inventory Value
            </p>
            <div
              className="dashboard__actualInventoryCostLabelEvolution"
              style={{ width: 700 }}
            >
              <BarChart></BarChart>
            </div>

            <p className="dashboard__actualInventoryCost">
              {item.ActualInventoryCost[0].totalValue}
            </p>
          </div>
          <div className="dashboard__metrics">
            <div className="dashboard__metricProduct">
              <p>Total Products</p>
              <p>{productUnFilteredCountData}</p>
            </div>
            <div className="dashboard__metricUnits">
              <p>Total Units at Inventory</p>
              <p>{}</p>
            </div>
            <div className="dashboard__metricValue">
              <p>Total Product Movements</p>
              <p className="dashboard__actualMovementsCount">
                {productMovementUnfilteredCountData}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
