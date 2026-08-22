import React from "react";
import UploadCard from "../components/sidebar/UploadCard";
import SidebarItems from "../components/sidebar/SidebarItems";

import {House, FolderClosed, FolderOpenDot, Users, Clock4, Star, Trash2, OctagonAlert, Database } from "lucide-react"
import {Link} from 'react-router-dom'



const Sidebar = () => {
  return (
      <nav className="w-120 mt-2 me-2">
        <UploadCard />

        <div className="mt-15 flex flex-col gap-2">
          <Link to="/"><SidebarItems icon={<House size={26} />} title="Home" /></Link>
          <Link to="/projects"><SidebarItems icon={<FolderClosed size={26} />} title="Projects" /></Link>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <Link to="/drive"><SidebarItems icon={<FolderOpenDot size={26} />} title="My Drive" /></Link>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <Link to="/shared"><SidebarItems icon={<Users size={26} />} title="Shared with me" /></Link>
          <Link to="/recent"><SidebarItems icon={<Clock4 size={26} />} title="Recent" /></Link>
          <Link to="/stared"><SidebarItems icon={<Star size={26} />} title="Starred" /></Link>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <Link to="/spam"><SidebarItems icon={<OctagonAlert size={26} />} title="Spam" /></Link>
          <Link to="/trash"><SidebarItems icon={<Trash2 size={26} />} title="Trash" /></Link>
          <Link to="/storage"><SidebarItems icon={<Database size={26} />} title="Storage" /></Link>
        </div>

      </nav>
  );
};

export default Sidebar;
