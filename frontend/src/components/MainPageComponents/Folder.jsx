import React from 'react'
import {Folder, EllipsisVertical} from "lucide-react"

const SidebarItems = ({title}) => {
  return (
    <div className='flex rounded-2xl p-2 ps-4 bg-gray-200 w-80 align-center justify-between hover:bg-blue-200 cursor-pointer active:bg-blue-300'>
        <div className='flex gap-3'>
        <Folder />
        <h2 className='text-md font-semibold'>{title}</h2>
        </div>
        
        <EllipsisVertical />
    </div>
  )
}

export default SidebarItems