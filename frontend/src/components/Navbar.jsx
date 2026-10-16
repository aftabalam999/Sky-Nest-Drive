import { CircleCheck, CircleQuestionMark, Settings, Grip, FolderSearch } from 'lucide-react';
import logo from '../assets/main-logo-removebg.png';
import { Link } from 'react-router-dom';
import UserDropdown from './auth/UserDropdown';

const Navbar = () => {
  return (
    <>
      <div className="row flex items-center justify-between pb-2">
        <Link
          to="/"
          className="icon col-md-5 w-80 flex items-center justify-center gap-2 bg-blue-200 hover:bg-blue-300/80 transition-all rounded-full shadow-2xl shadow-blue-200 cursor-pointer"
        >
          <img src={logo} alt="Drive Icon" className="w-20" />
          <h2 className="font-semibold text-2xl text-zinc-700">
            SKY <span className="text-blue-500">NEST</span> DRIVE
          </h2>
        </Link>

        <div className="search border-2 col-md-4 w-150 border-gray-500 rounded-full flex items-center justify-between relative bg-white">
          <input
            type="text"
            placeholder="Search in Drive..."
            className="w-full p-3 rounded-full text-md font-semibold border-none pe-16 outline-none text-gray-700"
          />
          <FolderSearch className="absolute top-3 right-4 text-gray-600 pointer-events-none" />
        </div>

        <div className="navbar col-md-3 flex items-center justify-end gap-4 w-auto min-w-[280px]" style={{ color: '#212121' }}>
          <button title="Recent activity" className="text-gray-700 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-gray-300/50 cursor-pointer">
            <CircleCheck size={28} />
          </button>
          <button title="Support & Help" className="text-gray-700 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-gray-300/50 cursor-pointer">
            <CircleQuestionMark size={28} />
          </button>
          <button title="Drive Settings" className="text-gray-700 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-gray-300/50 cursor-pointer">
            <Settings size={28} />
          </button>
          <button title="Google Apps & Extensions" className="text-gray-700 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-gray-300/50 cursor-pointer">
            <Grip size={28} />
          </button>
          
          {/* User Profile & Auth Status Dropdown */}
          <UserDropdown />
        </div>
      </div>
    </>
  );
};

export default Navbar;