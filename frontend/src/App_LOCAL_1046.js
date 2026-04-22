import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import LoginForm from "./Components/LoginForm/LoginForm";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import GroupList from "./Components/GroupList/GroupList";
import AssetCreation from "./Components/AssetCreation/AssetCreation";
import LandingPage from "./Pages/LandingPage";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

// redirects unauthenticated users to "/landing"
const ProtectedRoute = ({ isLoggedIn, children }) =>
  isLoggedIn ? children : <Navigate to="/" replace />;

function App() {
  // Logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // loading initialized to true
  const [loading, setLoading] = useState(true);

  // useEffct to run once on component mount
  useEffect(() => {
    // check for jwt token
    if (Cookies.get("jwt_token")) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  // Check if loading - laoding message
  if (loading) return <div className="loading-screen">Loading…</div>;

  return (
    <Router>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Public routes */}
        <Route
          // conditional if logged in vs not
          path="/"
          element={isLoggedIn ? <Navigate to="/profile" replace /> : <LandingPage />}
        />
        <Route path="/loginform" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landingpage" element={<LandingPage />} />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assetcreation"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AssetCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grouplist"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <GroupList />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="/landingpage" element={<Navigate to="/landingpage" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
