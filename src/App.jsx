import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ReportSales from "./component/report-sales/ReportSales";
import HomepageCashier from "./component/Homepage-cashier/Homepage-cashier";
import Homepage from "./component/Homepage/Homepage";
import Register from "./component/Homepage/Register/Register";
import Login from "./component/Homepage/Login/Login";
import About from "./component/Homepage/About/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage-cashier" element={<HomepageCashier />} />
          <Route path="/about" element={<About />} />
          <Route path="/registrasi" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/laporan-penjualan" element={<ReportSales />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
