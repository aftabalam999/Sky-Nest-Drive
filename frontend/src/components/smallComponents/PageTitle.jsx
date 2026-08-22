import React from 'react'

const PageTitle = ({title}) => {
  return (
    <div className="flex flex-col mb-3 px-4 hover:bg-gray-100 rounded-full w-fit py-2 cursor-pointer">
            <h2 className='flex gap-2 text-3xl font-bold'>{title}</h2>
    </div>
  )
}

export default PageTitle