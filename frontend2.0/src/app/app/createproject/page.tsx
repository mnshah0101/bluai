'use client';
import CreateProjectForm from "@/components/Forms/CreateProjectForm"
export default function CreateProject() {
    return (

    <div className="container mx-20">
    
    <div className="d-flex w-full flex-row mt-20 justify-content-center align-items-center">

        <div className='flex items-center justify-between my-6'>
            <h1 className='text-2xl font-semibold text-gray-800'>Create Project</h1>
        </div>

        <CreateProjectForm />


</div>
    </div>
    )
};