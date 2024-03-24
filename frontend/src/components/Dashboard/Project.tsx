"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import TableOne from "../Tables/TableOne";
import {useUser} from "@propelauth/nextjs/client";

type ProjectProps = {
  project: string;
};

const Project = ({ project }: ProjectProps): JSX.Element => {
  const {loading, user} = useUser();









  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
     
     
        
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <div className="col-span-12 xl:col-span-12 ">
          <TableOne  project = {project}/>

        </div>
      </div>
    </>
  );
};

export default Project;
