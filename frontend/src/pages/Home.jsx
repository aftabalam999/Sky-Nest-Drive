import React from 'react'
import {ChevronDown} from 'lucide-react'
import Folder from '../components/smallComponents/Folder'
import Files from '../components/smallComponents/Files'
import SectionTitle from '../components/smallComponents/SectionTitle'
import PageTitle from '../components/smallComponents/PageTitle'


const image = "https://i.pinimg.com/1200x/91/6c/9a/916c9ac655fd5a7f11681bbf64b7afc4.jpg"
const fileName=[
    "here it is that yyou want whatever",
    "Hello my name ",
    "hello.pdf"
]

const files = [
<Files img={image} fileName={fileName[0]}/>,
           <Files img={image} fileName={fileName[1]}/>,
           <Files img={image} fileName={fileName[2]}/>,
           <Files img={image} fileName={fileName[2]}/>,
           <Files img={image} fileName={fileName[2]}/>,
           <Files img={image} fileName={fileName[2]}/>,
           <Files img={image} fileName={fileName[2]}/>,
           <Files img={image} fileName={fileName[2]}/>,
           <Files img={image} fileName={fileName[2]}/>
]


const Home = () => {
  return (
    <div className='bg-white w-full h-screen rounded-2xl mt-2 p-4 pb-40 text-gray-600 overflow-x-hidden overflow-y-auto'>
        {/* <h1 className='font-semibold text-xl '></h1> */}
        <PageTitle title="Welcome to Sky Nest Drive" />

        <SectionTitle icon={<ChevronDown />} title="Folders"/>

        <div className="flex gap-3 w-full pb-3 overflow-x-auto">
            <Folder title="Tech Files"/>
            <Folder title="Tech Files"/>

            <Folder title="Tech Files"/>
            <Folder title="Tech Files"/>
            <Folder title="Tech Files"/>
            <Folder title="Tech Files"/>
            <Folder title="Tech Files"/>
            <Folder title="Tech Files"/>
            <Folder title="Tech Files"/>
            <Folder title="Tech Files"/>

            
        </div>

        <SectionTitle icon={<ChevronDown />} title="Files"/>

        <div className="flex gap-3 flex-wrap overflow-y-auto">
           {files.map(file => file)}
        </div>
    </div>
  )
}

export default Home