import "./App.css";
// hugo hustle
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="row">
        <div className="col-md-1"></div>
        <main className="col-md-9">{/* page */}</main>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
