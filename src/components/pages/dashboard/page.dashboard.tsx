import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./page.dashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useProductMovements } from "../../../hooks/use.productmovements";
import { ProductMovementsRepo } from "../../../services/repositories/productmovement.repo";
import { RootState } from "../../../store/store";
import { BarChart } from "../../barchart/bar.chart";
import { MicroServiceMeasureCollection } from "../../microservices/microservices.collection/microservice.measure.collection";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Warning: If dependency array is deleted, even if it is empty, the component loops
  return (
    <>
      <div className="dashboardPage">
        <h2 className="dashboardPage__heading">Dashboard</h2>
        {analyticsData.map((item) => (
          <div
            className="dashboardPage__container"
            key={analyticsData.indexOf(item)}
          >
            <div className="dashboardPage__graphContainer">
              <p className="dashboardPage__graphTitle">Inventory Valuation</p>
              <div
                className="dashboardPage__graph"
                style={{ width: 900, height: 300, padding: 10 }}
              >
                <BarChart></BarChart>
              </div>

              <p className="dashboardPage__graphFooter">
                <MicroServiceMeasureCollection
                  measureInputData={{
                    measure: "productstockcost",
                    measureInput: "",
                  }}
                  controlInfo=""
                ></MicroServiceMeasureCollection>
              </p>
            </div>
            <div className="dashboardPage__metricsContainer">
              <div className="dashboardPage__metricContainer">
                <div className="dashboardPage__metricLabel">Total Products</div>
                <div className="dashboardPage__metricData">
                  <MicroServiceMeasureCollection
                    measureInputData={{
                      measure: "countdocumentsbycollection",
                      measureInput: "products",
                    }}
                    controlInfo=""
                  ></MicroServiceMeasureCollection>
                </div>
              </div>
              <div className="dashboardPage__metricContainer">
                <div className="dashboardPage__metricLabel">
                  Total Units at Inventory
                </div>
                <div className="dashboardPage__metricData">
                  <MicroServiceMeasureCollection
                    measureInputData={{
                      measure: "productstockunits",
                      measureInput: "",
                    }}
                    controlInfo=""
                  ></MicroServiceMeasureCollection>
                </div>
              </div>
              <div className="dashboardPage__metricContainer">
                <div className="dashboardPage__metricLabel">
                  Total Product Movements
                </div>
                <div className="dashboardPage__metricData">
                  <MicroServiceMeasureCollection
                    measureInputData={{
                      measure: "countdocumentsbycollection",
                      measureInput: "productmovements",
                    }}
                    controlInfo=""
                  ></MicroServiceMeasureCollection>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
