import { Link } from "react-router-dom";
import CashierVector from "../../assets/Cashier-Vector.png";
import "./Homepage.css";
import NavbarHomepage from "./NavbarHompage/NavbarHomepage";

const Homepage = () => {
  return (
    <>
      <NavbarHomepage />
      <div className="container">
        <div className="row mt-4">
          <div
            className="col-6 d-flex justify-content-center align-items-center"
            style={{ height: "fit-content" }}
          >
            <h4 className="highlight-text lh-base" style={{ marginTop: "5em" }}>
              Cashier App merupakan solusi yang dibuat khusus untuk mendukung
              usaha mikro, kecil, dan menengah (UMKM) seperti kafe dalam
              meningkatkan efisiensi dan akurasi transaksi.
            </h4>
          </div>
          <div
            className="col-6 d-flex justify-content-center"
            style={{ height: "26em" }}
          >
            <img
              src={CashierVector}
              alt="Cashier Ilustration"
              style={{ width: "90%", height: "fit-content" }}
            />
          </div>
          <div className="col-12">
            <h5 className="highlight-text-2" style={{ marginTop: "2em" }}>
              Ayo Coba Cashier App Sekarang!,{" "}
              <Link
                className="me-1"
                to="/registrasi"
                style={{ textDecoration: "none", color: "#ff4500" }}
              >
                Registrasi
              </Link>
              Dan
              <Link
                className="mx-1"
                to="/login"
                style={{ textDecoration: "none", color: "#ff4500" }}
              >
                Login
              </Link>
              Dulu Yuk 😄.
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
