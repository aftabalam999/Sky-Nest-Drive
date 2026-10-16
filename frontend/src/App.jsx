import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./pages/Sidebar";
import Project from "./pages/Project";
import MyDrive from "./pages/MyDrive";
import SharedWithMe from "./pages/SharedWithMe";
import Recent from "./pages/Recent";
import Stared from "./pages/Stared";
import Spam from "./pages/Spam";
import Trash from "./pages/Trash";
import Storage from "./pages/Storage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

// Standard Drive Layout with Navbar and Sidebar
const DriveLayout = () => {
  return (
    <div className="bg-gray-200 w-full scrollbar-thumb-blue-200 h-screen p-4 overflow-hidden">
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />

          {/* Protected Drive Application Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DriveLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/drive" element={<MyDrive />} />
            <Route path="/shared" element={<SharedWithMe />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/stared" element={<Stared />} />
            <Route path="/spam" element={<Spam />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;