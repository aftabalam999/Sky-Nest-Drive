import React from 'react'

const EmptyFolder = ({fileName, description}) => {
  return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <h1 className='text-3xl font-bold text-gray-600'>{fileName}</h1>
            <p className='text-gray-500 mt-2'>{description}</p>
        </div>
  );
};

export default EmptyFolder