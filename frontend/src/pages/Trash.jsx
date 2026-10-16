import React from 'react'
import EmptyFolder from '../components/smallComponents/EmptyFolder'
import PageTitle from '../components/smallComponents/PageTitle'

const Trash = () => {
  return (
    <div className="bg-white w-full h-screen rounded-2xl mt-2 p-4 pb-40 text-gray-600 overflow-x-hidden overflow-y-auto">
      <PageTitle title="Trash" />
      <EmptyFolder fileName="Trash is empty" description="Items moved to the trash will be deleted forever after 30 days" />
    </div>
  )
}

export default Trash