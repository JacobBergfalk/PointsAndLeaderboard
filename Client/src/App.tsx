import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Profile from "./pages/profile";
import Index from "./pages/index";
import CoinFlip from "./pages/coinflip";
import StockChart from "./pages/StockChart";

import { AuthProvider } from "./assets/AuthContext"; // Import the provider

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container-fluid">
          <div className="row">
            <Header />
          </div>

          <div className="row">
            <Navbar />
          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <main className="col-md-9">
              {/* Main page */}
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/Index" element={<Index />} />
                <Route path="/CoinFlip" element={<CoinFlip />} />
                <Route path="/game" element={<Index />} />
                <Route path="/stockgrapf" element={<StockChart />} />
              </Routes>
            </main>
            <div className="col-md-2">
              <Sidebar />
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
