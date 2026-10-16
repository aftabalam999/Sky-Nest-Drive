import React from 'react'
import EmptyFolder from '../components/smallComponents/EmptyFolder'
import PageTitle from '../components/smallComponents/PageTitle'

const Spam = () => {
  return (
    <div className="bg-white w-full h-screen rounded-2xl mt-2 p-4 pb-40 text-gray-600 overflow-x-hidden overflow-y-auto">
      <PageTitle title="Spam" />
      <EmptyFolder fileName="Your Spam is empty" description="Files in spam won't appear anywhere else in Drive. Files are permanently removed after 30 days." />
    </div>
  )
}

export default Spam