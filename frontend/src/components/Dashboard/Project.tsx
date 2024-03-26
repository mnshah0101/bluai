"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import TableOne from "../Tables/TableOne";
import {useUser} from "@propelauth/nextjs/client";

type ProjectProps = {
  project: string;
};

const Project = ({ project }: ProjectProps): JSX.Element => {
  const {loading, user} = useUser();
  const [projectKey, setProjectKey] = React.useState<string>("");

  async function getProjectKey() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + `/api/projects/key/${project}`
    );
    const data = await response.json();
    setProjectKey(data.key);
  }

  React.useEffect(() => {
    getProjectKey();
  }, []);









  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
     
     
        
      </div>

    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Your Project API Key
      </h4>
      {projectKey}
         </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne project = {project} />
        <div className="col-span-12 xl:col-span-12 ">
          <TableOne  project = {project}/>

        </div>
      </div>
    </>
  );
};

export default Project;
