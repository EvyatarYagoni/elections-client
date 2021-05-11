import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../BarChart/BarChart.css";
import axios from "axios";
import CircleLoader from "../CircleLoader/CircleLoader.js";

/*
 * Creating Bar Chart
 * with my manually input.
 * @return  {Bar}  Bar Chart component from react-chartjs-2
 */
function BarChart() {
  const [elections, setElections] = useState({
    xLabel: "",
    yLabel: "",
    colors: "",
  });

  /*
   * Loading All elections data in the first and last time.
   * In addition sets create random colors for Bar Chart.
   * I added this  setTimeout function because fetching
   * the data takes time and in the real world the
   * server is always running and the data is
   * already In it.
   */
  useEffect(() => {
    setTimeout(() => {
      const AllElectionsData48UpTo2021 = async () => {
        const fetchedData = await axios.get("http://localhost:5000/election");
        const xLabel = fetchedData.data.map((item) => item.x);
        const yLabel = fetchedData.data.map((item) => item.y);
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
      };
      AllElectionsData48UpTo2021();
    }, 120000);
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
    <>
      {elections.xLabel ? (
        <div className="barChart">
          <h1 className="title">תוצאות בחירות: 2021-1948</h1>

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
      ) : (
        <CircleLoader />
      )}
    </>
  );
}

export default BarChart;
