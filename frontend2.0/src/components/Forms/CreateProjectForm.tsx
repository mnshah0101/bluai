'use client';
import { Add, Calendar2, NoteText, TickCircle } from 'iconsax-react'
import React, { useState } from 'react'
import {useUser} from "@propelauth/nextjs/client";
import {useRouter} from "next/navigation";


   function isValidGithubRepoUrl(url: string): boolean {
     return url.includes('github.com');

}

function CreateProjectForm() {

      const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [githubRepoLink, setGithubRepoLink] = useState("");
  const [error, setError] = useState("");

    const {loading, user} = useUser();

    const router = useRouter();

 
 
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

    router.push("/app/project/" + data.project._id);


}


  



    return (
        <div className='border text-gray-500 w-full mx-4 p-3 max-w-4xl rounded-2xl'>
            {/* header */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center text-sm gap-2'>
                    <NoteText size={18} />
                    <p className='text-gray-800 font-medium'>Form</p>
                </div>
               
            </div>

            <hr className='bg-gray-400 my-4' />

            {/* content */}
            <div className='space-y-3'>
                {/* note 1 */}
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


    <button type='submit' style={{backgroundColor:"#7968F5"}} className=" hover:bg-blue-700 text-white font-bold my-3 py-2 px-4 rounded-full">Submit</button>


    <p className="text-red-500 my-3">{error}</p>
 
   

     
        


       </form>



                {/* note 2 */}
               

            </div>
        </div>
    )
}

export default CreateProjectForm