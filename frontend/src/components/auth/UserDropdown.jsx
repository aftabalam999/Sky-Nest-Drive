import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import { LogOut, User, HardDrive, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/login');
  };

  if (!isAuthenticated || !user) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-full shadow-md shadow-blue-500/20 transition-all text-sm cursor-pointer"
      >
        <User size={18} />
        <span>Sign In</span>
      </Link>
    );
  }

  const storagePercentage = Math.min(
    100,
    Math.round(((user.storageUsedGB || 0) / (user.storageTotalGB || 15)) * 100)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 pe-3 bg-white hover:bg-blue-50 rounded-full border border-gray-200 shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <div className="relative">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-400"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold text-gray-800 leading-tight truncate max-w-[100px]">
            {user.name}
          </p>
          <p className="text-[10px] text-blue-600 font-medium leading-tight">
            {user.plan || 'Free'}
          </p>
        </div>
        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header with User Info */}
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-400 shadow-sm"
            />
            <div className="overflow-hidden">
              <h4 className="font-bold text-gray-800 text-sm truncate">{user.name}</h4>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[11px] font-semibold rounded-full">
                <Sparkles size={11} />
                <span>{user.role || 'Member'}</span>
              </div>
            </div>
          </div>

          {/* Storage Meter */}
          <div className="my-3 p-3 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <HardDrive size={14} className="text-blue-500" />
                Storage Usage
              </span>
              <span className="text-blue-600 font-bold">
                {user.storageUsedGB || 0} GB / {user.storageTotalGB || 15} GB
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              {storagePercentage}% of your cloud storage used
            </p>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-1 py-1">
            <Link
              to="/drive"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <HardDrive size={16} />
              <span>Go to My Drive</span>
            </Link>
            <Link
              to="/storage"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Sparkles size={16} />
              <span>Manage Storage & Plans</span>
            </Link>
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
              <Shield size={16} />
              <span>Security & Passwords</span>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="pt-2 mt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              <LogOut size={15} />
              <span>Sign Out of Sky Nest</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
