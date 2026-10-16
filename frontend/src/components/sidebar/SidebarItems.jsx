
const SidebarItems = ({ icon, title, active }) => {
  return (
    <div
      className={`flex items-center rounded-2xl p-2.5 ps-4 w-80 justify-start gap-4 transition-all cursor-pointer ${
        active
          ? 'bg-blue-200 text-blue-800 font-semibold shadow-sm'
          : 'bg-white hover:bg-blue-100/70 text-gray-700 active:bg-blue-200'
      }`}
    >
      {icon}
      <h2 className="text-base sm:text-lg">{title}</h2>
    </div>
  );
};

export default SidebarItems;