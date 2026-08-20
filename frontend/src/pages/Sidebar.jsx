import React from "react";
import UploadCard from "../components/SidebarComponents/UploadCard";
import SidebarItems from "../components/SidebarComponents/SidebarItems";

import {House, FolderClosed, FolderOpenDot, Users, Clock4, Star, Trash2, OctagonAlert, Database } from "lucide-react"

const Sidebar = () => {
  return (
    <>
      <div className="w-120 mt-2 me-2">
        <UploadCard />

        <div className="mt-15 flex flex-col gap-2">
          <SidebarItems icon={<House size={26} />} title="Home"/>
          <SidebarItems icon={<FolderClosed size={26} />} title="Projects"/>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <SidebarItems icon={<FolderOpenDot size={26} />} title="My Drive"/>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <SidebarItems icon={<Users size={26} />} title="Shared with me"/>
          <SidebarItems icon={<Clock4 size={26} />} title="Recent"/>
          <SidebarItems icon={<Star size={26} />} title="Starred"/>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <SidebarItems icon={<OctagonAlert size={26} />} title="Spam"/>
          <SidebarItems icon={<Trash2 size={26} />} title="Trash"/>
          <SidebarItems icon={<Database size={26} />} title="Storage"/>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
