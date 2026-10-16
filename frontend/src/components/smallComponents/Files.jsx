import React from 'react'
import {FileText, EllipsisVertical} from "lucide-react"



const Files = ({img,fileName}) => {
    const filename = fileName.split('').slice(0, 15).join('');
    
  return (
    <div className="flex flex-col p-4 bg-blue-100 flex-1 min-w-80 max-w-100 h-90 rounded-2xl">
        <div className="flex mb-4 justify-between">
            <FileText className='w-1/5' />
            <p className='w-2/5 text-nowrap overflow-hidden'>{fileName.length>15 ? `${filename} ...` : fileName}</p>
            <EllipsisVertical className='w-1/5 cursor-pointer'/>
        </div>
        <img src={img} alt="File image" className='w-full object-cover overflow-hidden rounded-md'/>

    </div>
  )
}

export default Files