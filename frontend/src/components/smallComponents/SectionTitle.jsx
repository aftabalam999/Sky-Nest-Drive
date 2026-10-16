import React from 'react'

const SectionTitle = ({icon, title}) => {
  return (
    <div className="flex flex-col mt-6 mb-3  hover:bg-gray-300 rounded-full w-50 p-2 cursor-pointer">
            <h2 className='flex gap-2 text-md font-semibold'>{icon}{title}</h2>
    </div>
  )
}

export default SectionTitle