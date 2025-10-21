import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import Register from './Components/Register/Register';
import LandingPage from './Pages/LandingPage';

function App() {
  const LoggedIn = false; // Example auth state

  return (
    <Router>
      <Routes>
        {/* Default route - homepage if logged in */}
        <Route
          path="/"
          element={!LoggedIn ? <LandingPage /> : <LoginForm />}
        />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/LandingPage"
          element={LoggedIn ? <LandingPage /> : <LoginForm/> }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
