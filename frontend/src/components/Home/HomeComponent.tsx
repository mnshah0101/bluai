'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@propelauth/nextjs/client';


export default function HomeComponent() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/api/auth/login');
    }
  }, [  ]);

  return (
    <div>
      <h1 className='text-4xl	'>Welcome to Blu AI</h1>

      <p className='my-4'>Blu AI audits your code for environmental impact and provides suggestions for improvement.</p>

      <div className='my-4'>
        <h2 className='text-3xl'>Documentation</h2>
        <p className='my-4'>The following section details the Blu documentation. </p>

        <ul>
          <li className='my-2'>
            <p className='font-bold'>Getting Started</p>

            <p>Click the "Create Project" button on the side menu. You will be redirected to the Create Project Page </p>

          </li>

           <li className='my-3'>
            <p className='font-bold'>Create Project</p>

            <p>Fill out the project form, inputting your project's name, the description of the project and the Github Repo URL.</p>

          </li>
      

           <li className='my-3'>
            <p className='font-bold'>Get Suggestions</p>

            <p>You will be redirected to your project page. Here you can view your project's carbon and water usage. To get actionable insights into improving your code, press Get Suggestions.</p>

          </li>

           <li className='my-3'>
            <p className='font-bold'>Usage</p>

            <p>To track your carbon usage, use the Blu API with your project API key through the body of your request, along with your OPENAI Key and your question. Then, your OPEN_AI response will be returned and the carbon/water effects will be tracked. </p>

          </li>
          
        </ul>
        
        </div>
    </div>
  );
}


