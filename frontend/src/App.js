import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import LoginForm from "./Components/LoginForm/LoginForm";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import AssetCreation from "./Components/AssetCreation/AssetCreation";
import LandingPage from "./Pages/LandingPage";

function App() {
  // Login logic need to go here
  const LoggedIn = false;
  return (
    <Router>
      <Nav />
      <Routes>
        {/* Nav */}

        {/* Default route - homepage if logged in */}
        <Route path="/" element={!LoggedIn ? <LoginForm /> : <LandingPage />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Profile */}
        <Route path="/Profile" element={<Profile />} />

        {/* AssetCreation */}
        <Route path="/AssetCreation" element={<AssetCreation />} />

        {/* Protected route */}
        <Route path="/LandingPage" element={LoggedIn ? <LandingPage /> : <LoginForm />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
