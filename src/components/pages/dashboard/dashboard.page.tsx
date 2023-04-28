import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./dashboard.page.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useProductMovements } from "../../../hooks/use.productmovements";
import { ProductMovementsRepo } from "../../../services/repositories/productmovement.repo";
import { RootState } from "../../../store/store";
import { BarChart } from "../../barchart/bar.chart";

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
      <div className="dashboardPage">
        <h2 className="dashboardPage__heading">Dashboard</h2>
        {analyticsData.map((item) => (
          <div
            className="dashboardPage__container"
            key={analyticsData.indexOf(item)}
          >
            <div className="dashboardPage__graph">
              <p className="dashboardPage__actualInventoryCostLabel">
                Inventory Value
              </p>
              <div
                className="dashboardPage__actualInventoryCostLabelEvolution"
                style={{ width: 700 }}
              >
                <BarChart></BarChart>
              </div>

              <p className="dashboardPage__actualInventoryCost">
                {item.ActualInventoryCost[0].totalValue}
              </p>
            </div>
            <div className="dashboardPage__metrics">
              <div className="dashboardPage__metricProduct">
                <p>Total Products</p>
                <p>{productUnFilteredCountData}</p>
              </div>
              <div className="dashboardPage__metricUnits">
                <p>Total Units at Inventory</p>
                <p>{}</p>
              </div>
              <div className="dashboardPage__metricValue">
                <p>Total Product Movements</p>
                <p className="dashboardPage__actualMovementsCount">
                  {productMovementUnfilteredCountData}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
