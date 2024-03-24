import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#10ACCF"],
  labels: ["Your Score", "Full ESG"],
  legend: {
    show: true,
    position: "bottom",
  },
  

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
        labels: {
            show: true,
            name: { show: false },
            total: {
              show: true,
              label: "Your Score",
              fontSize: "20px",
              color: "#3C50E0",
              formatter: function (w: any) {
                return w.globals.seriesTotals[0];
              },
            },
          }
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
 
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
    

  ],

};

const ChartThree = (props: any) => {
  const [state, setState] = useState<ChartThreeState>({
    series: [props.esg, 800-props.esg],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34],
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Your ESG Score
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
          
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
            
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          
          />
        </div>
      </div>

     
    </div>
  );
};

export default ChartThree;
