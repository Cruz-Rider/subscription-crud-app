import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import AdminLogin from "./pages/Admin Pages/AdminLogin";
import AdminDashboard from "./pages/Admin Pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="admin_dashboard" element={<AdminDashboard />} />
        <Route path="client" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
