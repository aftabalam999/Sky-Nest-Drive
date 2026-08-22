import React from 'react'

const SidebarItems = ({icon, title}) => {
  return (
    <div className='flex rounded-2xl p-2 ps-4 bg-white w-80 align-center justify-start gap-4 hover:bg-blue-200 cursor-pointer active:bg-blue-300'>
        {icon}
        <h2 className='text-xl'>{title}</h2>
    </div>
  )
}

export default SidebarItems