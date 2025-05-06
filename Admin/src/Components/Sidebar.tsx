
const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-lg">
  <h2 className="text-2xl font-bold p-4 border-b border-gray-700">HOSPITAL +</h2>

  <nav className="flex-1 overflow-y-auto">
    <ul className="mt-4 space-y-1 px-2">
      {[
        { label: "Dashboard", icon: "📊" },
        { label: "Patients", icon: "💊" },
        { label: "Appointments", icon: "📅" },
        { label: "Reports", icon: "📄" },
        { label: "Billing", icon: "💳" },
        { label: "Settings", icon: "⚙️" },
        { label: "Logout", icon: "🚪" },
      ].map((item, idx) => (
        <li
          key={idx}
          className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <span className="text-lg mr-3">{item.icon}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </li>
      ))}
    </ul>
  </nav>

  <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
    Logged in as <span className="font-semibold text-white">User</span>
  </div>
</div>

  );
};

export default Sidebar;
