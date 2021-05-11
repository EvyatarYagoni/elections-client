import { ALL_ELECTIONS_DATA } from "../../constants/index.js";
import { Bar } from "react-chartjs-2";
import "./StaticBarChart.css";

import React, { useState, useEffect } from "react";

/*
 * Creating Static Bar Chart
 * with my manually input.
 * @return  {Bar}  Bar Chart component from react-chartjs-2
 */

function StaticBarChart() {
  //intial elections state
  const [elections, setElections] = useState({
    xLabel: "",
    yLabel: "",
    colors: [],
  });

  /*
   * Loading All elections data in the first and last time.
   * In addition sets create random colors for Bar Chart.
   */
  useEffect(() => {
    const xLabel = ALL_ELECTIONS_DATA.map((item) => item.x);
    const yLabel = ALL_ELECTIONS_DATA.map((item) => item.y);
    let colors = [];

    for (let i = 0; i < xLabel.length; i++) {
      let randomBetween = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));
      let r = randomBetween(0, 255);
      let g = randomBetween(0, 255);
      let b = randomBetween(0, 255);
      let rgba = `rgb(${r},${g},${b},0.3)`; // Collect all to a css color string
      colors.push(rgba);
    }
    setElections({
      xLabel: xLabel,
      yLabel: yLabel,
      colors: colors,
    });
  }, []);

  /*
   * All Data for Bar Chart.
   */
  const data = {
    labels: elections.xLabel,
    datasets: [
      {
        label: "מפלגות שעברו את אחוז החסימה",
        backgroundColor: elections.colors,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,0,0,0.8)",
        data: elections.yLabel,
      },
    ],
  };

  return (
    <div className="StaticbarChart">
      <h1 className="StaticTitle">
        תוצאות בחירות: 2021-1948 (הזנת נתונים באופן ידני)
      </h1>

      <Bar
        id="barChart"
        data={data}
        width={50}
        height={50}
        options={{
          aspectRatio: 0,
        }}
      />
    </div>
  );
}

export default StaticBarChart;
