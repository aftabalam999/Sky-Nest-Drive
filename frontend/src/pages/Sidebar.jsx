import UploadCard from "../components/sidebar/UploadCard";
import SidebarItems from "../components/sidebar/SidebarItems";
import { useAuth } from "../context/useAuth";
import {
  House,
  FolderClosed,
  FolderOpenDot,
  Users,
  Clock4,
  Star,
  Trash2,
  OctagonAlert,
  Database,
  Cloud,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const storageUsed = user?.storageUsedGB ?? 4.2;
  const storageTotal = user?.storageTotalGB ?? 15.0;
  const storagePercent = Math.min(100, Math.round((storageUsed / storageTotal) * 100));

  return (
    <nav className="w-120 mt-2 me-2 shrink-0 flex flex-col justify-between">
      <div>
        <UploadCard />

        <div className="mt-8 flex flex-col gap-2">
          <Link to="/">
            <SidebarItems icon={<House size={24} />} title="Home" active={location.pathname === "/"} />
          </Link>
          <Link to="/projects">
            <SidebarItems icon={<FolderClosed size={24} />} title="Projects" active={location.pathname === "/projects"} />
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Link to="/drive">
            <SidebarItems icon={<FolderOpenDot size={24} />} title="My Drive" active={location.pathname === "/drive"} />
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Link to="/shared">
            <SidebarItems icon={<Users size={24} />} title="Shared with me" active={location.pathname === "/shared"} />
          </Link>
          <Link to="/recent">
            <SidebarItems icon={<Clock4 size={24} />} title="Recent" active={location.pathname === "/recent"} />
          </Link>
          <Link to="/stared">
            <SidebarItems icon={<Star size={24} />} title="Starred" active={location.pathname === "/stared"} />
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Link to="/spam">
            <SidebarItems icon={<OctagonAlert size={24} />} title="Spam" active={location.pathname === "/spam"} />
          </Link>
          <Link to="/trash">
            <SidebarItems icon={<Trash2 size={24} />} title="Trash" active={location.pathname === "/trash"} />
          </Link>
          <Link to="/storage">
            <SidebarItems icon={<Database size={24} />} title="Storage" active={location.pathname === "/storage"} />
          </Link>
        </div>
      </div>

      {/* Mini Storage Indicator widget at bottom of sidebar */}
      <div className="mt-6 p-4 bg-white rounded-2xl w-80 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2">
          <Cloud size={16} className="text-blue-500" />
          <span>Storage ({storagePercent}% full)</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${storagePercent}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
          <span>{storageUsed} GB of {storageTotal} GB used</span>
          <Link to="/storage" className="text-blue-600 font-semibold hover:underline">
            Get more
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
