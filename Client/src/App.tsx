import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// hugo hustle

import Header from "./components/header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Index from "./pages/index";
import CoinFlip from "./pages/coinflip";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Navbar />
        <div className="row">
          <div className="col-md-1"></div>
          <main className="col-md-9">
            {/* Main page */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/casino" element={<Index />} />
              <Route path="/CoinFlip" element={<CoinFlip />} />
              <Route path="/game" element={<Index />} />
            </Routes>
          </main>
          <div className="col-md-2">
            <Sidebar />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
