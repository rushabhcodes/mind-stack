import LandingPage from "./pages";
import Dashboard from "./pages/dashboard";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
