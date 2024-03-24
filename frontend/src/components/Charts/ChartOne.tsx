import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

type ProjectProps = {
  project: string;
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne = ({ project }: ProjectProps): JSX.Element => {

  const [x_ticks, setX_ticks] = useState<string[]>([]);
  const [water_footprint, setWater_footprint] = useState<number[]>([]);
  const [carbon_footprint, setCarbon_footprint] = useState<number[]>([]);
  const [tokens, setTokens] = useState<number[]>([]);


  async function get_data() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + `/api/projects/footprint/${project}`
    );
    const data = await response.json();
    console.log("footprint data")
    console.log(data);
    setX_ticks(data.x_ticks);
    setWater_footprint(data.water_footprint);
    setCarbon_footprint(data.carbon_footprint);
    setTokens(data.tokens);

    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Water Usage (mL)",
          data: data.water_footprint,
        },

        {
          name: "Carbon Emissions (gallons)",
          data: data.carbon_footprint,
        },
         {
          name: "Token Usage (tokens)",
          data: data.tokens,
        }
      ],
    }));


  }
  useEffect(() => {
    get_data();
  }, []);








  const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE", "#FF4560"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE", "#FF4560"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: x_ticks,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Water Usage",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      {
        name: "Carbon Emissions",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
       {
        name: "Token Usage",
        data: [20, 22, 33, 30, 45, 34, 64, 42, 53, 50, 39, 50],
      }
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">

       <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Water, Carbon, and Energy Usage
      </h4>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Water Usage</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Carbon Emissions</p>
            </div>
          </div>

           <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-danger">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-danger"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-danger">Total Token Usage</p>
            </div>
          </div>
        </div>
        
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
