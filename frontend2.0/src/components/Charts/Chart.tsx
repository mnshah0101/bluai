import { Chart } from "react-google-charts";

export default function ChartComponent() {
  return (
    <div>
      <Chart
        chartType="LineChart"
        data={[
          ["Day", "Carbon", "Water", "Token"],
          [1, 5.5, 4, 3],
          [2, 12, 6, 5],
          [3, 15, 7, 6],
          [4, 20, 8, 7],
          [5, 25, 9, 8],
          [6, 30, 10, 9],
          [7, 35, 11, 10],
        ]}
        options={{
          title: "Carbon, Water, and Token Usage",
          curveType: "function",
          legend: { position: "bottom" },
        }}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
}
