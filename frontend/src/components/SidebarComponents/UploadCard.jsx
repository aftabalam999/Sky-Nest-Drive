import React from 'react'
import {Plus} from 'lucide-react';

const NewCard = () => {
  return (
    <div className='flex rounded-2xl p-4 bg-white w-35 align-center justify-center gap-3 mt-5'>
        <Plus size={30}/>
      <h1 className='text-xl text-gray-700'>New</h1>
    </div>
  )
}

export default NewCard