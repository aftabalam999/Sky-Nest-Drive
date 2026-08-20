import React from 'react'
import {ChevronDown} from 'lucide-react'
import Folder from '../components/MainPageComponents/Folder'

const MainContent = () => {
  return (
    <div className='bg-white w-full rounded-2xl mt-2 p-4 text-gray-600'>
        <h1 className='font-semibold text-xl '>Welcome to Sky Nest Drive</h1>
        <div className="flex flex-col mt-6 hover:bg-gray-300 rounded-full w-50 p-2 cursor-pointer">
            <h2 className='flex gap-2 text-md font-semibold'><ChevronDown /> Suggested Folders</h2>
        </div>
        <div className="flex">
            <Folder title="Tech Files"/>
        </div>
    </div>
  )
}

export default MainContent