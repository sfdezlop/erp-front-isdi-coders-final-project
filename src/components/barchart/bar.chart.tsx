import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
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
  // Chart,
} from "chart.js";
import {
  Chart,
  Bar,
  getElementAtEvent,
  getDatasetAtEvent,
} from "react-chartjs-2";
import { accumulateValueOfAnArrayOfNumbers } from "../../services/helpers/functions";

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
  const chartRef = useRef();
  const measure = useRef("Annual Evolution");
  const [measureLocal, setMeasureLocal] = useState("Annual Evolution");

  const onClick = (event: SyntheticEvent) => {};

  const onChangeMetric = (event: SyntheticEvent<HTMLSelectElement>) => {
    const selector = event.currentTarget;
    measure.current = selector.value;
    setMeasureLocal(selector.value);
  };

  const AnnualInventoryCostVariation = useSelector(
    (state: RootState) =>
      state.productMovementState.analytics[0].AnnualInventoryCostVariation as []
  );

  const MonthlyInventoryCostVariation = useSelector(
    (state: RootState) =>
      state.productMovementState.analytics[0]
        .MonthlyInventoryCostVariation as []
  );

  const data = function () {
    const labelsDataAnnualInventoryCostVariation =
      AnnualInventoryCostVariation.map(
        (item: { yearOfDate: string }) => item.yearOfDate
      );

    const labelsDataMonthlyInventoryCostVariation =
      MonthlyInventoryCostVariation.map(
        (item: { yearMonthOfDate: string }) => item.yearMonthOfDate
      );
    const scoresDataAnnualInventoryCostVariation =
      AnnualInventoryCostVariation.map(
        (item: { totalValue: number }) => item.totalValue
      );

    const scoresDataMonthlyInventoryCostVariation =
      MonthlyInventoryCostVariation.map(
        (item: { totalValue: number }) => item.totalValue
      );

    const scoresSlicedAnnualInventoryCostVariation = (a: number) =>
      scoresDataAnnualInventoryCostVariation.slice(0, a);

    const scoresSlicedMonthlyInventoryCostVariation = (a: number) =>
      scoresDataMonthlyInventoryCostVariation.slice(0, a);

    const accumulateScoresAnnualInventoryCostVariation: any = [];
    for (
      let i = 1;
      i < scoresDataAnnualInventoryCostVariation.length + 1;
      i++
    ) {
      accumulateScoresAnnualInventoryCostVariation.push(
        accumulateValueOfAnArrayOfNumbers(
          scoresSlicedAnnualInventoryCostVariation(i)
        )
      );
    }
    const accumulateScoresMonthlyInventoryCostVariation: any = [];
    for (
      let i = 1;
      i < scoresDataMonthlyInventoryCostVariation.length + 1;
      i++
    ) {
      accumulateScoresMonthlyInventoryCostVariation.push(
        accumulateValueOfAnArrayOfNumbers(
          scoresSlicedMonthlyInventoryCostVariation(i)
        )
      );
    }

    return {
      datasets: [
        {
          label: measure.current,
          // label: "Yearly Evolution",
          tension: 0.3,
          data:
            // measure.current === "Annual Evolution"
            measureLocal === "Annual Evolution"
              ? accumulateScoresAnnualInventoryCostVariation
              : accumulateScoresMonthlyInventoryCostVariation,
          // data: accumulateScoresAnnualInventoryCostVariation,
          borderColor: "#4472c4",
          backgroundColor: "#4472c4",
        },
      ],
      labels:
        // measure.current === "Annual Evolution"
        measureLocal === "Annual Evolution"
          ? labelsDataAnnualInventoryCostVariation
          : labelsDataMonthlyInventoryCostVariation,
    };
  };

  //With memonization of data
  // const data = useMemo(function () {
  //   const labelsDataAnnualInventoryCostVariation =
  //     AnnualInventoryCostVariation.map(
  //       (item: { yearOfDate: string }) => item.yearOfDate
  //     );

  //   const labelsDataMonthlyInventoryCostVariation =
  //     MonthlyInventoryCostVariation.map(
  //       (item: { yearMonthOfDate: string }) => item.yearMonthOfDate
  //     );
  //   const scoresDataAnnualInventoryCostVariation =
  //     AnnualInventoryCostVariation.map(
  //       (item: { totalValue: number }) => item.totalValue
  //     );

  //   const scoresDataMonthlyInventoryCostVariation =
  //     MonthlyInventoryCostVariation.map(
  //       (item: { totalValue: number }) => item.totalValue
  //     );

  //   const scoresSlicedAnnualInventoryCostVariation = (a: number) =>
  //     scoresDataAnnualInventoryCostVariation.slice(0, a);

  //   const scoresSlicedMonthlyInventoryCostVariation = (a: number) =>
  //     scoresDataMonthlyInventoryCostVariation.slice(0, a);

  //   const accumulateScoresAnnualInventoryCostVariation: any = [];
  //   for (
  //     let i = 1;
  //     i < scoresDataAnnualInventoryCostVariation.length + 1;
  //     i++
  //   ) {
  //     accumulateScoresAnnualInventoryCostVariation.push(
  //       accumulateValueOfAnArrayOfNumbers(
  //         scoresSlicedAnnualInventoryCostVariation(i)
  //       )
  //     );
  //   }
  //   const accumulateScoresMonthlyInventoryCostVariation: any = [];
  //   for (
  //     let i = 1;
  //     i < scoresDataMonthlyInventoryCostVariation.length + 1;
  //     i++
  //   ) {
  //     accumulateScoresMonthlyInventoryCostVariation.push(
  //       accumulateValueOfAnArrayOfNumbers(
  //         scoresSlicedMonthlyInventoryCostVariation(i)
  //       )
  //     );
  //   }

  //   return {
  //     datasets: [
  //       {
  //         label: measure.current,
  //         // label: "Yearly Evolution",
  //         tension: 0.3,
  //         data:
  //           measure.current === "Annual Evolution"
  //             ? accumulateScoresAnnualInventoryCostVariation
  //             : accumulateScoresMonthlyInventoryCostVariation,
  //         // data: accumulateScoresAnnualInventoryCostVariation,
  //         borderColor: "#4472c4",
  //         backgroundColor: "#4472c4",
  //       },
  //     ],
  //     labels:
  //       measure.current === "Annual Evolution"
  //         ? labelsDataAnnualInventoryCostVariation
  //         : labelsDataMonthlyInventoryCostVariation,
  //     // labels: labelsDataAnnualInventoryCostVariation,
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("print");
  // }, []);
  return (
    <>
      <select name="order_typeXX" onChange={onChangeMetric}>
        {measureLocal}

        <option
          key={"Annual Evolution"}
          selected={measureLocal === "Annual Evolution"}
        >
          {"Annual Evolution"}
        </option>
        <option
          key={"Monthly Evolution"}
          selected={measureLocal === "Monthly Evolution"}
        >
          {"Monthly Evolution"}
        </option>
      </select>
      {/* <div> {"measureLocal: " + measureLocal}</div>
      <div> {"measure.current: " + measure.current}</div> */}
      <Chart
        type="bar"
        data={data()}
        options={options}
        ref={chartRef}
        onClick={onClick}
      />
    </>
  );
}
