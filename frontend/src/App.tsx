
import Dashboard from "./pages/dashboard";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
