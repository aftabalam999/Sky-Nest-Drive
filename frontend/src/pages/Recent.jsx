import React from "react";

import { ChevronDown } from "lucide-react";

import Files from "../components/smallComponents/Files";
import SectionTitle from "../components/smallComponents/SectionTitle";
import PageTitle from "../components/smallComponents/PageTitle";

const image =
  "https://i.pinimg.com/736x/f2/79/c1/f279c13f717ff8ed7bae51df09920124.jpg";
const fileName = [
  "here it is that yyou want whatever",
  "Hello my name ",
  "hello.pdf",
];

const Recent = () => {
  return (
    <div className="bg-white w-full h-screen rounded-2xl mt-2 p-4 pb-40 text-gray-600 overflow-x-hidden overflow-y-auto">
      <PageTitle title="Recent" />
      <SectionTitle icon={<ChevronDown />} title="Today" />
      <div className="flex gap-3 flex-wrap overflow-y-auto">
      <Files img={image} fileName={fileName[0]} />
      </div>

      <SectionTitle icon={<ChevronDown />} title="Last week" />
      <div className="flex gap-3 flex-wrap overflow-y-auto">
      <Files img={image} fileName={fileName[1]} />
      <Files img={image} fileName={fileName[2]} />
      </div>

    </div>
  );
};

export default Recent;
