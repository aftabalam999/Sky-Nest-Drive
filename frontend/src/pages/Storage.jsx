import React from "react";
import PageTitle from "../components/smallComponents/PageTitle";

const Storage = () => {
  return (
    <div className="bg-white w-full h-screen rounded-2xl mt-2 p-4 pb-40 text-gray-600 overflow-x-hidden overflow-y-auto">
      <PageTitle title="Storage" />
      <div className="flex flex-col px-8">
        <div className="mt-4 bg-gray-200 h-4 rounded-lg">
          <div
            className="bg-blue-400 h-4 rounded-lg absolute"
            style={{ width: "10%" }}
          ></div>
          <div
            className="bg-red-400 h-4 rounded-lg absolute"
            style={{ width: "6%" }}
          ></div>
          <div
            className="bg-yellow-400 h-4 rounded-lg absolute"
            style={{ width: "4%" }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">0 GB</span>
          <span className="text-gray-600">10 GB</span>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-gray-600">Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-gray-600">Images</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-600">Videos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
