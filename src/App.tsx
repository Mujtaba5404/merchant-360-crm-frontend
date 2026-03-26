import { Route, Routes } from "react-router-dom";
import Authenticated from "./components/Authenticated";
import Login from "./features/auth/Login";
import Roles from "./features/roles/Roles";
import Users from "./features/users/User";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import MerchantScreen from "./pages/MerchantScreen";
import Transactions from "./pages/Transaction";
import Payment from "./pages/Payment";

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
          </Route>

          <Route path="role">
            <Route index element={<Roles />} />
          </Route>

          <Route path="merchant">
            <Route index element={<MerchantScreen />} />
          </Route>

          <Route path="transactions">
            <Route index element={<Transactions />} />
          </Route>

          <Route path="payment">
            <Route index element={<Payment/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
