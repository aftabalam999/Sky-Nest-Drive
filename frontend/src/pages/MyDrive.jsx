import React from "react";
import { ChevronDown } from "lucide-react";
import SectionTitle from "../components/smallComponents/SectionTitle";
import Folder from "../components/smallComponents/Folder";
import Files from "../components/smallComponents/Files";
import PageTitle from "../components/smallComponents/PageTitle";



const image = "https://i.pinimg.com/736x/f2/79/c1/f279c13f717ff8ed7bae51df09920124.jpg"
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



const MyDrive = () => {
  return (
    <div className="bg-white w-full h-screen rounded-2xl mt-2 p-4 pb-40 text-gray-600 overflow-x-hidden overflow-y-auto">
      <PageTitle title="My Drive" />

      <div className="flex gap-4 gap-x-9 pb-3 flex-wrap">
        <Folder title="Cold Files" />
        <Folder title="Hot Files" />
        <Folder title="Collaborative" />
        <Folder title=" Resume" />
        <Folder title="Hot Files" />
        <Folder title=" Informatics" />
        <Folder title="Hot Files" />
        <Folder title="Hot Files" />
        <Folder title="Hot Files" />
        <Folder title="Hot Files" />
      </div>

      <div className="flex gap-3 flex-wrap overflow-y-auto">
        {files.map((file) => file)}
      </div>
    </div>
  );
};

export default MyDrive;
