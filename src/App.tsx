import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Authenticated from "./components/Authenticated";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";
import Roles from "./pages/Role";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Authenticated />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="users">
            <Route index element={<Users />} />
            <Route path="users" element={<Users />} />
          </Route>

          <Route path="role">
            <Route index element={<Roles />} />
            <Route path="role" element={<Roles />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
