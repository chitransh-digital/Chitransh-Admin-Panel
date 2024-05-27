import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/Login/LoginPage";
import { useUserState } from "./Store/store";
import { useEffect, useState } from "react";
import { checkUser } from "./Api/authApi";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useUserState();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const [checking, setChecking] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useUserState();

  useEffect(() => {
    (async () => {
      const checkingUser = await checkUser();
      if (checkingUser.message === "Authorized") {
        setIsLoggedIn();
      }
      // setIsLoggedIn(true);
      setChecking((prev) => false);
    })();
  }, [isLoggedIn, setIsLoggedIn]);

  if (checking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feeds"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createFeed"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateFeed"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/family"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createFamily"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createJob"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateJob"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/karyakarni"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createKaryakarni"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateKaryakarni"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registerBusiness"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateBusiness"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addMember"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateMember"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/changePassword"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate replace to="/" /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
