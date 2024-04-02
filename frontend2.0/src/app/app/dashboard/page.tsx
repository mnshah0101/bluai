"use client"

import CourseProgress from '@/components/Cards/CourseProgress'
import CurrentProject from '@/components/Cards/CurrentProject'
import EmployeeSpotlight from '@/components/Cards/EmployeeSpotlight'
import Notes from '@/components/Cards/Notes'
import StatusTracker from '@/components/Cards/StatusTracker'
import TimeTracker from '@/components/Cards/TimeTracker'
import TraningAnalysis from '@/components/Cards/TraningAnalysis'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { AuthProvider } from '@propelauth/nextjs/client'


function Home() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebarChange = (value: boolean) => {
    setIsSidebarOpen(value)
  }

  return (

    

          <div className='p-4 md:p-6 space-y-4 columns-1 sm:columns-2 lg:columns-3'>

           

            

           

            <div className='break-inside-avoid-column space-y-4'>
              <Notes />
            </div>

            <div className='break-inside-avoid-column space-y-4'>
              <StatusTracker />
            </div>

            <div className='break-inside-avoid-column space-y-4'>
              <CurrentProject />
            </div>
          </div>

       
  )
}

export default Home