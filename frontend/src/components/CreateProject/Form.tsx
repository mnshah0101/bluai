"use client";
import React, { useState } from "react";
import ChartTwo from "../Charts/ChartTwo";
import CardDataStats from "../CardDataStats";
import {useUser} from "@propelauth/nextjs/client";
import { useRouter } from "next/navigation";

function isValidGithubRepoUrl(url: string): boolean {
     return url.includes('github.com');

}

const Form: React.FC = () => {
  const {loading, user} = useUser();
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [githubRepoLink, setGithubRepoLink] = useState("");
  const [error, setError] = useState("");

  async function handleInput(e : any){
    const {name, value} = e.target;
    if(name === "project_name"){
      setProjectName(value);
    }else if(name === "project_description"){
      setProjectDescription(value);
    }else if(name === "github_link"){
      setGithubRepoLink(value);
    }
    
    
  }

  async function handleSubmit(e : any){
    e.preventDefault();
    console.log("Project Name: ", projectName);
    console.log("Project Description: ", projectDescription);
    console.log("Github Repo Link: ", githubRepoLink);

    if(!isValidGithubRepoUrl(githubRepoLink)){
      setError("Invalid Github Repo URL");
      return;
    }
    if(!projectName || !projectDescription || !githubRepoLink){
      setError("All fields are required");
      return;
    }

    if(!user){
      setError("You need to be logged in to create a project");
      return;
    }

    let response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/projects", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: projectName,
        description: projectDescription,
        link: githubRepoLink,
        user: user
      }),
    });

    let data = await response.json(); 

    console.log(data);


    if(response.status !== 200){
      console.log('there was an error creating the project');
      setError(data.error);
      return;
    }

    router.push("/project/" + data.project._id);

    

 



  }






  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Single AI Training C02 Footprint" total="636K lbs" rate="" >
        <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M7 21C7 21 7.5 16.5 11 12.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </CardDataStats>
        <CardDataStats title="of water withdrawal in 2027" total="6.6B m3" rate="" >
         <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M13 21.5704C10.5996 21.8661 8.09267 21.0927 6.25001 19.25C3.07437 16.0744 3.07437 10.9256 6.25001 7.74999L11.5757 2.42426C11.8101 2.18995 12.1899 2.18995 12.4243 2.42426L17.75 7.75001C19.982 9.98202 20.6453 13.1887 19.7397 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 20L18 22L22 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </CardDataStats>
        <CardDataStats title="per 10-50 GPT prompts" total="500ml" rate="" >
         <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M2 12H4" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 12H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 20.01L3.01 19.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 16.01L6.01 15.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 20.01L9.01 19.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 20.01L15.01 19.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 16.01L18.01 15.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 20.01L21.01 19.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.3962 3.39622L15.5 6.49999C17.433 8.43299 17.433 11.567 15.5 13.5C13.567 15.433 10.433 15.433 8.50001 13.5C6.56701 11.567 6.56701 8.43299 8.50001 6.49999L11.6038 3.39621C11.8226 3.17738 12.1774 3.17738 12.3962 3.39622Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </CardDataStats>
        <CardDataStats title="of average GPT annual C02 consumption" total="8.4 tons" rate="" >
     <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 2L7 6.64286C7 6.64286 10.0424 7 12 7C13.9576 7 17 6.64286 17 6.64286L12 2Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 7L5 10.9394C5 10.9394 7.625 12 12 12C16.375 12 19 10.9394 19 10.9394L15.5 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.5 11.5L3 15.5231C3 15.5231 5.7 18 12 18C18.3 18 21 15.5231 21 15.5231L17.5 11.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22L12 19" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-8 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
         <div className="col-span-4 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="mb-4 gap-4 sm:flex flex flex-col">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Create Project
          </h4>
        </div>

       <form className="flex flex-col" onSubmit={e=>handleSubmit(e)}>


    <div className="md:w-3/3 my-2">
           <input onChange={e=>handleInput(e)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary" id="project_name" name="project_name" type="text" placeholder="Project Name"/>

    </div>

       <div className="md:w-3/3 my-2">
    
      <textarea onChange={e=>handleInput(e)} rows={7} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary" id="project_description" name="project_description" placeholder="Project Description"/>
    </div>

     <div className="md:w-3/3 my-2">
    
           <input onChange={e=>handleInput(e)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary" id="github_link" name="github_link" type="text" placeholder="Github Repo Link (github.com/user/myrepo)"/>
    </div>


    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 py-2 px-4 rounded-full">Submit</button>


    <p className="text-red-500 my-3">{error}</p>
 
   

     
        


       </form>

       

      
       
      </div>

   
    </div>

   <ChartTwo></ChartTwo>

 
        
      </div>
      
    </>
  );
};

export default Form;
