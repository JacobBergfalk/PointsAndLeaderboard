import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// hugo hustle
import Header from "./components/header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Balance from "./components/Balance";
import React from "react";

function App() {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="row">
        <div className="col-md-1"></div>
        <main className="col-md-9">
          {/* page */}
          <Balance />
        </main>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
