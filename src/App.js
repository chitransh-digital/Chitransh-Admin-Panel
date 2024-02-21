import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/Login/LoginPage";


function App() {
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <LoginPage />} />
          <Route path="/feeds" element={<Dashboard />} />
          <Route path="/jobs" element={<Dashboard />} />
          <Route path="/createJobs" element={<Dashboard />} />
          <Route path="/updateJob" element={<Dashboard />} />
          <Route path="/family" element={<Dashboard />} />
          <Route path="/business" element={<Dashboard />} />
          <Route path="/users" element={<Dashboard />} />
          <Route path="/notification" element={<Dashboard />} />
          <Route path="/login" element={isLoggedIn ? <Navigate replace to="/" /> : <LoginPage />} />
        </Routes>
    </div>
  );
}

export default App;
