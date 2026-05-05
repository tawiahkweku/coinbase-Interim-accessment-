import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import WarningBanner from "./components/ui/WarningBanner.jsx";
import FooterDisclaimer from "./components/ui/FooterDisclaimer.jsx";
import AssetDetail from "./pages/AssetDetail.jsx";
import Explore from "./pages/Explore.jsx";
import Home from "./pages/Home.jsx";
import Learn from "./pages/Learn.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white text-gray-900">
          {/* Warning Banner - Visible on ALL pages */}
          <WarningBanner />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="/learn" element={<Learn />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
          
          {/* Footer Disclaimer - Visible on ALL pages */}
          <FooterDisclaimer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
