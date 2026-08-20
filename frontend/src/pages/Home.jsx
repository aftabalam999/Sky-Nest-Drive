import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Home = () => {
  return (
    <div className='bg-gray-200 w-full h-screen p-4'>
        <Navbar />

        <div className="flex w-full h-[90vh] ">
        <Sidebar/>
        <MainContent/>
        </div>
        
    </div>
  )
}

export default Home