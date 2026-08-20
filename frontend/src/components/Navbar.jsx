import React from 'react'
import { CircleCheck, CircleQuestionMark, Settings, Grip, FolderSearch } from 'lucide-react';
import logo from '../assets/main-logo-removebg.png'

const Navbar = () => {
  return (
    <>
        <div className="row flex items-center justify-between">
            <div className="icon col-md-5 w-80 flex items-center justify-center gap-2  bg-blue-200 rounded-full shadow-2xl shadow-blue-200">
                <img src={logo} alt="Drive Icon" className='w-20'/>
                <h2 className='font-semibold text-2xl text-zinc-700'>SKY <span className='text-blue-500'>NEST</span> DRIVE</h2>
                
            </div>
            <div className="search border-2 col-md-4 w-150 border-gray-500 rounded-full flex items-center justify-between relative">
                <input type="text" placeholder="Search..." className='w-full p-3 rounded-full text-md font-semibold border-none pe-16' />
                <FolderSearch className='absolute top-3 right-4'/>
            </div>
            <div className="navbar col-md-3 flex items-center justify-around gap-4 w-60" style={{ color: "#212121" }}>
              
              <CircleCheck size={32}/>
              <CircleQuestionMark size={32}/>
              <Settings size={32}/>
              <Grip size={32}/>
            </div>
        </div>
    </>
  )
}

export default Navbar