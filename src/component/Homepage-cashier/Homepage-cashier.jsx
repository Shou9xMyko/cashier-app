/* eslint-disable react-hooks/exhaustive-deps */
import "./Homepage-cashier.css";
import Footer from "../Footer/Footer";
import NavbarCashier from "../Navbar/NavbarCashier";
import Cart from "./Cart";
import ListCathegory from "./listCathegory";
import ListItem from "./listItem";
import AddProduct from "./CRUD_Product/AddProduct";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomepageCashier = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("username") == null && navigate("/");
  }, []);

  return (
    <div className="wrapper">
      <NavbarCashier />
      <div className="text-end">
        <Link
          to="/laporan-penjualan"
          className="btn-laporan-penjualan btn border-0 my-3 mx-3 text-dark"
        >
          Lihat Laporan Penjualan
        </Link>
      </div>
      <div className="row p-0 m-0 ">
        <div className="col-2 px-2 bg-primarys">
          <h4 className="title text-center">Daftar Kategori</h4>
          <div className="hr-center d-flex justify-content-center">
            <hr className="hr w-100 mb-3" />
          </div>
          <ListCathegory />
          <AddProduct />
        </div>
        <div className="col-7 px-2 bg-warnings">
          <h4 className="title text-center">Daftar Produk</h4>
          <div className="hr-center d-flex justify-content-center">
            <hr className="hr w-100 mb-3 " />
          </div>
          <ListItem />
        </div>
        <div className="col-3 px-2">
          <h4 className="title text-center">Daftar Pesanan</h4>
          <div className="hr-center d-flex justify-content-center">
            <hr className="hr w-100 mb-3" />
          </div>
          <Cart />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomepageCashier;
