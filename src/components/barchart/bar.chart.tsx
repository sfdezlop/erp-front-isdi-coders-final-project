import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ProductMovementsRepo } from "../../services/repositories/productmovement.repo";
import { useProductMovements } from "../../hooks/use.productmovements";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  fill: true,
  Animation: true,
  scales: {
    y: {
      // min: Math.round(Math.min(...accumulateScores) * 1.0)
      //   ? 0
      //   : Math.round(Math.min(...accumulateScores) * 1.0),
      // max: Math.max(...accumulateScores),
    },
    x: {},
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export function BarChart() {
  const analyticsArray = useSelector(
    (state: RootState) =>
      state.productMovementState.analytics[0].AnnualInventoryCostVariation as []
  );

  const data = useMemo(
    function () {
      const labelsData = analyticsArray.map((item: { yearOfDate: string }) =>
        Number(item.yearOfDate)
      );
      const scoresData = analyticsArray.map(
        (item: { totalValue: number }) => item.totalValue
      );

      const scoresSliced = (a: number) => scoresData.slice(0, a);
      const accumulateValueOfAnArray = (a: number[]) => {
        //a is the array
        let result = a.reduce((c: any, d: any) => c + d, 0); ////initial value of the callback to avoid 'Reduce of empty array with no initial value' errors
        return result;
      };
      const accumulateScores: any = [];
      for (let i = 1; i < scoresData.length + 1; i++) {
        accumulateScores.push(accumulateValueOfAnArray(scoresSliced(i)));
      }
      return {
        datasets: [
          {
            label: "Yearly Evolution",
            tension: 0.3,
            data: accumulateScores,
            borderColor: "#4472c4",
            backgroundColor: "#4472c4",
          },
        ],
        labels: labelsData,
      };
    },
    [analyticsArray]
  );

  return <Bar data={data} options={options} />;
}
