import "./App.css";
// hugo hustle
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Balance from "./components/Balance";

function App() {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="row">
        <div className="col-md-12"></div>
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className = "col-md-3"></div>
        <div className = "col-md-2">
        <Balance />
        </div>
      </div>
      <Footer />
    </div>
  );
}



export default App;
