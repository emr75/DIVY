import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import LoginForm from "./Components/LoginForm/LoginForm";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import GroupList from "./Components/GroupList/GroupList";
import AssetCreation from "./Components/AssetCreation/AssetCreation";
import Listings from "./Components/Listings/Listings";
import AssetDescription from "./Components/AssetDescription/AssetDescription";
import AssetDetails from "./Components/AssetDetails/AssetDetails";
import TransactionHistory from "./Components/TransactionHistory/TransactionHistory";
import GroupList from "./Components/GroupList/GroupList";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import LandingPage from "./Pages/LandingPage";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./App.css";

// redirects unauthenticated users to "/landing"
const ProtectedRoute = ({ isLoggedIn, children }) =>
  isLoggedIn ? children : <Navigate to="/landingpage" replace />;

// Admin-only route protection
const AdminRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/landingpage" replace />;
  }

  const token = Cookies.get("jwt_token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const isAdmin = decoded.username === "admin" || decoded.role === 1;
      return isAdmin ? children : <Navigate to="/profile" replace />;
    } catch (error) {
      return <Navigate to="/landingpage" replace />;
    }
  }
  return <Navigate to="/landingpage" replace />;
};

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

AdminRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
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
      <div className="layout">
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="content-container">
          <Routes>
            {/* Public routes */}
            <Route
              // conditional if logged in vs not
              path="/"
              element={isLoggedIn ? <Navigate to="/profile" replace /> : <LandingPage />}
            />
            <Route path="/loginform" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/landingpage" element={<LandingPage isLoggedIn={isLoggedIn} />} />

<<<<<<< HEAD
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
=======
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
            <Route path="/listings" element={<Listings />} />
            <Route
              // Connect trhough Asset's ID
              path="/asset/:id"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AssetDescription />
                </ProtectedRoute>
              }
            />
            <Route
              // Asset details page with purchase functionality
              path="/asset-details/:id"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AssetDetails />
                </ProtectedRoute>
              }
            />
            <Route
              // Transaction history page
              path="/transactions"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <TransactionHistory />
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
>>>>>>> c2aea971792c8eb6a15bb64ab7d10eef88602a61

            {/* Admin route */}
            <Route
              path="/admin"
              element={
                <AdminRoute isLoggedIn={isLoggedIn}>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Catch-all */}
            <Route path="/landingpage" element={<Navigate to="/landingpage" replace />} />
          </Routes>
        </main>
        <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </Router>
  );
}

export default App;
