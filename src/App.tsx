import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Authenticated from "./components/Authenticated";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <Routes>
    
      <Route path="/login" element={<Login />} />

      <Route element={<Authenticated />} />
      <Route element={<DashboardLayout />} />
      <Route index element={<Dashboard />} />

      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
